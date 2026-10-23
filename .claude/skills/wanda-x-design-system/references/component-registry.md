# Реєстр компонентів — що вивчено і коли

Оновлювати при кожному циклі `learning-workflow.md`. Статуси — там само.
Дайджест знімка — `snapshots/<component>.json`, опис — `references/components/<component>.md`.
Стартовий стан і дефекти кожної сторінки — `audit-2026-10-19.md` (+ розділ «Зміни після аудиту»).

**Позначки в назвах сторінок** (з 2026-10-21): `💛` — сторінку оновила команда *(так читаємо, чекає підтвердження)*; `- Андрей` / `- Ден` — хто веде сторінку. Сторінки з 💛 — першочергові для вивчення.

Останній обхід файлу: **2026-10-21** (точкові оновлення 2026-10-22 — `working-agreements.md` §7) (42 сторінки ДС, read-only). Токени — експорт від 2026-10-21 у `tokens/system/`.

## Components

| Компонент | Сторінка | Статус | Вивчено | Set ID | Варіантів | Опис |
|---|---|---|---|---|---|---|
| Anchor | `↳ Anchor 💛` | Rebuilt — review | 2026-10-21 | 78336:307494 (`Anchor/Item`), 78314:307677 | 2 + 1 | `components/anchor.md` |
| Banner | `↳ Banner - Ден` | In progress (team) | — | новий `Banner` 78285:719 (13 props, Device) + `Banner/Content-block`, `Slider`; legacy поруч | 2 | — |
| Chip & Tag | `↳ Chip & Tag - Андрей` | Chip оновлено + Inverted; Tag — in progress | 2026-10-21 | 46859:45827 (`Chips`), 78589:294536 (`Tag`, новий) | 6 + 3 | `components/chip-tag.md` |
| Datepicker | `↳ Datepicker - Андрей` | Виправлена копія поруч (на перевірці) | 2026-10-22 | 78766:265 (копія), 27893:322641 (оригінал) | 2 + 12 + 5 | `components/datepicker.md` |
| Empty | `↳ Empty - Ден 💛` | Learned | 2026-10-21 | 78315:449009 | 4 | `components/empty.md` |
| Filter & Sorting | `↳ Filter & Sorting - Андрей` | Впорядкована копія поруч (на перевірці) | 2026-10-22 | 78821:132 (Tabs & Sort), 78821:89 (Filter button) | 2 + 6 | `components/filter-sorting.md` |
| Input | `↳ Input 💛` | Learned | 2026-10-21 | 78201:1158 + `Input Side Left/Right` | 12 + 5 + 5 | `components/input.md` |
| Controls (Checkbox, Radio, Toggle) | `↳ Controls … 💛` | Learned | 2026-10-21 | 78315:499124 / 499199 / 499274 | 8 + 6 + 6 | `components/controls.md` |
| List + List/Bullet | `↳ List item - Андрей`, Section `List` | Виправлено командою + токени | 2026-10-22 | 47820:58472, 30276:434400 | 2 + 4 | `components/list-bullet.md` |
| Profile-menu (+ /Item, /Subitem) | `↳ List item - Андрей`, Section `Profile-menu` | Нова збірка, макети перенесено, токени | 2026-10-22 | 78892:291573, 78859:389, 78859:340 | 1 + 6 + 4 | `components/list.md` |
| Gamehall / Open-thumb-provider | `Gamehall` | 1 варіант (Progress=Off) + токени | 2026-10-22 | 41123:11531 | 1 | `components/filter-sorting.md` |
| Table | `↳ Table -` | Rebuild: stage 2/3 (grid, leaderboard) 2026-10-23 | | `components/table.md` | | |
| Notifications, Cookies, Toast | `↳ Notifications, Cookies, Toast` | Not started | | `Toast` 47040:2552 | 8 | |
| Pagination & Scroll | `↳ Pagination & Scroll` | Not started | | `scrollbar` 28787:64507 | 6 | |
| Popup | `↳ Popup -` | Changed | | нові `Popup mob` 77814:6477, `Popup web` 77818:294521 у Section `Popup` | 2 + 5 | |
| Section | `↳ Section 💛` | Learned | 2026-10-21 | 78117:335001 | 2 | `components/section.md` |
| Status | `↳ Status 💛` | Learned | 2026-10-21 | 47052:2374 (`Status/Badge`), 78152:197 (`Status/Indicator`) | 28 + 14 | `components/status.md` |
| Switcher | `↳ Switcher -` | Changed | | нові `Switcher-item` 46861:61667, `Switcher` 46861:61677 у Section `Switcher` | 3 + 6 | |
| Timer | `↳ Timer 💛` | Learned | 2026-10-21 | 77857:445144 | 16 | `components/timer.md` |

