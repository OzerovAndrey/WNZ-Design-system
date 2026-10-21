#!/usr/bin/env python3
"""Diff і зведення знімків компонентів Wanda X (scripts/snapshot-component.js).

  python3 scripts/snapshot-diff.py snapshots/anchor.json            # робочий файл vs останній коміт
  python3 scripts/snapshot-diff.py old.json new.json                # два файли
  python3 scripts/snapshot-diff.py --summary snapshots/anchor.json  # зведення для components/<c>.md

Однакові зміни в багатьох варіантах групуються в один рядок.
"""
import json, subprocess, sys
from collections import defaultdict, OrderedDict

ATTRS = ['hidden', 'size', 'layout', 'sizing', 'absolute', 'radius', 'opacity', 'fills', 'fillStyle',
         'strokes', 'strokeWeight', 'effects', 'effectStyle', 'text', 'vars', 'tokens', 'props',
         'instanceOf', 'instanceProps']

# Figma-змінна → ключ plugin data Token Studio (token-studio.md)
VAR2TOKEN = {'fills': 'fill', 'strokes': 'borderColor', 'topLeftRadius': 'borderRadiusTopLeft',
             'topRightRadius': 'borderRadiusTopRight', 'bottomRightRadius': 'borderRadiusBottomRight',
             'bottomLeftRadius': 'borderRadiusBottomLeft', 'effects': 'boxShadow', 'textStyle': 'typography'}


def load(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)


def load_head(path):
    try:
        raw = subprocess.run(['git', 'show', 'HEAD:' + path], capture_output=True, text=True, check=True).stdout
        return json.loads(raw)
    except Exception:
        return None


def comps(snap):
    return OrderedDict((c.get('name', c.get('id')), c) for c in snap.get('components', []))


def flatten(tree, prefix='', out=None):
    """path -> attrs. Однакові імена сусідів отримують [i]."""
    if out is None:
        out = OrderedDict()
    path = prefix + tree['name'] if not prefix else prefix
    out[path] = {k: tree[k] for k in ATTRS if k in tree}
    out[path]['type'] = tree['type']
    seen = defaultdict(int)
    for c in tree.get('children', []):
        seen[c['name']] += 1
    idx = defaultdict(int)
    for c in tree.get('children', []):
        name = c['name'] if seen[c['name']] == 1 else f"{c['name']}[{idx[c['name']]}]"
        idx[c['name']] += 1
        flatten(c, path + ' > ' + name, out)
    return out


def rel(path):
    """Шлях без кореня-варіанта, щоб групувати однакові шари в різних варіантах."""
    return path.split(' > ', 1)[1] if ' > ' in path else '(root)'


def variant_flats(c):
    """{варіант: {шлях_без_кореня: атрибути}} — для формату 2 (common + perVariant) і старого (variants[].tree)."""
    out = OrderedDict()
    if c.get('format') == 2:
        for vn, diffs in c.get('perVariant', {}).items():
            f = {p: dict(a) for p, a in c.get('common', {}).items()}
            for p, a in diffs.items():
                if a == '§missing':
                    f.pop(p, None)
                    continue
                cur = f.setdefault(p, {})
                for k, v in a.items():
                    if v is None:
                        cur.pop(k, None)
                    else:
                        cur[k] = v
            out[vn] = f
        return out
    for v in c.get('variants', []):
        out[v['name']] = {rel(k): a for k, a in flatten(v['tree']).items()}
    return out


def props_from_name(name):
    out = {}
    for part in name.split(', '):
        if '=' in part:
            k, v = part.split('=', 1)
            out[k] = v
    return out or None


def variant_props(c):
    if c.get('format') == 2:
        vp = c.get('variantProps')
        return vp if vp else {n: props_from_name(n) for n in c.get('perVariant', {})}
    return {v['name']: v.get('props') for v in c.get('variants', [])}


def fmt(v):
    if v is None:
        return '∅'
    if isinstance(v, (dict, list)):
        return json.dumps(v, ensure_ascii=False, separators=(',', ':'))
    return str(v)


def is_digest(c):
    return c.get('format') == 'digest'


