# Anchor

Сторінка `↳ Anchor` · Section `Anchor` (78314:307705) · статус: зібрано заново 2026-10-19, чекає ревʼю (не Ready for dev).

## Призначення
Рядок якірних посилань на секції сторінки: 4 пункти з іконкою і лейблом.

## Анатомія
```
Anchor (COMPONENT, 78314:307677)  HORIZONTAL · HUG × HUG · 388×20
│  padding L/R = anchor/padding-horizontal · gap = anchor/gap
└─ 4 × INSTANCE Anchor/Item

Anchor/Item (COMPONENT, 78314:307672)  HORIZONTAL · HUG × 20
│  height = anchor/item/height · padding L/R = anchor/item/padding-left / padding-right
│  gap = anchor/item/gap · radius = border-radius/anchor/item · fill = contextual/anchor/item/fill/default
├─ INSTANCE "Icon"  20×20 = anchor/item/icon-size · колір = contextual/anchor/item/icon/default
└─ TEXT "Label"     text style text/md-strong · колір = contextual/anchor/item/text/default
```

## Властивості `Anchor/Item`
| Властивість | Тип | Дефолт |
|---|---|---|
| `↳ 💠 Icon` | Instance swap | `document` (Static — Icons) |
| `✏️ Label` | Text | `Label` |

## Властивості `Anchor`
| Властивість | Тип | Дефолт | Що робить |
|---|---|---|---|
| `Item 1` … `Item 4` | Boolean | true | показати / сховати відповідний пункт |

Інстанси `Item 1…4` — **exposed nested instances**: у панелі `Anchor` видно і редагуються їхні `✏️ Label`, `↳ 💠 Icon`. Лейбл завжди видимий — вимикати його не можна (рішення команди).

Іконки в `Anchor`: `document`, `777`, `statistics`, `rocket`.

## Токени (`mb/component`, `xon/component`)
JSON: `tokens/anchor.mb.component.json`, `tokens/anchor.xon.component.json` (корінь репо).

| Токен | MB | XON |
|---|---|---|
| `anchor.padding-horizontal` | `{layout.padding-horizontal.xs}` 16 | = |
| `anchor.gap` | `{spacing.200}` 8 | = |
| `anchor.item.height` | 20 | = |
| `anchor.item.padding-left` / `padding-right` | `{spacing.200}` / `{spacing.300}` | = |
| `anchor.item.gap` | `{spacing.150}` 6 | = |
| `anchor.item.icon-size` | 20 | = |
| `border-radius.anchor.item` | `{border-radius.core.full}` | `{border-radius.core.300}` |
| `contextual.anchor.item.fill.default` | `{semantic.fill.default}` | = |
| `contextual.anchor.item.text.default` | `{core.white.500}` | = |
| `contextual.anchor.item.icon.default` | `{core.grey.200}` | = |

## Прив'язка
Токени Token Studio стоять на шарах напряму (plugin data `tokens`) + однойменні змінні колекції `Product`.

## Рішення та відкриті питання
- Точна копія старого Anchor (67758:49763): ті самі розміри і кількість пунктів, нічого не додано.
- Старий компонент рендериться темним через застарілий кешований колір в інстансі; за токенами в MB плашка світла, білий лейбл — низький контраст. Рішення за командою: змінити `contextual.anchor.item.fill.default` або `.text.default` у `mb/component`.
- Іконка для multiplier — `rocket` (точного відповідника немає; альтернативи `flash`, `scale-up`).
- Після приймання: старий → `Deprecated/Anchor`, інстанси в лейаутах переключити.