Сторінок `Breadcrumbs`, `Fader`, `Forms` більше немає (Forms → `Input` + `Controls`).

## Atoms

| Компонент | Статус | Вивчено | Set ID | Варіантів | Опис |
|---|---|---|---|---|---|
| Accordion | Ready for dev | — | 33405:879002 | 12 | `reference-components.md` |
| Badge | Ready for dev | — | 46851:515 | 9 | `reference-components.md` |
| Button | Ready for dev | — | 27590:27154 | 120 | `reference-components.md` — **`Button/Link` перейменовано в `Button/Text`**, `Tertiary-Invert` → `Tertiary [Invert]` |
| Link | Ready for dev | — | 29703:172586 | 21 | `reference-components.md` |
| Divider | Ready for dev | — | 78008:324202 | 2 | `reference-components.md` |
| Dropdown | Ready for dev | — | 77861:28799 + `Dropdown/Item` 46786:80283 | 8 + 3 | `reference-components.md` |
| Label | Ready for dev | — | 46854:7959 | 24 | `reference-components.md` |
| Loader → **Spinner** | Ready for dev | — | 47531:173652 (сторінка `↳ Spinner`) | 1 | `reference-components.md` |
| Image | Changed | | `Image/Single` 77815:182, `Image/Multi` 77815:189 (слоти; переїхало в Atoms) | 2 + 2 | |
| Navigator | Changed | | 78112:227231 (один компонент у Section) | 1 | |
| Progress | Changed | | новий `Progress/Circle` 46694:445445 у Section; legacy поруч | 2 | |
| Tooltip | Changed | | 27803:186739 (Trigger/Layout slots, Show, Arrow, Position ×8 — як Dropdown) | 8 | |
| Popover | Changed | | 77787:316988 (структура як Tooltip) | 8 | |

## Molecules

| Компонент | Статус | Вивчено | Set ID | Варіантів | Опис |
|---|---|---|---|---|---|
| Heading (колишній Section-title) | In progress (team) | | 67251:370203 | 4 | на канвасі скриншоти 20–21.10 — працюють |
| Navigation | Not started | | `Navigation` 67415:182038 (Breakpoint 3xs\|sm\|lg), `Navigation/Item` 67330:88046 | 3 + 3 | |
| Tabs | Not started | | `Tabs` 77999:315447, `Tabs/Item — Default`, `— Navigation` | 2 + 8 + 8 | |
| Thumb (переїхав з Components) | Not started | | 46535:3315 | 6 | |
| Quick pay | Not started | | 28031:69022 | 5 | |

## Organisms

| Компонент | Статус | Вивчено | Set ID | Варіантів | Опис |
|---|---|---|---|---|---|
| Header | Changed | | нові `Header/3xs`, `/xl`, `/2xl`, `/2xs` (Authorized), `Header/Navigation item` | | |
| Balance details | Not started | | 49367:47288 | 1 | |
| Sidebar | Not started | | `Sidebar/Desktop`, `/Mobile`, `/Item` … | | |
| Account | Changed | | `Account` 78065:174908, `Account/Balance`, `/Notification`, `/Loyalty program` | | |
| Footer | Changed | | `Footer/3xs`…`/xl`, `Footer/App banner`, `Footer/Help banner`; токени `contextual.footer.*` | | |
| TabBar | Changed | | `TabBar` 46941:882007 (Breakpoint lg\|sm\|xs\|3xs), `TabBar/Item` | 4 + 6 | |
| Layout (колишній Page) | Changed | | `Layout/3xs` … `Layout/3xl` (9 компонентів) | 9 | |

## Інше
| Сторінка | Що там |
|---|---|
| `All Cards 💛` | 12 наборів карток (`Card / Bonus`, `Card / Lottery-tournament`, `Card / Winning-now` …) — продуктові (правило 11); чужі змінні `Radius/0`, `card/winning-now` |
| `Data refinement 💛 💜` | продуктовий лейаут |