def diff_digest(a, b):
    """Два дайджести: властивості повністю, шари — лише які змінились (значення дає BASELINE-режим скрипта у Figma)."""
    body = []
    va, vb = a.get('variants', {}), b.get('variants', {})
    for vn in sorted(vb.keys() - va.keys()):
        body.append(f'  + варіант {vn}')
    for vn in sorted(va.keys() - vb.keys()):
        body.append(f'  - варіант {vn}')
    groups = defaultdict(list)
    for vn in va.keys() & vb.keys():
        for p in vb[vn].keys() | va[vn].keys():
            x, y = va[vn].get(p), vb[vn].get(p)
            if x != y:
                tag = '+' if x is None else '-' if y is None else '~'
                groups[(tag, p)].append(vn)
    total = len(va.keys() & vb.keys())
    for (tag, p), vs in sorted(groups.items(), key=lambda kv: (-len(kv[1]), kv[0][1])):
        where = 'усі варіанти' if len(vs) == total and total > 1 else (vs[0] if len(vs) == 1 else f'{len(vs)} варіантів')
        body.append(f'  {tag} шар {p}   [{where}]')
    return body


def diff(old, new):
    lines = []
    oc, nc = comps(old), comps(new)
    for name in nc.keys() - oc.keys():
        lines.append(f'+ НОВИЙ НАБІР {name} ({nc[name].get("variantCount")} варіантів)')
    for name in oc.keys() - nc.keys():
        lines.append(f'- НАБІР ЗНИК {name}')
    for name in [n for n in nc if n in oc]:
        a, b = oc[name], nc[name]
        head = [f'\n## {name}']
        body = []
        for k in ('page', 'section', 'descriptionLength', 'error', 'truncated'):
            if a.get(k) != b.get(k):
                body.append(f'  {k}: {fmt(a.get(k))} → {fmt(b.get(k))}')
        pa, pb = a.get('properties') or {}, b.get('properties') or {}
        for p in pb.keys() - pa.keys():
            body.append(f'  + властивість {p}: {fmt(pb[p])}')
        for p in pa.keys() - pb.keys():
            body.append(f'  - властивість {p}')
        for p in pa.keys() & pb.keys():
            if pa[p] != pb[p]:
                body.append(f'  ~ властивість {p}: {fmt(pa[p])} → {fmt(pb[p])}')
        if is_digest(a) or is_digest(b):
            body += diff_digest(a, b)
            if body:
                lines += head + body
            continue
        va, vb = variant_flats(a), variant_flats(b)
        added, removed = sorted(vb.keys() - va.keys()), sorted(va.keys() - vb.keys())
        if added:
            body.append(f'  + варіанти ({len(added)}): ' + '; '.join(added[:12]) + (' …' if len(added) > 12 else ''))
        if removed:
            body.append(f'  - варіанти ({len(removed)}): ' + '; '.join(removed[:12]) + (' …' if len(removed) > 12 else ''))
        groups = defaultdict(list)  # (layer, attr, old, new) -> [variant]
        for vn in va.keys() & vb.keys():
            fa, fb = va[vn], vb[vn]
            for lp in fb.keys() - fa.keys():
                groups[(lp, 'шар', None, fb[lp].get('type'))].append(vn)
            for lp in fa.keys() - fb.keys():
                groups[(lp, 'шар', fa[lp].get('type'), None)].append(vn)
            for lp in fa.keys() & fb.keys():
                for attr in set(fa[lp]) | set(fb[lp]):
                    x, y = fa[lp].get(attr), fb[lp].get(attr)
                    if x != y:
                        if isinstance(x, dict) and isinstance(y, dict):
                            for sk in set(x) | set(y):
                                if x.get(sk) != y.get(sk):
                                    groups[(lp, f'{attr}.{sk}', fmt(x.get(sk)), fmt(y.get(sk)))].append(vn)
                        else:
                            groups[(lp, attr, fmt(x), fmt(y))].append(vn)
        total = len(va.keys() & vb.keys())
        for (lp, attr, x, y), vs in sorted(groups.items(), key=lambda kv: (-len(kv[1]), kv[0][0])):
            where = 'усі варіанти' if len(vs) == total and total > 1 else (vs[0] if len(vs) == 1 else f'{len(vs)} варіантів')
            body.append(f'  ~ {lp} · {attr}: {x} → {y}   [{where}]')
        if body:
            lines += head + body
    return lines or ['Змін немає.']


