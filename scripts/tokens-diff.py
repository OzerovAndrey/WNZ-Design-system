"""Порівняння двох експортів Token Studio (структура tokens/system/).

Запуск:  python3 -I scripts/tokens-diff.py <старий експорт> <новий експорт>
Напр.:   python3 -I scripts/tokens-diff.py tokens/system /шлях/до/розпакованого/архіву

Друкує по кожному сету кількість токенів і списки + додано / − видалено / ~ змінено,
а також чи змінились $themes.json і $metadata.json.
"""
import json
import sys

SETS = ['mb/core', 'mb/alias', 'mb/component', 'xon/core', 'xon/alias', 'xon/component']


def flat(d, p=''):
    for k, v in d.items():
        if isinstance(v, dict) and 'value' in v and not isinstance(v['value'], dict):
            yield p + k, (json.dumps(v['value'], ensure_ascii=False), v.get('type'))
        elif isinstance(v, dict):
            yield from flat(v, p + k + '.')


def main(old, new):
    for f in SETS:
        a = dict(flat(json.load(open(f'{old}/{f}.json'))))
        b = dict(flat(json.load(open(f'{new}/{f}.json'))))
        add = sorted(set(b) - set(a))
        rem = sorted(set(a) - set(b))
        chg = sorted(k for k in set(a) & set(b) if a[k] != b[k])
        print(f'== {f}: {len(b)} токенів (було {len(a)}) · +{len(add)} −{len(rem)} ~{len(chg)}')
        for k in add:
            print('  +', k, b[k][0])
        for k in rem:
            print('  −', k, a[k][0])
        for k in chg:
            print('  ~', k, a[k][0], '→', b[k][0])
    for f in ['$themes', '$metadata']:
        same = json.load(open(f'{old}/{f}.json')) == json.load(open(f'{new}/{f}.json'))
        print('==', f, 'однаковий' if same else 'ЗМІНИВСЯ')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
