# Chip

Сторінка `↳ Chip & Tag` (46778:61630) · Section `Chip` (78563:91) · набір `Chip` (78563:90) · статус: зібрано заново 2026-10-21, чекає ревʼю (не Ready for dev). Оригінал — `Chips` (46859:45827), не змінювався.

## Призначення
Інтерактивний перемикач для фільтрів і вибору опцій: клікабельний **весь** чіп, `Selected` = опція увімкнена. Не для дій (це `Button`) і не для показу вже обраного значення (це `Tag`).

## Анатомія
```
Chip (COMPONENT_SET 78563:90)   State = Default | Hover | Selected | Disabled · Inverted = False | True  (8 варіантів)
└─ State=…, Inverted=…   HORIZONTAL · HUG × chip/height (32) · padding L/R chip/padding-horizontal · gap chip/gap
   radius border-radius/chip · stroke 1 INSIDE contextual/chip[-invert]/border/<state>
   fill — лише Selected: contextual/chip[-invert]/fill
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
| `contextual.chip.fill` (лише Selected) | `{semantic.border.default.secondary}` ⚠️ | `core.content.a8` |
| `contextual.chip.border.default` | `{semantic.border.default.default}` | `core.grey.300` |
| `contextual.chip.border.{hover,selected}` | `{semantic.text.default.heading}` ⚠️ | `core.content.a100` |
| `contextual.chip.border.disabled` | `{semantic.border.default.disabled}` | — (стану не було) |
| `contextual.chip.color.default` | `{semantic.text.default.secondary}` | текст secondary, іконка `icon.default.tertiary` |
| `contextual.chip.color.hover` | `{semantic.text.default.primary}` | текст primary, іконка tertiary |
| `contextual.chip.color.selected` | `{semantic.text.default.heading}` | текст heading, іконка `core.content.a100` |
| `contextual.chip.color.disabled` | `{semantic.text.disabled.primary}` | — |
| `contextual.chip-invert.fill` | `{semantic.border.default.secondary}` ⚠️ | — |
| `contextual.chip-invert.border.default` | `{semantic.text.default-invert.tertiary}` ⚠️ | — |
| `contextual.chip-invert.border.{hover,selected}` | `{semantic.text.default-invert.heading}` ⚠️ | — |
| `contextual.chip-invert.border.disabled` | `{semantic.border.default.disabled}` | — |
| `contextual.chip-invert.color.{default,hover,selected}` | `{semantic.text.default-invert.{secondary,primary,heading}}` | — |
| `contextual.chip-invert.color.disabled` | `{semantic.text.default-invert.tertiary}` ⚠️ | — |

⚠️ — semantic-токен з іншою роллю або без точного відповідника (див. «Відкриті питання»).

## Прив'язка
Токени Token Studio на шарах (plugin data `tokens`) + однойменні змінні колекції `Product` (створені 2026-10-21, scopes задані). Після вставки JSON у Token Studio і Export змінні оновляться за назвою.

## Історія рішень
0. 2026-10-21 — перейменовано `Chips` → `Chip` (однина): набір, Section, токени `chip.*`, `contextual.chip.*`, власний `border-radius.chip`.
1. Точна копія оригіналу: розміри, кількість елементів, обгортка `Content` з оптичним відступом 4 збережені.
2. `State=Active` → `Selected` (чіп — перемикач); додано `Disabled` за DoD.
3. Прибрано порожню властивість `Type=Normal`.
4. Додано `Inverted=True` (правило ДС), токени `contextual.chip-invert.*`.
5. Текст і іконка — один токен `color` (правило мінімуму токенів): іконка в Default тепер трохи темніша (a70 замість a50).
6. Нові токени замість `contextual.chips.normal.*` (ті посилались на `core.*`).
8. 2026-10-21 — група `base` прибрана: кольори прямо в `contextual.chip.*`, інвертовані — `contextual.chip-invert.*`. Стара група `contextual.chips.normal.*` **видалена** з Token Studio (сети `mb/component`, `xon/component`) і змінні `contextual/chips/normal/*` — з Figma. Перед видаленням перевірено весь файл: ці змінні використовував лише старий набір `Chips` (46859:45827) і його інстанси.
7. Заливки в Default/Hover/Disabled немає (була прозора `core.content.a0`).

## Відкриті питання
- **Немає semantic-токенів** для: легкої заливки вибраного стану (зараз `border.default.secondary`), сильного обведення (зараз `text.default.heading`), світлого обведення на темному фоні (`text.default-invert.tertiary`), disabled на темному фоні (`text.default-invert.tertiary`). Потрібні `semantic.fill.subtle`, `semantic.border.strong`, `semantic.border.default-invert.*`, `semantic.text.disabled-invert.*`?
- `Selected` показує ту саму іконку, що й інші стани (`plus`): swap-властивість спільна для всіх варіантів, іконку для вибраного стану ставлять в інстансі.
- У XON `Inverted=False` і `Inverted=True` однакові (білі) — так за правилом (`semantic.text.default` у XON білий).
- Іконка 18 px — поза сіткою 16/24, збережено як в оригіналі.
- **Старий `Chips` (46859:45827) тепер з обірваними прив'язками** (змінні `normal` видалено, кольори кешовані). Його інстанси: 62 прямих — Profile + (22), Cashbox (11), Achievements + (8), Filter & Sorting (6), Shop + (6), Loyalty (5), Providers + (4), плюс вкладені (Calendar +). Перевести на `Chip` (`Active` → `Selected`, `Inverted=False`), старий набір → `Deprecated/Chips`.
- **`border-radius.chips` лишається:** його бере осиротілий компонент `Chips/Default/Static` (мейн 47170:150684 видалено з канвасу, 126 інстансів: Lootboxes +, Races +, All Cards, Calendar +, Shop +, Tournaments +). Видаляти токен після заміни цих інстансів.
- `contextual.achivments.chips.*` — токени Achievements, до `Chip` не належать.
