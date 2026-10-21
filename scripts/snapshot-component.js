// Знімок компонента для режиму навчання (read-only — нічого не змінює).
// Виконати через use_figma (перед цим — скіл figma-use).
// IDS — id COMPONENT_SET або COMPONENT (або Section / сторінки — тоді беруться всі набори всередині).
// Результат зберегти як є у snapshots/<component>.json. Порядок — references/learning-workflow.md.
const IDS = ["78336:307494"];
const MAX_VARIANTS = 400;   // захист від гігантських наборів
const MAX_DEPTH = 12;

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
  const b = await bound(n); if (Object.keys(b).length) o.vars = b;
  const t = tsTokens(n); if (Object.keys(t).length) o.tokens = t;
  if (n.componentPropertyReferences && Object.keys(n.componentPropertyReferences).length) {
    o.props = {}; for (const [k, v] of Object.entries(n.componentPropertyReferences)) o.props[k] = clean(v);
  }
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
  if (variants.length > MAX_VARIANTS) base.truncated = true;
  base.variants = [];
  for (const v of variants.slice(0, MAX_VARIANTS)) {
    base.variants.push({ id: v.id, name: v.name, props: v.variantProperties || null, tree: await layer(v, 0) });
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
  if (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') { out.push(await snap(n)); continue; }
  if (n.type === 'PAGE') await figma.setCurrentPageAsync(n);
  const sets = n.findAllWithCriteria({ types: ['COMPONENT_SET'] });
  const singles = n.findAllWithCriteria({ types: ['COMPONENT'] }).filter(c => !c.parent || c.parent.type !== 'COMPONENT_SET');
  for (const s of [...sets, ...singles]) out.push(await snap(s));
}
return { takenAt: new Date().toISOString(), fileKey: figma.fileKey, components: out };
