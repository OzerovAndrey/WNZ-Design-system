# Filter & Sorting — вивчено + впорядкована копія (2026-10-22)

Сторінка `↳ Filter & Sorting - Андрей` · оригінали зліва (не чіпали) · **нова Section `Filter & Sorting` (78821:88)** праворуч, x 1400 · статус: на перевірці командою.

## Де використовується
| Компонент | Інстансів | Де | Фон |
|---|---|---|---|
| `Filter-button` | 12 (11 × Icon Default, 1 × Text Default) | Gamehall, Shop, Ingame, Heading (💛), Tabs & Sort | фон сторінки / Heading — темного контексту немає |
| `Tabs & Sort` | 6 (3 Desktop, 3 Mobile) | Calendar, Shop, 1 поза сторінками | фон сторінки |
| `Gamehall / Open-thumb-provider` | 3 | тільки Gamehall | фон сторінки |

**Inverted:** жоден інстанс не стоїть на темній/кольоровій плашці (у XON темність дає бренд, не Inverted) → зараз не потрібен; додавати разом з рішенням по open-questions #3.

## Копія (Section зверху вниз — основний перший)
```
Section Filter & Sorting (#BBBBBB, 80 px)
├─ Tabs & Sort   (78821:132)  Breakpoint = Desktop | Mobile
│    Desktop: Chips (6× Chip) · Filter button (прихований, як в оригіналі)
│    Mobile:  Filter button Text · Filter button Icon (opacity 0 — як в оригіналі)
└─ Filter button (78821:89)   State = Default | Hover | Active × Type = Icon | Text · 💠 Icon (swap)
     Icon / Label → Chevron
```
Зміни відносно оригіналу:
- `Filter-button` → `Filter button`; варіанти `Icon=True|False` + `Text=True|False` (взаємовиключні) → одна властивість `Type = Icon | Text`.
- Прибрано 6 прихованих інстансів `sort` без властивості (сміття).
- Swap `Icon` → `💠 Icon`; шари `filter-2` → `Icon`, `Все` → `Label`, `chevron-*` → `Chevron`.
- `Tabs & Sort`: `State = Mobile | Desktop` → `Breakpoint = Desktop | Mobile`; вкладені Filter-button → нова копія (видимість/opacity збережено).
- Сітка варіантів 16 px; прив'язки й значення — як в оригіналі (токенів не створювали).
- Іконки `filter-2`, `sort`, `chevron-down/up` — зі Static — Icons ✓.

## Токени
**Є (Token Studio + Product):**
| Токен | Значення | Де |
|---|---|---|
| `contextual.filter-sort.item.fill.default` | `{semantic.fill.default}` | фон Default |
| `contextual.filter-sort.item.fill.hover` | `{core.grey.300}` ⚠ core | фон Hover |
| `contextual.filter-sort.item.fill.active` | `{core.grey.200a40}` ⚠ core | фон Active |
| `border-radius.filter&sort.button` | `{border-radius.core.full}` ⚠ `&` у назві, інший неймспейс ніж `filter-sort` | радіус |
| тексти | `semantic.text.default.primary` / `.heading` напряму (правило 6) | Label |

**Треба створити (зараз hardcode):**
| Пропозиція | Значення | Де |
|---|---|---|
| `filter-sort.height` | 32 → `{size.400}` | корінь Filter button |
| `filter-sort.padding-vertical` | 4 → `{spacing.100}` | |
| `filter-sort.padding-left.icon` / `.text` | 8 / 12 | Type=Icon / Text |
| `filter-sort.padding-right` | 8 (Default) / 4 (Hover, Active) ⚠ розбіжність — ширина «стрибає» при hover | |
| `filter-sort.gap` | 2 → `{spacing.50}` | |
| `filter-sort.icon-size` | 20 | Icon |
| `filter-sort.chevron-size` | 16 → `{size.200}` | Chevron |
| `tabs-sort.padding-horizontal` | 32 → `{spacing.800}` | Tabs & Sort |
| `tabs-sort.chips.gap` | 8 → `{spacing.200}` | Chips |

**Зламані прив'язки (видалені змінні, назва жива):** `Tabs & Sort` maxWidth → `max-width/content`; overrides у вкладених Chip → `chips/gap`, `chips/padding-h`, `chips/height`, `contextual/chips/normal/*/default`. У Token Studio немає `chips.gap`, `chips.padding-h`, `chips.height`, `chips.icon.size` (змінні є) — стосується самого Chip.

## Відхилення / питання
- Padding-right 8 vs 4 між станами (Default vs Hover/Active).
- `Tabs & Sort` Desktop: прихований Filter button без властивості; Mobile: друга кнопка opacity 0 з іконкою `BR / Filter` (чужа бібліотека) — фактично невидима.
- Mobile gap 58 при SPACE_BETWEEN — значення ні на що не впливає.
- `Gamehall / Open-thumb-provider` — продуктовий (тільки Gamehall) → Patterns; не копіювався. Дефекти: шар `Prowider wrap` (опечатка), текст `7Mojos` без стилю, `Frame 1321316241`, лого провайдера з чужої бібліотеки.

## Токени Filter button (2026-10-22, у гілці Token Studio `filter-button-tabs-sort`)
- `contextual.filter-sort.item.fill.hover` → `{semantic.fill.hover}` (було `core.grey.300`), `.active` → `{semantic.fill.active}` (було `core.grey.200a40`); новий alias `semantic.fill.active` = `{core.grey.200a40}`.
- Текст, іконка, шеврон — глобальні `semantic.text.*` / `semantic.icon.*` напряму (правило).
- `filter-sort.{height (size.400), padding-v (spacing.100), padding-h (spacing.200 — 8 з обох боків у всіх варіантах, Label раніше мав зліва 12), gap (spacing.50), icon-size (20), chevron-size (size.200)}` — прив'язано на копії `Filter sort` (78821:89) разом зі змінними Product.

## Tabs & Sort — слот (2026-10-22)
- Команда: `Breakpoint` → `Mobile = False | True`, `Filter button` → `Filter sort`.
- Вміст обох варіантів — **один спільний слот `Items`** (preferred: `Chips`, `Filter sort`), auto layout H, gap 8, HUG; у Mobile — FILL + SPACE_BETWEEN.
- Прибрано рамку `Chips` (її замінив слот) і прихований `Filter button` без властивості в Desktop — потрібний фільтр тепер кладеться у слот.
- Override-и вкладених Chip/Filter sort скинуто (були прив'язки на видалені змінні), тексти/видимість збережено. Наслідок: друга кнопка в Mobile (Filter sort Icon) більше не opacity 0 — видима.
- `maxWidth` → жива `max-width/content`.
- Токени (2026-10-22): `tabs-sort.padding-h` = `{spacing.800}` (32, обидва варіанти) на корені, `tabs-sort.gap` = `{spacing.200}` на слоті `Items`. Команда прибрала maxWidth, ширина — HUG/FIXED.
- Питання: після слота варіанти відрізняються лише вирівнюванням (MIN vs SPACE_BETWEEN) — чи потрібен `Mobile` взагалі?
