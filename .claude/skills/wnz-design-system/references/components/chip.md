# Chip

Сторінка `↳ Chip & Tag` (46778:61630) · Section `Chip` (78563:91) · набір `Chip` (78563:90) · статус: зібрано заново 2026-10-21, чекає ревʼю (не Ready for dev). Оригінал — `Chips` (46859:45827), не змінювався.

## Призначення
Інтерактивний перемикач для фільтрів і вибору опцій: клікабельний **весь** чіп, `Selected` = опція увімкнена. Не для дій (це `Button`) і не для показу вже обраного значення (це `Tag`).

## Анатомія
```
Chip (COMPONENT_SET 78563:90)   State = Default | Hover | Selected | Disabled · Inverted = False | True  (8 варіантів)
└─ State=…, Inverted=…   HORIZONTAL · HUG × chip/height (32) · padding L/R chip/padding-horizontal · gap chip/gap
   radius border-radius/chip · stroke 1 INSIDE contextual/chip/base[-invert]/border/<state>
   fill — лише Selected: contextual/chip/base[-invert]/fill
   ├─ ⬅️ Icon   placeholder · chip/icon-size (18) · колір …/color/<state>     ← bool ⬅️ Icon (off), swap ↳ 💠 Icon left
   ├─ Content   HORIZONTAL · padding L/R chip/label/padding-horizontal (оптичний відступ тексту, як в оригіналі)
   │   └─ Label  text style text/md · колір …/color/<state>                      ← ✏️ Label
   └─ Icon ➡️   plus · chip/icon-size · колір …/color/<state>                   ← bool Icon ➡️ (on), swap ↳ 💠 Icon right
```
Розміри збігаються з оригіналом: 82×32 (з правою іконкою): 8 + 18 + 2 + (4 + текст + 4) + 2 + 18 + 8.

## Властивості
`State`, `Inverted` (variant) · `⬅️ Icon`, `Icon ➡️` (boolean) · `↳ 💠 Icon left`, `↳ 💠 Icon right` (swap) · `✏️ Label` (text).

## Токени (`mb/component`, `xon/component`)
JSON: `tokens/chip.mb.component.json`, `tokens/chip.xon.component.json` (MB = XON).
Власний радіус: `border-radius.chip` = `{border-radius.core.full}` (старий `border-radius.chips` лишається за оригіналом).

| Токен | Значення | Було в оригіналі |
|---|---|---|
| `chip.height` | 32 | фіксовано 32 |
| `chip.padding-horizontal` | `{spacing.200}` 8 | hardcode 8 |
| `chip.gap` | `{spacing.50}` 2 | hardcode 2 |
| `chip.icon-size` | 18 | hardcode 18 |
| `chip.label.padding-horizontal` | `{spacing.100}` 4 | hardcode 4 |
| `contextual.chip.base.fill` (лише Selected) | `{semantic.border.default.secondary}` ⚠️ | `core.content.a8` |
| `contextual.chip.base.border.default` | `{semantic.border.default.default}` | `core.grey.300` |
| `contextual.chip.base.border.{hover,selected}` | `{semantic.text.default.heading}` ⚠️ | `core.content.a100` |
| `contextual.chip.base.border.disabled` | `{semantic.border.default.disabled}` | — (стану не було) |
| `contextual.chip.base.color.default` | `{semantic.text.default.secondary}` | текст secondary, іконка `icon.default.tertiary` |
| `contextual.chip.base.color.hover` | `{semantic.text.default.primary}` | текст primary, іконка tertiary |
| `contextual.chip.base.color.selected` | `{semantic.text.default.heading}` | текст heading, іконка `core.content.a100` |
| `contextual.chip.base.color.disabled` | `{semantic.text.disabled.primary}` | — |
| `contextual.chip.base-invert.fill` | `{semantic.border.default.secondary}` ⚠️ | — |
| `contextual.chip.base-invert.border.default` | `{semantic.text.default-invert.tertiary}` ⚠️ | — |
| `contextual.chip.base-invert.border.{hover,selected}` | `{semantic.text.default-invert.heading}` ⚠️ | — |
| `contextual.chip.base-invert.border.disabled` | `{semantic.border.default.disabled}` | — |
| `contextual.chip.base-invert.color.{default,hover,selected}` | `{semantic.text.default-invert.{secondary,primary,heading}}` | — |
| `contextual.chip.base-invert.color.disabled` | `{semantic.text.default-invert.tertiary}` ⚠️ | — |

⚠️ — semantic-токен з іншою роллю або без точного відповідника (див. «Відкриті питання»).

## Прив'язка
Токени Token Studio на шарах (plugin data `tokens`) + однойменні змінні колекції `Product` (створені 2026-10-21, scopes задані). Після вставки JSON у Token Studio і Export змінні оновляться за назвою.

## Історія рішень
0. 2026-10-21 — перейменовано `Chips` → `Chip` (однина): набір, Section, токени `chip.*`, `contextual.chip.*`, власний `border-radius.chip`.
1. Точна копія оригіналу: розміри, кількість елементів, обгортка `Content` з оптичним відступом 4 збережені.
2. `State=Active` → `Selected` (чіп — перемикач); додано `Disabled` за DoD.
3. Прибрано порожню властивість `Type=Normal`.
4. Додано `Inverted=True` (правило ДС), токени `base-invert`.
5. Текст і іконка — один токен `color` (правило мінімуму токенів): іконка в Default тепер трохи темніша (a70 замість a50).
6. Нові токени `contextual.chip.base.*` замість `contextual.chips.normal.*` (ті посилались на `core.*` і використовуються оригіналом).
7. Заливки в Default/Hover/Disabled немає (була прозора `core.content.a0`).

## Відкриті питання
- **Немає semantic-токенів** для: легкої заливки вибраного стану (зараз `border.default.secondary`), сильного обведення (зараз `text.default.heading`), світлого обведення на темному фоні (`text.default-invert.tertiary`), disabled на темному фоні (`text.default-invert.tertiary`). Потрібні `semantic.fill.subtle`, `semantic.border.strong`, `semantic.border.default-invert.*`, `semantic.text.disabled-invert.*`?
- `Selected` показує ту саму іконку, що й інші стани (`plus`): swap-властивість спільна для всіх варіантів, іконку для вибраного стану ставлять в інстансі.
- У XON `Inverted=False` і `Inverted=True` однакові (білі) — так за правилом (`semantic.text.default` у XON білий).
- Іконка 18 px — поза сіткою 16/24, збережено як в оригіналі.
- Після приймання: старий набір → `Deprecated/Chips`, токени `contextual.chips.normal.*` і `contextual.achivments.chips.*` — прибрати разом зі старим набором.
