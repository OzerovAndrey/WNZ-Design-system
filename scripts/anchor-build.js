// ⚠️ Перша версія скрипта (до правок команди). Фінальний стан Anchor: без description, без Boolean "Label", exposed Item #1–#4, токени Token Studio на шарах — див. .claude/skills/wnz-design-system/references/components/anchor.md і rebuild-workflow.md.
// Anchor — точна копія, правильна збірка. Запуск: use_figma у файлі 3MbdWPLOGBjBj92Y3EnPYN
// Передумови: 1) токени з tokens/anchor.*.component.json додані в Token Studio і експортовані у Variables;
//             2) акаунт Figma MCP має право Can edit на файл.
const page = await figma.getNodeByIdAsync("78057:363468"); // сторінка ↳ Anchor
await figma.setCurrentPageAsync(page);

// --- змінні за назвою (колекція Product) ---
const all = await figma.variables.getLocalVariablesAsync();
const V = name => { const v = all.find(x => x.name === name); if (!v) throw new Error("Немає змінної: " + name); return v; };
const t = {
  padX: V("anchor/padding-horizontal"), gap: V("anchor/gap"),
  h: V("anchor/item/height"), pl: V("anchor/item/padding-left"), pr: V("anchor/item/padding-right"),
  igap: V("anchor/item/gap"), icon: V("anchor/item/icon-size"), r: V("border-radius/anchor/item"),
  fill: V("contextual/anchor/item/fill/default"), text: V("contextual/anchor/item/text/default"),
  iconC: V("contextual/anchor/item/icon/default"),
};
const paint = v => figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 1, g: 1, b: 1 } }, "color", v);
const textStyle = (await figma.getLocalTextStylesAsync()).find(s => s.name === "text/md-strong");
await figma.loadFontAsync(textStyle.fontName);

// --- іконки зі Static — Icons (заміна remote menu/*) ---
const [icDoc, ic777, icStat, icRocket] = await Promise.all([
  "b79ce989137f0738563539dd460636ccd424900d", // document   ← menu / books
  "22c8ef23241d853b4d9d9ff1de09678e398c9a95", // 777        ← menu / slot_mashine
  "05a9e11fb5b77077ee4536174aeb73bec768dd47", // statistics ← menu / leaderboard
  "6277637e21d265afbc79544642685895a3e9ef99", // rocket     ← icons / tournaments lottery / multiplier
].map(k => figma.importComponentByKeyAsync(k)));
const tintIcon = inst => { for (const n of inst.findAll(n => n.type !== "INSTANCE" && n.type !== "FRAME" && "fills" in n && Array.isArray(n.fills) && n.fills.length)) n.fills = [paint(t.iconC)]; };

// --- Anchor/Item ---
const item = figma.createComponent();
item.name = "Anchor/Item";
item.set({ layoutMode: "HORIZONTAL", counterAxisAlignItems: "CENTER", primaryAxisSizingMode: "AUTO", counterAxisSizingMode: "FIXED" });
item.resize(80, 20);
item.paddingLeft = 8; item.paddingRight = 12; item.itemSpacing = 6;
for (const [p, v] of [["height", t.h], ["paddingLeft", t.pl], ["paddingRight", t.pr], ["itemSpacing", t.igap],
  ["topLeftRadius", t.r], ["topRightRadius", t.r], ["bottomLeftRadius", t.r], ["bottomRightRadius", t.r]]) item.setBoundVariable(p, v);
item.fills = [paint(t.fill)];

const iconKey = item.addComponentProperty("↳ 💠 Icon", "INSTANCE_SWAP", icDoc.id);
const showLabelKey = item.addComponentProperty("Label", "BOOLEAN", true);
const labelKey = item.addComponentProperty("✏️ Label", "TEXT", "Label");

const ic = icDoc.createInstance(); item.appendChild(ic); ic.name = "Icon"; ic.resize(20, 20);
ic.setBoundVariable("width", t.icon); ic.setBoundVariable("height", t.icon); tintIcon(ic);
ic.componentPropertyReferences = { mainComponent: iconKey };

const lbl = figma.createText(); item.appendChild(lbl); lbl.name = "Label";
await lbl.setTextStyleIdAsync(textStyle.id); lbl.characters = "Label"; lbl.fills = [paint(t.text)];
lbl.componentPropertyReferences = { characters: labelKey, visible: showLabelKey };
item.description = "Пункт якірної навігації: іконка зі Static — Icons + лейбл. Токени: anchor/item/*, contextual/anchor/item/*, border-radius/anchor/item.";

// --- Anchor ---
const anchor = figma.createComponent();
anchor.name = "Anchor";
anchor.set({ layoutMode: "HORIZONTAL", counterAxisAlignItems: "CENTER", primaryAxisSizingMode: "AUTO", counterAxisSizingMode: "AUTO" });
anchor.fills = []; anchor.paddingLeft = 16; anchor.paddingRight = 16; anchor.itemSpacing = 8;
anchor.setBoundVariable("paddingLeft", t.padX); anchor.setBoundVariable("paddingRight", t.padX); anchor.setBoundVariable("itemSpacing", t.gap);
for (const icn of [icDoc, ic777, icStat, icRocket]) {
  const i = item.createInstance(); anchor.appendChild(i); i.name = "Anchor/Item";
  i.setProperties({ [iconKey]: icn.id });
  const sw = i.findOne(n => n.type === "INSTANCE" && n.name === "Icon"); if (sw) tintIcon(sw);
}
anchor.description = "Рядок якірних посилань (4 × Anchor/Item). Падінги anchor/padding-horizontal, відступ anchor/gap. Точна копія старого Anchor, зібрана за правилами ДС.";

// --- розміщення: Section поруч з оригіналом ---
const orig = page.children.find(n => n.type === "COMPONENT" && n.name === "Anchor" && n.id === "67758:49763");
const sec = figma.createSection(); page.appendChild(sec); sec.name = "Anchor (new)";
sec.x = orig.x + orig.width + 240; sec.y = orig.y - 80;
sec.appendChild(item); sec.appendChild(anchor);
item.x = 80; item.y = 80; anchor.x = 80; anchor.y = item.y + item.height + 80;
sec.resizeWithoutConstraints(Math.max(item.width, anchor.width) + 160, anchor.y + anchor.height + 80);

return { sectionId: sec.id, itemId: item.id, anchorId: anchor.id, props: Object.keys(item.componentPropertyDefinitions) };
