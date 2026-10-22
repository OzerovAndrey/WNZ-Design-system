# List (раніше Profile Menu; сторінка `↳ List item - Андрей`)

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

## Inverted (2026-10-22, на запит Андрея)
Темні контексти: `Payment sidebar` (`semantic.background.slate-1` — темний в обох брендах) і `Profile popup mobile` → `Content container` (темний фон на видаленій змінній).
- `Profile Menu/Item`: `Active × Open × Inverted` = 8 варіантів; `Profile Menu/Subitem`: `State × Inverted` = 4. `Profile Menu` сам кольорів не має — Inverted не потрібен (пункти в слоті перемикаються в інстансі).
- Кольори Inverted: текст `semantic.text.default-invert.heading|primary|secondary`; іконки й шеврон — теж `semantic.text.default-invert.*` (групи `semantic.icon.*-invert` немає); заливка Active/Open — **white @10% числом** (токена немає → потрібен `contextual.profile-menu.item.fill.active-inverted` або `semantic.fill.*-invert`).
- Перемкнуто на Inverted: Payment sidebar (3 пункти, Chevron off) і Profile popup content mobile / tab=balances (6 пунктів).
- У XON `semantic.text.default.*` і так білий — Inverted і звичайний там збігаються за текстом.

## Стандартизація (2026-10-22, на запит Андрея)
- `Profile Menu` — **один компонент** без `Device`: VERTICAL, ширина 235, SLOT `Items` (preferred `Profile Menu/Item`), gap 0; дефолт — 3 пункти. Відступ між пунктами в мобільному попапі — override gap слота (4) в інстансі.
- Дефолтний вміст: усі тексти `Label`, іконка `plus` (Static — Icons); у розкритих Item — 3 Subitem `Label`.
- Живі інстанси (Profile sidebar, Payment sidebar, Profile popup content mobile) перенесено з усіма текстами/іконками/станами; старий набір `Profile Menu (Device)` видалено (це була наша проміжна збірка, не оригінал).
- Урок: якщо текст інстансу дорівнює дефолтному тексту мейна, override немає — зміна дефолту його перепише (так злетів `Balances`, відновлено). Перед зміною дефолтів — фіксувати тексти в інстансах.

## State замість Active × Open (2026-10-22, рішення Андрея)
«Не активний пункт не може бути відкритим»: `Profile Menu/Item` = `State = Default | Active | Open` × `Inverted` = 6 варіантів (+ boolean `Chevron`, `Tag`, SLOT `Items`). `Open` = активний і розкритий (заголовок як Active + слот підпунктів). Варіанти `Active=False, Open=True` видалено (0 інстансів), інші перейменовано без втрати інстансів.
Виправлено: у клонованих Inverted-варіантах злетіли componentPropertyReferences (`Chevron`, `Tag` — шар `Tag` зник); відновлено на всіх варіантах. Урок: після `clone()` варіанта перевіряти посилання на властивості.

## Перейменування (2026-10-22, Андрей)
`Profile Menu` → **`List`**, `Profile Menu/Item` → **`List/Item`**, `Profile Menu/Subitem` → **`List/Subitem`**; Section → `List`. `List/Subitem` лишається — це вміст слота `Items` у `List/Item` (State=Open): активний підпункт, Badge, довільна кількість.
Увага: в Section `Originals` теж є старий набір `List` (60349:55717) — однакова назва в Assets.
Токени, запропоновані як `profile-menu.*`, тепер мають бути `list.*` / `list.item.*` / `list.subitem.*`.

## Токени (2026-10-22) — компоненти тепер `Profile-menu`, `Profile-menu/Item`, `Profile-menu/Subitem`
Alias +1: `semantic.fill.subtle-invert` = `{core.white.500}` alpha 0.1 (MB, XON).
Component: `profile-menu.item.padding-h|padding-v` {spacing.300}, `.gap` {spacing.100} (root + слот), `.content-gap` {spacing.200} (Header), `.icon-size` {size.300} (Icon, Chevron — висота + lock), `border-radius.profile-menu.item` {border-radius.global.md}, `contextual.profile-menu.item.fill.active` {semantic.fill.subtle}, `contextual.profile-menu.item.inverted.fill.active` {semantic.fill.subtle-invert}; `profile-menu.subitem.padding-v` {spacing.200}, `.padding-left` {spacing.800}, `.padding-right` {spacing.300} (було 44), `.gap` {spacing.200}. Прив'язано на всіх 6 + 4 варіантах.
Зміни вигляду: Active/Open MB — 101,109,143@15 → `semantic.fill.subtle` (content a8); Subitem padding-right 44 → 12.
Увага: Export з бренчі без цих токенів видаляє створені вручну змінні (так злетіли List-змінні — відновлено й перепривʼязано за TS-посиланнями).

## Profile-menu/Item — без Header, висота сайзом (2026-10-22, Андрей)
- Default/Active: обгортку `Header` прибрано — Icon, Label, Tag, Chevron прямо в корені (HORIZONTAL, counter center). Корінь: `height` = `profile-menu.item.height` ({size.600} = 48), `padding-h`, gap = `content-gap`. Вертикальні падінги й `item.gap` прибрано (токени видалено).
- Open: корінь VERTICAL без падінгів; рядок `Header` лишається (без нього шапку й слот не скласти), він має height 48 + padding-h + content-gap; слот: gap 0, padding-left = `padding-h` (текст підпунктів на 12+32 = 44, як у Label). Висота Open 144.
- Subitem: лише `padding-left` {spacing.800} і `height` {size.400} = 32; інші падінги 0; текст FILL + обрізання.
- **Правило:** висоту рядкових компонентів задаємо токеном розміру (height), не вертикальними падінгами.
- Перенос шарів з Header змінює шлях → override-и інстансів (тексти, іконки) злітають; перед зміною — записати override-и і повернути (зроблено для 16 пунктів у макетах).
