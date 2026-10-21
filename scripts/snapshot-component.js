// Знімок компонента для режиму навчання (read-only — нічого не змінює).
// Виконати через use_figma (перед цим — скіл figma-use).
// IDS — id COMPONENT_SET або COMPONENT (або Section / сторінки — тоді беруться всі набори всередині).
// Результат зберегти як є у snapshots/<component>.json. Порядок — references/learning-workflow.md.
const IDS = ["78336:307494"];
const MAX_VARIANTS = 400;   // захист від гігантських наборів
const VARIANT_FROM = 0;     // якщо відповідь > 48 КБ — знімати порціями (0, 60, 120 …) і склеювати perVariant
const MAX_DEPTH = 12;
const DIGEST = true;        // результат для git: властивості + хеш атрибутів кожного шару в кожному варіанті (кілька КБ)
const BASELINE = null;      // вставити сюди вміст snapshots/<c>.json — скрипт поверне лише зміни з новими значеннями
const LITE = true;          // знімок для git: лише семантика (структура, токени, властивості, стилі, інстанси); false — повний, для аналізу
const COMPACT = true;       // не писати Figma-змінну, якщо на тій самій властивості є токен Token Studio (vars лишаються лише там, де токена немає)
const VAR2TOKEN = { fills: 'fill', strokes: 'borderColor', topLeftRadius: 'borderRadiusTopLeft', topRightRadius: 'borderRadiusTopRight',
  bottomLeftRadius: 'borderRadiusBottomLeft', bottomRightRadius: 'borderRadiusBottomRight', effects: 'boxShadow',
  strokeTopWeight: 'borderWidthTop', strokeBottomWeight: 'borderWidthBottom', strokeLeftWeight: 'borderWidthLeft', strokeRightWeight: 'borderWidthRight' };
const TYPO = ['fontSize', 'fontFamily', 'lineHeight', 'fontWeight', 'letterSpacing', 'paragraphSpacing', 'fontStyle'];

const vc = {}, sc = {};
async function vName(id) {
  if (vc[id] !== undefined) return vc[id];
  const v = await figma.variables.getVariableByIdAsync(id);
  vc[id] = v ? (v.remote ? 'R:' : '') + v.name : 'MISSING:' + id;
  return vc[id];
}
async function sName(id) {
  if (!id || typeof id !== 'string') return id === figma.mixed ? 'MIXED' : null;
  if (sc[id] !== undefined) return sc[id];
  const s = await figma.getStyleByIdAsync(id);
  sc[id] = s ? (s.remote ? 'R:' : '') + s.name : 'MISSING';
  return sc[id];
}
const hex = c => '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
function paints(p) {
  if (!Array.isArray(p)) return undefined;
  const v = p.filter(x => x.visible !== false);
  if (!v.length) return undefined;
  return v.map(x => x.type === 'SOLID' ? hex(x.color) + (x.opacity !== undefined && x.opacity < 1 ? '@' + x.opacity.toFixed(2) : '') : x.type);
}
async function bound(n) {
  const bv = n.boundVariables || {}, o = {};
  for (const k of Object.keys(bv)) {
    const arr = [].concat(bv[k]).filter(a => a && a.id);
    if (arr.length) { const names = []; for (const a of arr) names.push(await vName(a.id)); o[k] = names.length === 1 ? names[0] : names; }
  }
  return o;
}
function tsTokens(n) {
  const o = {};
  for (const k of n.getSharedPluginDataKeys('tokens')) {
    if (k === 'hash') continue;
    const raw = n.getSharedPluginData('tokens', k);
    try { o[k] = JSON.parse(raw); } catch (e) { o[k] = raw; }
  }
  return o;
}
const clean = k => k.split('#')[0];
// чотири однакові кути/сторони → один ключ (компактніше, diff не губить зміни: розбіжність лишає окремі ключі)
const SQUASH = [
  ['borderRadius', ['borderRadiusTopLeft', 'borderRadiusTopRight', 'borderRadiusBottomRight', 'borderRadiusBottomLeft']],
  ['borderWidth', ['borderWidthTop', 'borderWidthRight', 'borderWidthBottom', 'borderWidthLeft']],
  ['radius', ['topLeftRadius', 'topRightRadius', 'bottomRightRadius', 'bottomLeftRadius']],
  ['strokeWeight', ['strokeTopWeight', 'strokeRightWeight', 'strokeBottomWeight', 'strokeLeftWeight']],
  ['paddingX', ['paddingLeft', 'paddingRight']], ['paddingY', ['paddingTop', 'paddingBottom']], ['size', ['width', 'height']]];
