# Profile Menu (сторінка `↳ List item - Андрей`)

Оптимізована копія — Section `Profile Menu` (node `78859:297190`), поруч зі старими наборами. Зроблено 2026-10-22 на запит Андрея.

## Було → стало
| Старе | Варіантів | Використання | Рішення |
|---|---|---|---|
| `List` (Device) | 2 | Profile sidebar, Profile popup mobile | → `Profile Menu` (Device × SLOT `Items`) |
| `List item profile [new]` (Active × Open, Chevron, Tag) | 4 | List, Payment (New), anchors | → `Profile Menu/Item` (те саме, сабайтеми через SLOT замість 4 вшитих) |
| `List subitem profile (Cashbox)` (state, Badge) | 2 | [new], Profile sidebar | → `Profile Menu/Subitem` |
| `List item profile` (state × complicated × open × device) | 8 | **0** | видалити |
| `List item profile (Cashbox)` | 10 (один варіант-дубль) | Profile sidebar Old (9), Payment Old (3) | Deprecated — старий «помаранчевий» стиль, замінений [new] |
| `Payment llist items (Cashbox)` (Old/New) | 2 | Payment sidebar (1, Old) | видалити — це `Profile Menu` Desktop з 3 пунктами |
Разом: 28 варіантів у 6 наборах → 8 варіантів у 3 наборах.

## Анатомія
- **Profile Menu** — `Device=Desktop|Mobile`; VERTICAL, ширина 235, SLOT `Items` (спільна властивість, preferred `Profile Menu/Item`), gap Desktop 0 / Mobile 4.
- **Profile Menu/Item** — `Active=False|True` × `Open=False|True`, boolean `Chevron` (true), `Tag` (false, інстанс `Profile statuses`). Root VERTICAL p12 g4 r12, ширина 249; `Header` (Icon 24 lock, Label FILL, Tag, Chevron 24); Open=True — SLOT `Items` (gap 4, preferred `Profile Menu/Subitem`).
  - Кольори: icon — tertiary (False/False) / primary; label — primary (F/F), heading (Active), secondary (F/Open); chevron — `semantic.icon.default.secondary`.
  - Заливка Active або Open: 101,109,143 @15% (було на видаленій змінній, токена немає).
- **Profile Menu/Subitem** — `State=Default|Active`, boolean `Badge`; HORIZONTAL p8/44/8/32 g8, висота 32; текст `text.sm-strong` secondary / `text.sm-stronger` heading.

Прибрано: скриті `Button`, `Toggle`, `+380`, `BR / Withdraw`, стрілки (жоден інстанс їх не вмикав), невидимий drop shadow, нульові stroke. Іконки мейнів — Static (`wallet`, `chevron-right`); у дефолтному вмісті слота лишились оригінальні іконки пунктів (remote) — під заміну.

## Токени, яких бракує (ще не створені)
| Токен | Значення |
|---|---|
| `profile-menu.item.padding-h` / `padding-v` | `{spacing.300}` = 12 |
| `profile-menu.item.gap` (header) | `{spacing.200}` = 8 |
| `profile-menu.item.open-gap` (root і слот) | `{spacing.100}` = 4 |
| `profile-menu.item.icon-size` | `{size.300}` = 24 |
| `border-radius.profile-menu.item` | 12 |
| `contextual.profile-menu.item.fill.active` | ? (101,109,143@15; кандидат `semantic.fill.active`) |
| `profile-menu.subitem.padding-v` | `{spacing.200}` = 8 |
| `profile-menu.subitem.padding-left` | `{spacing.800}` = 32 |
| `profile-menu.subitem.gap` | `{spacing.200}` = 8 |
| `profile-menu.gap` (Mobile) | `{spacing.100}` = 4 |

## Inverted
Payment sidebar (Cashbox s2p) — темно-синій фон, пункти зараз нечитабельні → Inverted потрібен для `Item`/`Subitem`, якщо Payment переходить на Profile Menu. Profile sidebar / popup — світлі, не потрібен.

## Міграція (2026-10-22, на запит Андрея)
Перевірено всі інстанси 6 старих наборів по файлу (`getInstancesAsync`, з вкладеністю). Живі використання замінено на Profile Menu з тими самими текстами, іконками, станами й видимістю:
| Де | Було | Стало |
|---|---|---|
| `Profile +` → `Profile sidebar / Type=New` | `List` Desktop (6 пунктів) + Logout (`List item profile (Cashbox)`) | `Profile Menu` Desktop + `Profile Menu/Item` (Chevron off) |
| `Profile +` → `Profile popup content mobile / tab=balances` | `List` Mobile (6) | `Profile Menu` Mobile |
| `Cashbox (s2p), Payment block` → `Payment sidebar` | `Payment llist items / Old` (Payment history — Active, помаранчевий) | `Profile Menu` Desktop, Payment history — Active (сіра заливка) |
| `[???]` → `anchors` | прихований `[new]` | прихований `Profile Menu/Item` |
| `Profile +` (загублений на канвасі) | `List subitem profile (Cashbox)` | `Profile Menu/Subitem` |

Не чіпали: `Profile sidebar / Type=Old` (0 інстансів) — досі на Cashbox-пунктах. Payment popup має зламаний темний фон (`slate-1` на всьому макеті) — окрема задача.

Оригінали **не видалені** — Section `Originals — Profile list (не використовувати)` на тій же сторінці. Порядок сторінки: `List-item` → `Profile Menu` → `Originals`.

## List-item (виправлено командою)
Section `List-item`: `List-item` (основний) і `List-item/Bullet` під ним — еталон, оформлено за `section-layout.md`.
