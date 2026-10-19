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

| Токен | Значення (MB = XON, якщо не вказано інше) |
|---|---|
| `anchor.padding-horizontal` | `{layout.padding-horizontal.xs}` 16 |
| `anchor.gap` | `{spacing.200}` 8 |
| `anchor.item.height` | 20 |
| `anchor.item.padding-left` / `padding-right` | `{spacing.200}` / `{spacing.300}` |
| `anchor.item.gap` | `{spacing.150}` 6 |
| `anchor.item.icon-size` | **16** |
| `border-radius.anchor.item` | MB `{border-radius.core.full}` · XON `{border-radius.core.300}` |
| `contextual.anchor.item.fill` | `{semantic.fill.default}` |
| `contextual.anchor.item.text` | MB `{semantic.text.default.heading}` · XON `{semantic.text.static.primary}` |
| `contextual.anchor.item.icon` | = текст: MB `{semantic.text.default.heading}` · XON `{semantic.text.static.primary}` |
| `contextual.anchor.item-invert.fill` | `{semantic.background.slate-1}` |
| `contextual.anchor.item-invert.text` | `{semantic.text.default-invert.heading}` |
| `contextual.anchor.item-invert.icon` | `{semantic.text.default-invert.heading}` (= текст) |

## Прив'язка
Токени Token Studio стоять на шарах напряму (plugin data `tokens`) + однойменні змінні колекції `Product`.

## Історія рішень (фінальний стан — у таблиці токенів)
1. Точна копія старого Anchor (67758:49763) за правилами ДС; власні токени `anchor.*`.
2. Лейбл темний замість білого — білий не читався на світлому фоні.
3. Іконка 20 → **16 px** — упиралась у краї пункту висотою 20.
4. Варіант `Inverted=True` (як в Accordion/Tabs): **світлий текст ⇒ темна підкладка**.
5. Структура «в рядок»: `contextual.anchor.item.{fill,text,icon}` без рівня `.default`; іконка = колір тексту.
6. ~~Кольори з core під кожен бренд~~ — **скасовано**: кольори компонентів беруться **тільки з alias `semantic.*`**.
7. XON `Inverted=False`: текст/іконка `semantic.text.static.primary`, бо `text.default.heading` у XON білий.

## Відкриті питання
- `semantic.background.slate-1` = фон сторінки XON → плашка `Inverted=True` на сторінці XON не видна (текст читається). Рішення за командою.
- Іконка для multiplier — `rocket` (альтернативи `flash`, `scale-up`).
- Після приймання: старий Anchor → `Deprecated/Anchor`, інстанси в лейаутах переключити.