function squash(o) {
  for (const [to, keys] of SQUASH) {
    if (keys.every(k => o[k] !== undefined) && keys.every(k => JSON.stringify(o[k]) === JSON.stringify(o[keys[0]]))) {
      const v = o[keys[0]]; for (const k of keys) delete o[k]; o[to] = v;
    }
  }
  return o;
}

async function layer(n, depth) {
  const o = { name: n.name, type: n.type };
  if (n.visible === false) o.hidden = true;
  if ('width' in n) o.size = Math.round(n.width) + 'x' + Math.round(n.height);
  if (n.layoutMode && n.layoutMode !== 'NONE') {
    o.layout = { mode: n.layoutMode, w: n.layoutSizingHorizontal, h: n.layoutSizingVertical,
      pad: [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft], gap: n.itemSpacing,
      align: n.primaryAxisAlignItems + '/' + n.counterAxisAlignItems };
    if (n.layoutWrap === 'WRAP') o.layout.wrap = true;
  } else if (n.parent && n.parent.layoutMode && n.parent.layoutMode !== 'NONE' && 'layoutSizingHorizontal' in n) {
    o.sizing = n.layoutSizingHorizontal + '/' + n.layoutSizingVertical;
  }
  if (n.layoutPositioning === 'ABSOLUTE') o.absolute = true;
  if ('cornerRadius' in n) {
    if (n.cornerRadius === figma.mixed) o.radius = [n.topLeftRadius, n.topRightRadius, n.bottomRightRadius, n.bottomLeftRadius];
    else if (n.cornerRadius > 0) o.radius = n.cornerRadius;
  }
  if ('opacity' in n && n.opacity < 1) o.opacity = +n.opacity.toFixed(2);
  if (n.type !== 'INSTANCE') {
    const f = paints(n.fills); if (f) o.fills = f;
    const fs = await sName(n.fillStyleId); if (fs) o.fillStyle = fs;
    const s = paints(n.strokes); if (s) { o.strokes = s; o.strokeWeight = n.strokeWeight === figma.mixed ? 'MIXED' : n.strokeWeight; }
    if ('effects' in n && n.effects.length) { o.effects = n.effects.filter(e => e.visible !== false).map(e => e.type); const es = await sName(n.effectStyleId); if (es) o.effectStyle = es; }
  }
  if (n.type === 'TEXT') {
    o.text = { chars: n.characters.slice(0, 60), style: await sName(n.textStyleId) };
    if (n.textAutoResize) o.text.autoResize = n.textAutoResize;
  }
  const b = await bound(n); const t = tsTokens(n);
  if (COMPACT) for (const k of Object.keys(b)) {
    if (t[VAR2TOKEN[k] || k] !== undefined || (TYPO.includes(k) && t.typography !== undefined)) delete b[k];
  }
  delete t.version; delete t.textStyleId_original;
  if (Object.keys(b).length) o.vars = squash(b);
  if (Object.keys(t).length) o.tokens = squash(t);
  if (n.componentPropertyReferences && Object.keys(n.componentPropertyReferences).length) {
    o.props = {}; for (const [k, v] of Object.entries(n.componentPropertyReferences)) o.props[k] = clean(v);
  }
  if (LITE) lite(o, depth);
  if (n.type === 'INSTANCE') {
    const m = await n.getMainComponentAsync();
    o.instanceOf = m ? ((m.parent && m.parent.type === 'COMPONENT_SET') ? m.parent.name + ' / ' + m.name : m.name) + (m.remote ? ' (remote)' : '') : 'MISSING';
    const ip = {}; for (const [k, v] of Object.entries(n.componentProperties || {})) ip[clean(k)] = v.value;
    if (Object.keys(ip).length) o.instanceProps = ip;
    return o; // всередину інстансів не заходимо
  }
  if ('children' in n && depth < MAX_DEPTH) {
    o.children = [];
    for (const c of n.children) o.children.push(await layer(c, depth + 1));
  }
  return o;
}

