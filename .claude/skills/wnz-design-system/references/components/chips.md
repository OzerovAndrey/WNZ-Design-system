# Chips

Сторінка `↳ Chips & Tags` (46778:61630) · Section `Chips` (78563:91) · набір `Chips` (78563:90) · статус: зібрано заново 2026-10-21, чекає ревʼю (не Ready for dev). Оригінал — `Chips` (46859:45827), не змінювався.

## Призначення
Інтерактивний перемикач для фільтрів і вибору опцій: клікабельний **весь** чіп, `Selected` = опція увімкнена. Не для дій (це `Button`) і не для показу вже обраного значення (це `Tag`).

## Анатомія
```
Chips (COMPONENT_SET 78563:90)   State = Default | Hover | Selected | Disabled · Inverted = False | True  (8 варіантів)
└─ State=…, Inverted=…   HORIZONTAL · HUG × chips/height (32) · padding L/R chips/padding-horizontal · gap chips/gap
   radius border-radius/chips · stroke 1 INSIDE contextual/chips/base[-invert]/border/<state>
   fill — лише Selected: contextual/chips/base[-invert]/fill
   ├─ ⬅️ Icon   placeholder · chips/icon-size (18) · колір …/color/<state>     ← bool ⬅️ Icon (off), swap ↳ 💠 Icon left
   ├─ Content   HORIZONTAL · padding L/R chips/label/padding-horizontal (оптичний відступ тексту, як в оригіналі)
   │   └─ Label  text style text/md · колір …/color/<state>                      ← ✏️ Label
   └─ Icon ➡️   plus · chips/icon-size · колір …/color/<state>                   ← bool Icon ➡️ (on), swap ↳ 💠 Icon right
```
Розміри збігаються з оригіналом: 82×32 (з правою іконкою): 8 + 18 + 2 + (4 + текст + 4) + 2 + 18 + 8.

## Властивості
`State`, `Inverted` (variant) · `⬅️ Icon`, `Icon ➡️` (boolean) · `↳ 💠 Icon left`, `↳ 💠 Icon right` (swap) · `✏️ Label` (text).

## Токени (`mb/component`, `xon/component`)
JSON: `tokens/chips.mb.component.json`, `tokens/chips.xon.component.json` (MB = XON).
Наявні й перевикористані: `border-radius.chips` = `{border-radius.core.full}`.

| Токен | Значення | Було в оригіналі |
|---|---|---|
| `chips.height` | 32 | фіксовано 32 |
| `chips.padding-horizontal` | `{spacing.200}` 8 | hardcode 8 |
| `chips.gap` | `{spacing.50}` 2 | hardcode 2 |
| `chips.icon-size` | 18 | hardcode 18 |
| `chips.label.padding-horizontal` | `{spacing.100}` 4 | hardcode 4 |
| `contextual.chips.base.fill` (лише Selected) | `{semantic.border.default.secondary}` ⚠️ | `core.content.a8` |
| `contextual.chips.base.border.default` | `{semantic.border.default.default}` | `core.grey.300` |
| `contextual.chips.base.border.{hover,selected}` | `{semantic.text.default.heading}` ⚠️ | `core.content.a100` |
| `contextual.chips.base.border.disabled` | `{semantic.border.default.disabled}` | — (стану не було) |
| `contextual.chips.base.color.default` | `{semantic.text.default.secondary}` | текст secondary, іконка `icon.default.tertiary` |
| `contextual.chips.base.color.hover` | `{semantic.text.default.primary}` | текст primary, іконка tertiary |
| `contextual.chips.base.color.selected` | `{semantic.text.default.heading}` | текст heading, іконка `core.content.a100` |
| `contextual.chips.base.color.disabled` | `{semantic.text.disabled.primary}` | — |
| `contextual.chips.base-invert.fill` | `{semantic.border.default.secondary}` ⚠️ | — |
| `contextual.chips.base-invert.border.default` | `{semantic.text.default-invert.tertiary}` ⚠️ | — |
| `contextual.chips.base-invert.border.{hover,selected}` | `{semantic.text.default-invert.heading}` ⚠️ | — |
| `contextual.chips.base-invert.border.disabled` | `{semantic.border.default.disabled}` | — |
| `contextual.chips.base-invert.color.{default,hover,selected}` | `{semantic.text.default-invert.{secondary,primary,heading}}` | — |
| `contextual.chips.base-invert.color.disabled` | `{semantic.text.default-invert.tertiary}` ⚠️ | — |

⚠️ — semantic-токен з іншою роллю або без точного відповідника (див. «Відкриті питання»).

## Прив'язка
Токени Token Studio на шарах (plugin data `tokens`) + однойменні змінні колекції `Product` (створені 2026-10-21, scopes задані). Після вставки JSON у Token Studio і Export змінні оновляться за назвою.

## Історія рішень
1. Точна копія оригіналу: розміри, кількість елементів, обгортка `Content` з оптичним відступом 4 збережені.
2. `State=Active` → `Selected` (чіп — перемикач); додано `Disabled` за DoD.
3. Прибрано порожню властивість `Type=Normal`.
4. Додано `Inverted=True` (правило ДС), токени `base-invert`.
5. Текст і іконка — один токен `color` (правило мінімуму токенів): іконка в Default тепер трохи темніша (a70 замість a50).
6. Нові токени `contextual.chips.base.*` замість `contextual.chips.normal.*` (ті посилались на `core.*` і використовуються оригіналом).
7. Заливки в Default/Hover/Disabled немає (була прозора `core.content.a0`).

## Відкриті питання
- **Немає semantic-токенів** для: легкої заливки вибраного стану (зараз `border.default.secondary`), сильного обведення (зараз `text.default.heading`), світлого обведення на темному фоні (`text.default-invert.tertiary`), disabled на темному фоні (`text.default-invert.tertiary`). Потрібні `semantic.fill.subtle`, `semantic.border.strong`, `semantic.border.default-invert.*`, `semantic.text.disabled-invert.*`?
- `Selected` показує ту саму іконку, що й інші стани (`plus`): swap-властивість спільна для всіх варіантів, іконку для вибраного стану ставлять в інстансі.
- У XON `Inverted=False` і `Inverted=True` однакові (білі) — так за правилом (`semantic.text.default` у XON білий).
- Іконка 18 px — поза сіткою 16/24, збережено як в оригіналі.
- Після приймання: старий набір → `Deprecated/Chips`, токени `contextual.chips.normal.*` і `contextual.achivments.chips.*` — прибрати разом зі старим набором.
