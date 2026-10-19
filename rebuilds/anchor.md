# Anchor — точна копія, правильна збірка

Статус: **готово до запуску, чекає доступу.** Figma MCP підключений акаунтом без Can edit на файл (`read-only mode`).

Принцип: **нічого не додаємо.** Вигляд, розміри, кількість айтемів і кольори — як в оригіналі. Міняємо тільки те, як це зібрано.

## Оригінал (`Anchor`, 67758:49763) → копія

| | Оригінал | Копія |
|---|---|---|
| Структура | COMPONENT з 4 інстансами `Navigation/Item` | `Anchor` + власний під-компонент `Anchor/Item`, 4 інстанси |
| Падінги контейнера 16 | чужа remote-змінна `Mobile breakpoint` | `anchor/padding-horizontal` |
| Відступ між айтемами 8 | hardcode | `anchor/gap` |
| Висота айтема 20 | override висоти чужого компонента (мейн 32) | `anchor/item/height` = 20 |
| Падінги айтема 8 / 12, gap 6 | з `Navigation/Item`, gap hardcode | `anchor/item/padding-left`, `padding-right`, `anchor/item/gap` |
| Радіус айтема | `border-radius/nav-menu/item` | `border-radius/anchor/item` |
| Фон айтема | `contextual/nav-menu/item/fill/default` | `contextual/anchor/item/fill/default` |
| Колір лейблу (білий) | override токеном кнопки `contextual/button/primary/text/default` | `contextual/anchor/item/text/default` |
| Колір іконки | `contextual/menu/item/icon/default` всередині remote-іконки | `contextual/anchor/item/icon/default` |
| Розмір іконки 20 | розмір шару | `anchor/item/icon-size` |
| Типографіка | text style `text/md-strong` | без змін — `text/md-strong` |
| Іконки | remote `menu / *`, `icons / tournaments lottery / *` | Static — Icons (див. нижче) |
| Властивості айтема | `Label` (bool), `💠 Icon` | `Label` (bool), `✏️ Label` (text), `↳ 💠 Icon` (swap) |
| Опис | немає | є в обох компонентах |

## Токени (Token Studio)

Файли: `tokens/anchor.mb.component.json` → сет `mb/component`, `tokens/anchor.xon.component.json` → сет `xon/component`. Значення — аліаси, що дають **той самий** результат, що й зараз в оригіналі.

| Токен | Тип | MB | XON |
|---|---|---|---|
| `anchor.padding-horizontal` | spacing | `{layout.padding-horizontal.xs}` (16) | те саме |
| `anchor.gap` | spacing | `{spacing.200}` (8) | те саме |
| `anchor.item.height` | sizing | `20` | `20` |
| `anchor.item.padding-left` | spacing | `{spacing.200}` (8) | те саме |
| `anchor.item.padding-right` | spacing | `{spacing.300}` (12) | те саме |
| `anchor.item.gap` | spacing | `{spacing.150}` (6) | те саме |
| `anchor.item.icon-size` | sizing | `20` | `20` |
| `border-radius.anchor.item` | borderRadius | `{border-radius.core.full}` | `{border-radius.core.300}` |
| `contextual.anchor.item.fill.default` | color | `{semantic.fill.default}` | те саме |
| `contextual.anchor.item.text.default` | color | `{core.white.500}` | те саме |
| `contextual.anchor.item.icon.default` | color | `{core.grey.200}` | те саме |

Додати: Token Studio → сет `mb/component` → JSON-вкладка → злити вміст файлу з існуючим JSON; те саме для `xon/component`. Потім **Styles & Variables → Export to Figma** (колекція `Product`).

## Іконки (Static — Icons)

| Було | Стало |
|---|---|
| menu / books | `document` |
| menu / slot_mashine | `777` |
| menu / leaderboard | `statistics` |
| icons / tournaments lottery / multiplier | `rocket` — точного відповідника немає, підтвердити або замінити (`flash`, `scale-up`) |

## Запуск
`scripts/anchor-build.js` → `use_figma` у файлі `3MbdWPLOGBjBj92Y3EnPYN`. Створює Section `Anchor (new)` праворуч від оригіналу; оригінал не змінюється.

## Зауваження (не міняємо, лише фіксуємо)
- Білий лейбл на `semantic.fill.default` (MB: прозорий блакитний) — перевірити контраст у темі MB.
- Після приймання: оригінал → `Deprecated/Anchor`, інстанси в лейаутах переключити на новий.