// канонічний JSON (ключі відсортовані) + FNV-1a 32 → 8 hex
function canon(v) {
  if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
  if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}';
  return JSON.stringify(v);
}
function fnv(str) { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return ('0000000' + h.toString(16)).slice(-8); }

// LITE: прибрати те, що дублює токени або міняється без зміни дизайну
function lite(o, depth) {
  const t = o.tokens || {};
  if (depth > 0) delete o.size;
  if (t.fill !== undefined) delete o.fills;
  if (t.borderColor !== undefined) { delete o.strokes; delete o.strokeWeight; }
  if (o.text) { delete o.text.chars; delete o.text.autoResize; }
  if (o.layout) {
    const hasPad = ['paddingX', 'paddingY', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'].some(k => t[k] !== undefined);
    if (hasPad) delete o.layout.pad;
    if (t.itemSpacing !== undefined) delete o.layout.gap;
  }
  if ((t.borderRadius !== undefined || t.borderRadiusTopLeft !== undefined) && o.radius !== undefined) delete o.radius;
}

// дерево → { шлях: атрибути }; однакові імена сусідів отримують [i]
function flat(t, path, out) {
  const a = {}; for (const k of Object.keys(t)) if (k !== 'name' && k !== 'children') a[k] = t[k];
  out[path] = a;
  const cnt = {}, idx = {};
  for (const c of t.children || []) cnt[c.name] = (cnt[c.name] || 0) + 1;
  for (const c of t.children || []) {
    let nm = c.name;
    if (cnt[c.name] > 1) { const i = idx[c.name] || 0; idx[c.name] = i + 1; nm = c.name + '[' + i + ']'; }
    flat(c, path === '(root)' ? nm : path + ' > ' + nm, out);
  }
}

function ctx(n) {
  let p = n.parent, section = null;
  while (p && p.type !== 'PAGE') { if (p.type === 'SECTION' && !section) section = p.name + ' (' + p.id + ')'; p = p.parent; }
  return { page: p ? p.name.trim() : null, section };
}

async function snap(node) {
  const base = { id: node.id, name: node.name, type: node.type, ...ctx(node), descriptionLength: (node.description || '').length };
  let defs = null;
  try { defs = node.componentPropertyDefinitions; } catch (e) { base.error = 'SET HAS ERRORS: ' + e.message; }
  if (defs) {
    base.properties = {};
    for (const [k, d] of Object.entries(defs)) {
      const p = { type: d.type, default: d.defaultValue };
      if (d.variantOptions) p.options = d.variantOptions;
      if (d.preferredValues && d.preferredValues.length) p.preferred = d.preferredValues.length;
      base.properties[clean(k)] = p;
    }
  }
  const variants = node.type === 'COMPONENT_SET' ? node.children.filter(c => c.type === 'COMPONENT') : [node];
  base.variantCount = variants.length;
  const vs = variants.slice(VARIANT_FROM, VARIANT_FROM + MAX_VARIANTS);
  if (vs.length < variants.length) base.slice = [VARIANT_FROM, VARIANT_FROM + vs.length];
  // формат v2: спільні атрибути шарів (common) + відмінності кожного варіанта (perVariant)
  const flats = {};
  for (const v of vs) { const f = {}; flat(await layer(v, 0), '(root)', f); flats[v.name] = f; }
  if (DIGEST) {
    const d = { id: base.id, name: base.name, page: base.page, section: base.section, descriptionLength: base.descriptionLength,
      properties: base.properties, variantCount: base.variantCount, format: 'digest', variants: {} };
    if (base.error) d.error = base.error;
    for (const [vn, f] of Object.entries(flats)) { d.variants[vn] = {}; for (const [p, a] of Object.entries(f)) d.variants[vn][p] = fnv(canon(a)); }
    d._flats = flats;
    return d;
  }
  base.format = 2;
  if (!LITE) {
    base.variantIds = Object.fromEntries(vs.map(v => [v.name, v.id]));
    base.variantProps = Object.fromEntries(vs.map(v => [v.name, v.variantProperties || null]));
  }
  const names = Object.keys(flats), paths = new Set();
  for (const n of names) for (const p of Object.keys(flats[n])) paths.add(p);
  base.common = {}; base.perVariant = Object.fromEntries(names.map(n => [n, {}]));
  for (const p of paths) {
    const inAll = names.every(n => flats[n][p]);
    const keys = new Set(); for (const n of names) if (flats[n][p]) for (const k of Object.keys(flats[n][p])) keys.add(k);
    const com = {};
    for (const k of keys) {
      const vals = names.map(n => flats[n][p] ? JSON.stringify(flats[n][p][k]) : '§missing');
      if (inAll && vals.every(x => x === vals[0]) && vals[0] !== undefined) com[k] = flats[names[0]][p][k];
      else for (const n of names) if (flats[n][p]) { (base.perVariant[n][p] = base.perVariant[n][p] || {})[k] = flats[n][p][k] === undefined ? null : flats[n][p][k]; }
    }
    if (inAll) base.common[p] = com;
    else for (const n of names) if (!flats[n][p]) (base.perVariant[n][p] = '§missing');
  }
  if (node.type === 'COMPONENT_SET') {
    base.set = { size: Math.round(node.width) + 'x' + Math.round(node.height), layout: node.layoutMode,
      fills: paints(node.fills), vars: await bound(node) };
  }
  return base;
}

const out = [];
for (const id of IDS) {
  const n = await figma.getNodeByIdAsync(id);
  if (!n) { out.push({ id, error: 'NOT FOUND' }); continue; }
  if (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') {
    let pg = n; while (pg && pg.type !== 'PAGE') pg = pg.parent; if (pg) await figma.setCurrentPageAsync(pg);
    out.push(await snap(n)); continue; }
  if (n.type === 'PAGE') await figma.setCurrentPageAsync(n);
  const sets = n.findAllWithCriteria({ types: ['COMPONENT_SET'] });
  const singles = n.findAllWithCriteria({ types: ['COMPONENT'] }).filter(c => !c.parent || c.parent.type !== 'COMPONENT_SET');
  for (const s of [...sets, ...singles]) out.push(await snap(s));
}
function compare(old, cur) {
  const r = { name: cur.name, id: cur.id };
  if (!old) { r.status = 'NEW'; return r; }
  const pa = old.properties || {}, pb = cur.properties || {};
  const props = [];
  for (const k of Object.keys(pb)) if (!(k in pa)) props.push(['+', k, pb[k]]); else if (canon(pa[k]) !== canon(pb[k])) props.push(['~', k, pa[k], pb[k]]);
  for (const k of Object.keys(pa)) if (!(k in pb)) props.push(['-', k]);
  if (props.length) r.properties = props;
  for (const k of ['page', 'section', 'descriptionLength', 'error']) if (canon(old[k]) !== canon(cur[k])) (r.meta = r.meta || {})[k] = [old[k], cur[k]];
  const va = old.variants || {}, vb = cur.variants || {};
  const added = Object.keys(vb).filter(v => !(v in va)), removed = Object.keys(va).filter(v => !(v in vb));
  if (added.length) r.variantsAdded = added; if (removed.length) r.variantsRemoved = removed;
  const layers = {};
  for (const vn of Object.keys(vb)) { if (!(vn in va)) continue;
    for (const p of Object.keys(vb[vn])) if (va[vn][p] !== vb[vn][p]) { const key = p + (va[vn][p] ? '' : ' [+]'); (layers[key] = layers[key] || { now: cur._flats[vn][p], variants: [] }).variants.push(vn); }
    for (const p of Object.keys(va[vn])) if (!(p in vb[vn])) (layers[p + ' [-]'] = layers[p + ' [-]'] || { variants: [] }).variants.push(vn); }
  if (Object.keys(layers).length) r.layers = layers;
  if (!r.properties && !r.meta && !added.length && !removed.length && !r.layers) r.status = 'UNCHANGED';
  return r;
}
const takenAt = new Date().toISOString();
if (DIGEST && BASELINE) {
  const byId = Object.fromEntries((BASELINE.components || []).map(c => [c.id, c]));
  return { takenAt, baselineTakenAt: BASELINE.takenAt, changes: out.map(c => compare(byId[c.id], c)),
    removed: (BASELINE.components || []).filter(c => !out.some(o => o.id === c.id)).map(c => c.name) };
}
if (DIGEST) for (const c of out) delete c._flats;
return { takenAt, fileKey: figma.fileKey, components: out };
