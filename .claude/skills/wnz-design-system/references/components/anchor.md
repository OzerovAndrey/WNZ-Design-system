# Anchor

Сторінка `↳ Anchor` · Section `Anchor` (78314:307705) · статус: зібрано заново 2026-10-19, чекає ревʼю (не Ready for dev).

## Призначення
Рядок якірних посилань на секції сторінки: до 4 пунктів з іконкою і лейблом. Два варіанти: `Inverted=False` — світла підкладка + темний лейбл; `Inverted=True` — **темна підкладка** + білий лейбл.

## Анатомія
```
Anchor (COMPONENT_SET, 78336:307530)   Inverted = False | True
├─ Inverted=False (78314:307677)  HORIZONTAL · HUG × 20 · padding L/R anchor/padding-horizontal · gap anchor/gap
│   └─ Item #1…#4  INSTANCE Anchor/Item (Inverted=False), exposed
└─ Inverted=True  (78336:307495)  те саме, Item #1…#4 = Anchor/Item (Inverted=True)

Anchor/Item (COMPONENT_SET, 78336:307494)   Inverted = False | True
├─ Inverted=False (78314:307672) / Inverted=True (78336:307489)
│   HORIZONTAL · HUG × anchor/item/height (20) · padding anchor/item/padding-left / -right · gap anchor/item/gap
│   radius border-radius/anchor/item · fill contextual/anchor/item[-invert]/fill/default
├─ Icon   16×16 = anchor/item/icon-size · колір contextual/anchor/item[-invert]/icon/default
└─ Label  text style text/md-strong · колір contextual/anchor/item[-invert]/text/default
```

## Властивості
`Anchor/Item`: `Inverted` (False | True), `↳ 💠 Icon` (swap, дефолт `document`), `✏️ Label` (text). Лейбл завжди видимий.
`Anchor`: `Inverted` (False | True), `Item #1` … `Item #4` (Boolean — показати/сховати пункт). Інстанси `Item #1…#4` exposed → у панелі `Anchor` редагуються `✏️ Label` і `↳ 💠 Icon` кожного.
Іконки за замовчуванням: `document`, `777`, `statistics`, `rocket`.

## Токени (`mb/component`, `xon/component`)
JSON: `tokens/anchor.mb.component.json`, `tokens/anchor.xon.component.json` (корінь репо).

| Токен | Значення (MB = XON, крім радіуса) |
|---|---|
| `anchor.padding-horizontal` | `{layout.padding-horizontal.xs}` 16 |
| `anchor.gap` | `{spacing.200}` 8 |
| `anchor.item.height` | 20 |
| `anchor.item.padding-left` / `padding-right` | `{spacing.200}` / `{spacing.300}` |
| `anchor.item.gap` | `{spacing.150}` 6 |
| `anchor.item.icon-size` | **16** |
| `border-radius.anchor.item` | MB `{border-radius.core.full}` · XON `{border-radius.core.300}` |
| `contextual.anchor.item.fill.default` | `{semantic.fill.default}` |
| `contextual.anchor.item.text.default` | **`{semantic.text.default.heading}`** (темний на світлому) |
| `contextual.anchor.item.icon.default` | `{core.grey.200}` |
| `contextual.anchor.item-invert.fill.default` | **`{core.grey.800}`** (темна підкладка: MB #001e76 · XON #0c142c) |
| `contextual.anchor.item-invert.text.default` | `{semantic.text.default-invert.heading}` (білий) |
| `contextual.anchor.item-invert.icon.default` | `{core.grey.200}` |

## Прив'язка
Токени Token Studio стоять на шарах напряму (plugin data `tokens`) + однойменні змінні колекції `Product`.

## Історія рішень
- 2026-10-19 — точна копія старого Anchor (67758:49763) за правилами ДС.
- 2026-10-19 — лейбл темний (`semantic.text.default.heading`) замість білого: білий не читався на світлому фоні.
- 2026-10-19 — іконка 20 → **16 px**: 20 px упиралась у краї пункту висотою 20.
- 2026-10-19 — доданий варіант `Inverted=True` для темних фонів (білий текст `semantic.text.default-invert.heading`). Назва варіанта — як в еталонах Accordion/Tabs.
- 2026-10-19 — `Inverted=True`: підкладка темна `{core.grey.800}` (світлий текст ⇒ темна підкладка), а не прозора.
- Варіант property для світлого/темного фону — `Inverted = False | True`; інвертні кольорові токени — `contextual.<component>.<part>-invert.*` (як `button.tertiary-invert`).

## Відкриті питання
- Колір іконки `core.grey.200` однаковий для обох варіантів; на світлому фоні контраст слабкий — перевірити.
- Іконка для multiplier — `rocket` (альтернативи `flash`, `scale-up`).
- Після приймання: старий Anchor → `Deprecated/Anchor`, інстанси в лейаутах переключити.
