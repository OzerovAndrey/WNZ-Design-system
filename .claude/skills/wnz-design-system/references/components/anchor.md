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
│   radius border-radius/anchor/item · fill contextual/anchor/item[-invert]/fill
├─ Icon   16×16 = anchor/item/icon-size · колір contextual/anchor/item[-invert]/icon
└─ Label  text style text/md-strong · колір contextual/anchor/item[-invert]/text
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
| `contextual.anchor.item.fill` | MB `{core.brand-60.100}` #d6e0ff · XON `{core.grey.50}` #e3e8f8 |
| `contextual.anchor.item.text` | MB `{core.grey.700}` #002491 · XON `{core.grey.800}` #0c142c |
| `contextual.anchor.item.icon` | `{contextual.anchor.item.text}` (= колір тексту) |
| `contextual.anchor.item-invert.fill` | MB `{core.grey.800}` #001e76 · XON `{core.grey.500}` #203879 |
| `contextual.anchor.item-invert.text` | `{core.white.500}` (обидва) |
| `contextual.anchor.item-invert.icon` | `{contextual.anchor.item-invert.text}` (= колір тексту) |

## Прив'язка
Токени Token Studio стоять на шарах напряму (plugin data `tokens`) + однойменні змінні колекції `Product`.

## Історія рішень
- 2026-10-19 — точна копія старого Anchor (67758:49763) за правилами ДС.
- 2026-10-19 — лейбл темний (`semantic.text.default.heading`) замість білого: білий не читався на світлому фоні.
- 2026-10-19 — іконка 20 → **16 px**: 20 px упиралась у краї пункту висотою 20.
- 2026-10-19 — доданий варіант `Inverted=True` для темних фонів (білий текст `semantic.text.default-invert.heading`). Назва варіанта — як в еталонах Accordion/Tabs.
- 2026-10-19 — `Inverted=True`: підкладка темна `{core.grey.800}` (світлий текст ⇒ темна підкладка), а не прозора.
- Варіант property для світлого/темного фону — `Inverted = False | True`; інвертні кольорові токени — `contextual.<component>.<part>-invert.*` (як `button.tertiary-invert`).

- 2026-10-19 — кольори без зайвого рівня `.default` (структура «в рядок», як у Button); іконка = колір тексту (аліас на `…text`).

- 2026-10-19 — кольори підібрані **окремо під кор кожного бренду** (MB — світлий продукт, XON — темний): semantic-аліаси давали в XON білий текст на світлій плашці і темну плашку, що зливалась з фоном сторінки #0e1935.

## Відкриті питання
- Іконка для multiplier — `rocket` (альтернативи `flash`, `scale-up`).
- Після приймання: старий Anchor → `Deprecated/Anchor`, інстанси в лейаутах переключити.
