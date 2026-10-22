# List (маркований/нумерований список) + List/Bullet

Сторінка `↳ List item - Андрей`, Section `List` (78882:291232). Виправлено командою; токени — 2026-10-22.
- `List` (`Centered=False|True`): HORIZONTAL, gap `list.gap`; інстанс `List/Bullet` + текст `text.md`, `semantic.text.default.primary`.
- `List/Bullet` (`Type=Default|Active` × `Text=False|True`): 24×24, висота `list.bullet.size`, lock ratio; Text=False — заливка й радіус.

| Токен | Значення |
|---|---|
| `list.gap` | `{spacing.100}` = 4 |
| `list.bullet.size` | `{size.300}` = 24 |
| `border-radius.list.bullet` | `{border-radius.global.xs}` (новий alias = `{border-radius.core.100}` = 4) |
| `contextual.list.bullet.fill.default` | `{semantic.fill.subtle}` (новий alias = `{core.content.a8}`) |
| `contextual.list.bullet.fill.active` | `{semantic.background.brand.emphasizing.default.primary}` |
Текст цифри: Default — `semantic.text.default.primary`; Active без заливки — `semantic.text.brand.primary`; на заливці — `semantic.text.default-invert.heading`; типографіка `text.xs-strong`.
`contextual.bullet.fill.*` → перейменовано в `contextual.list.bullet.fill.*`.
Правило: компонентні токени посилаються на alias, не на core; якщо в alias немає потрібного — додаємо alias-токен (`semantic.fill.subtle`, `border-radius.global.xs`).