def summary(snap):
    lines = [f'Знімок від {snap.get("takenAt")}']
    for name, c in comps(snap).items():
        lines.append(f'\n## {name}  ({c.get("type")}, {c.get("id")})')
        lines.append(f'Сторінка: {c.get("page")} · Section: {c.get("section")} · description: {c.get("descriptionLength")} симв.')
        if c.get('error'):
            lines.append('!! ' + c['error'])
        if is_digest(c):
            for k, p in (c.get('properties') or {}).items():
                extra = (' = ' + ' | '.join(p['options'])) if p.get('options') else ''
                lines.append(f'  {p["type"].title()} {k}{extra}   (default {fmt(p.get("default"))})')
            lines.append(f'Варіантів: {c.get("variantCount")}; шарів у першому: {len(next(iter(c.get("variants", {}).values()), {}))}')
            lines.append('Дайджест не містить значень — повне зведення: скрипт з DIGEST=false у Figma.')
            continue
        props = c.get('properties') or {}
        axes = {k: p['options'] for k, p in props.items() if p['type'] == 'VARIANT'}
        others = {k: p for k, p in props.items() if p['type'] != 'VARIANT'}
        lines.append(f'Варіантів: {c.get("variantCount")}' + (f' (у знімку {c["slice"]})' if c.get('slice') else ''))
        for k, opts in axes.items():
            lines.append(f'  Variant {k} = ' + ' | '.join(opts) + f'   (default {props[k]["default"]})')
        for k, p in others.items():
            lines.append(f'  {p["type"].title()} {k}   (default {fmt(p["default"])})')
        # матриця станів: дві найбільші осі
        vf, vp = variant_flats(c), variant_props(c)
        if len(axes) >= 1 and vf:
            ax = sorted(axes, key=lambda k: -len(axes[k]))
            r, col = (ax[1], ax[0]) if len(ax) > 1 else (None, ax[0])
            lines.append(f'\nМатриця ({r or "—"} × {col}) — fill/strokes кореня, токени кольору:')
            cell = {}
            for vn, f in vf.items():
                t = f.get('(root)', {}); pr = vp.get(vn) or {}
                key = (pr.get(r) if r else '', pr.get(col))
                if key in cell:
                    continue
                tok = t.get('tokens', {})
                fill = tok.get('fill') or (t.get('vars', {}).get('fills')) or t.get('fills')
                stroke = tok.get('borderColor') or (t.get('vars', {}).get('strokes')) or t.get('strokes')
                cell[key] = f'fill {fmt(fill)}' + (f' · stroke {fmt(stroke)}' if stroke else '')
            for key, val in cell.items():
                lines.append(f'  {key[0]} / {key[1]}: {val}')
        # токени по шарах (об'єднання по всіх варіантах)
        tok = defaultdict(lambda: defaultdict(set))
        styles, inst, hard = defaultdict(set), defaultdict(set), []
        for vn, f in vf.items():
            for lp, a in f.items():
                for k, val in (a.get('tokens') or {}).items():
                    tok[lp][k].add(fmt(val))
                for k, val in (a.get('vars') or {}).items():
                    if not (a.get('tokens') or {}).get(VAR2TOKEN.get(k, k)):
                        tok[lp]['var:' + k].add(fmt(val))
                if a.get('text'):
                    styles[lp].add(fmt(a['text'].get('style')))
                if a.get('instanceOf'):
                    inst[lp].add(a['instanceOf'])
                if a.get('fills') and not a.get('fillStyle') and 'fills' not in (a.get('vars') or {}) and a.get('type') != 'INSTANCE':
                    hard.append(f'{vn} · {lp}: {fmt(a["fills"])}')
        lines.append('\nТокени по шарах (Token Studio; var: — лише Figma-змінна):')
        for lp, kv in tok.items():
            lines.append(f'  {lp}')
            for k, vals in sorted(kv.items()):
                lines.append(f'    {k}: ' + ' | '.join(sorted(vals)))
        if styles:
            lines.append('\nТекстові стилі:')
            for lp, s in styles.items():
                lines.append(f'  {lp}: ' + ', '.join(sorted(s)))
        if inst:
            lines.append('\nВкладені інстанси:')
            for lp, s in inst.items():
                lines.append(f'  {lp}: ' + ', '.join(sorted(s)))
        if hard:
            lines.append(f'\nHardcoded fill ({len(hard)}):')
            lines += ['  ' + h for h in hard[:15]]
    return lines


def main(argv):
    if argv and argv[0] == '--summary':
        print('\n'.join(summary(load(argv[1]))))
        return
    if len(argv) == 1:
        new = load(argv[0])
        old = load_head(argv[0])
        if old is None:
            print('Попереднього знімка в git немає — це перше вивчення. Зведення:')
            print('\n'.join(summary(new)))
            return
    elif len(argv) == 2:
        old, new = load(argv[0]), load(argv[1])
    else:
        print(__doc__)
        sys.exit(1)
    print('\n'.join(diff(old, new)))


if __name__ == '__main__':
    main(sys.argv[1:])
