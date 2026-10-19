# Скрипт аудиту (read-only)

Перед викликом `use_figma` завантажити скіл `figma-use`. Скрипт нічого не змінює.
Підставити ID сторінок у `IDS` (батч 4–7 сторінок; великі сторінки — по одній).

```js
const IDS = ["27785:180412"]; // id сторінок
const vc = {};
async function vn(id){ if (vc[id] !== undefined) return vc[id];
  const v = await figma.variables.getVariableByIdAsync(id);
  vc[id] = v ? (v.remote ? 'R:' : '') + v.name : 'MISSING'; return vc[id]; }
// не заходимо всередину інстансів; корінь інстансу не рахуємо в токенах
function walk(n, f){ f(n); if ('children' in n && n.type !== 'INSTANCE') for (const c of n.children) walk(c, f); }
const out = [];
for (const pid of IDS) {
  const page = await figma.getNodeByIdAsync(pid); await figma.setCurrentPageAsync(page);
  const sets = page.findAllWithCriteria({ types: ['COMPONENT_SET'] });
  const singles = page.findAllWithCriteria({ types: ['COMPONENT'] }).filter(c => !c.parent || c.parent.type !== 'COMPONENT_SET');
  const st = { nodes:0, hardFill:0, hardStroke:0, textNoStyle:0, noAL:0, hardRadius:0, hardGap:0, hardPad:0, defaultNames:0, effNoStyle:0, abs:0 };
  const groups = {}, remote = new Set(), ex = { hardFill:[], textNoStyle:[], noAL:[], defaultNames:[] };
  const push = (k, n) => { if (ex[k].length < 5) ex[k].push(n.name); };
  const nodes = []; for (const r of [...sets, ...singles]) walk(r, n => nodes.push(n));
  for (const n of nodes) { st.nodes++; const bv = n.boundVariables || {};
    if (n.type !== 'INSTANCE') for (const k of Object.keys(bv)) for (const a of [].concat(bv[k])) if (a && a.id) {
      const nm = await vn(a.id); if (nm.startsWith('R:')) remote.add(nm.slice(2));
      const g = nm.split('/').slice(0, 2).join('/'); groups[g] = (groups[g] || 0) + 1; }
    if (/^(Frame|Group|Rectangle|Ellipse|Vector|Line|Union|Subtract) \d+$/.test(n.name)) { st.defaultNames++; push('defaultNames', n); }
    if (n.layoutPositioning === 'ABSOLUTE') st.abs++;
    if (n.type === 'INSTANCE') continue;
    if ('fills' in n && Array.isArray(n.fills) && n.name !== 'Mask' &&
        n.fills.some(f => f.visible !== false && (f.type === 'SOLID' || f.type.startsWith('GRADIENT'))) &&
        !n.fillStyleId && !(bv.fills && bv.fills.length)) { st.hardFill++; push('hardFill', n); }
    if ('strokes' in n && n.strokes.some(s => s.visible !== false) && !n.strokeStyleId && !(bv.strokes && bv.strokes.length)) st.hardStroke++;
    if (n.type === 'TEXT' && (!n.textStyleId || typeof n.textStyleId !== 'string')) { st.textNoStyle++; push('textNoStyle', n); }
    if ((n.type === 'FRAME' || n.type === 'COMPONENT') && n.layoutMode === 'NONE' && n.children.length > 1) { st.noAL++; push('noAL', n); }
    if (typeof n.cornerRadius === 'number' && n.cornerRadius > 0 && !bv.topLeftRadius) st.hardRadius++;
    if (n.layoutMode && n.layoutMode !== 'NONE') {
      if (n.itemSpacing > 0 && !bv.itemSpacing) st.hardGap++;
      if ((n.paddingLeft > 0 || n.paddingTop > 0) && !bv.paddingLeft && !bv.paddingTop) st.hardPad++; }
    if ('effects' in n && n.effects.length && !n.effectStyleId) st.effNoStyle++;
  }
  const setsOut = sets.map(s => { let p; try { const d = s.componentPropertyDefinitions;
      p = Object.keys(d).map(k => k.split('#')[0] + ':' + d[k].type[0] + (d[k].type === 'VARIANT' ? '=' + d[k].variantOptions.join('|') : '')).join(', ');
    } catch (e) { p = '!! SET HAS ERRORS'; }
    return `${s.name} [${s.children.length}v] {${p}} desc=${(s.description || '').length}`; });
  out.push({ page: page.name.trim(), sections: page.findAllWithCriteria({ types: ['SECTION'] }).map(s => s.name),
    sets: setsOut, singles: singles.map(c => c.name), canvas: page.children.map(c => c.type + ':' + c.name).slice(0, 15),
    st, remoteVars: [...remote], groups, ex });
}
return out;
```

## Як читати результат

| Метрика | Норма (еталон) | Тривога |
|---|---|---|
| `hardFill` / `hardStroke` | 0 (маски не рахуються) | > 0 |
| `textNoStyle` | 0 | > 0 |
| `effNoStyle` | 0 | > 0 |
| `defaultNames` | 0 | > 0 |
| `noAL` | 0 | > 0 |
| `remoteVars` | `[]` | будь-яка чужа змінна |
| `hardGap` / `hardPad` / `hardRadius` | бажано 0; в еталонах ще є (gap у Button) | масово → фіксити |
| `sets[*]` з `!! SET HAS ERRORS` | — | конфлікт варіантів |
| `desc=0` | зараз у всіх | додати description |
| `groups` | лише свій `contextual/<component>`, `semantic/*`, розмірні | чужі `contextual/*`, `core/*` поза ефектами |
| `canvas` | лише `SECTION:<Component>` | TEXT, VECTOR, INSTANCE на канвасі |

Для лейаутів окремо рахувати: `getMainComponentAsync()` (remote / local / deprecated), дефолтні імена фреймів, фрейми без auto layout, тексти без стилю.
