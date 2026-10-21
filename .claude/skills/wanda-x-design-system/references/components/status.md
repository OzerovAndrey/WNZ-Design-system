# Status

Сторінка `↳ Status 💛` · Section `Statuses` (78047:94426, `#808080`) · набори `Status/Badge` (47052:2374), `Status/Indicator` (78152:197) · статус: Learned

## Призначення і характер
Позначка стану сутності (платіж, верифікація, ставка, бонус). Два вигляди однієї системи: `Badge` — капсула з фоном, `Indicator` — без фону (точка/іконка + текст). Сім статусів спільні.
- **Роль і місце:** таблиці транзакцій, історія, профіль, картки бонусів.
- **Поведінка:** колір задає `Status`; `Variant=Subtle` — прозорий фон статусу (`bg.secondary`, ~20%) + кольоровий текст і точка; `Solid` — насичений фон (`bg.primary`) + білий текст і точка (`semantic.status.default.text.primary`).
- **Inverted:** немає (`Status=Default` у Subtle має білий текст — розрахований на темний фон *(спостереження)*).
- **MB vs XON:** однакові (`core.validation.*`).
- **Масштаб:** `SM` 24 px / `MD` 32 px (Badge); Indicator — HUG 20 px; іконка 16 / 20; точка 8.
- **Композиція:** `Indicator` (точка) + іконка `plus` (swap) + `Time title` (лейбл) — усе вмикається Boolean-ами.

## Анатомія
```
Status/Badge (COMPONENT_SET)   Variant × Size × Status
└─ Variant  HORIZONTAL · HUG × FIXED · radius border-radius.statuses (full)
    │       fill semantic.status.<status>.bg.{secondary|primary} · min-height / gap / padding X — див. токени
    ├─ Indicator   ELLIPSE 8 · status.indicator-size · fill …text.primary         ← Indicator
    ├─ plus        INSTANCE (remote) · status.icon-size.{xs|sm}                    ← Icon, ↳ 💠 Icon
    └─ Time title  text/md-strong · semantic.status.<status>.text.primary (Solid → default.text.primary)  ← ✏️ Label

Status/Indicator — та сама анатомія без фону; gap status.gap.{xs|sm}; у MD лейбл FILL.
```

## Властивості
| Властивість | Тип | Значення |
|---|---|---|
| `Variant` (лише Badge) | Variant | Subtle \| Solid |
| `Size` | Variant | SM \| MD |
| `Status` | Variant | Default \| Success \| Warning \| Error \| Info \| Declined \| Pending |
| `Icon` + `↳ 💠 Icon` | Boolean + swap | true / `plus` |
| `Indicator` | Boolean | true |
| `✏️ Label` | Text | Status |

## Токени
| Токен | Size | MB = XON |
|---|---|---|
| `status.sm.height` / `status.sm.gap` / `status.sm.padding-horizontal` | Badge **SM** | **немає в експорті** |
| `status.size.sm` / `status.gap.sm` / `status.padding-horizontal.sm` | Badge MD | 32 / `{spacing.150}` / `{spacing.300}` |
| `status.size.xs` / `status.gap.xs` / `status.padding-horizontal.xs` | — (є в експорті, не прив'язані до Badge SM) | 24 / `{spacing.100}` / `{spacing.300}` |
| `status.gap.xs` / `status.gap.sm` | Indicator SM / MD | `{spacing.100}` / `{spacing.150}` |
| `status.icon-size.xs` / `.sm` | SM / MD | 16 / 20 |
| `status.indicator-size` | усі | 8 |
| `border-radius.statuses` | усі | `{border-radius.core.full}` |
| `semantic.status.<status>.bg.primary` / `.bg.secondary` / `.text.primary` | кольори | напр. success: `{core.validation.success.600}` / `.a20` / `.500` |

## Рішення (історія)
1. 2026-10-21 — (команда) `Status/Badge` 28v і `Status/Indicator` 14v у Section `Statuses` — нова основа замість 10 наборів з аудиту.

## Відхилення від правил
- **Badge `Size=SM` прив'язаний до неіснуючих токенів** `status.sm.height`, `status.sm.gap`, `status.sm.padding-horizontal` — у Token Studio їх немає (є `status.*.xs`). Значення в Figma тримаються лише на старих числах.
- Шкала розмірів зсунута: `Size=MD` бере `status.*.sm`; значення `SM | MD` uppercase (в еталонах `lg | md | sm`).
- Кольори напряму з `semantic.status.*`, без власних `contextual.status.*` (правило 6).
- `Status/Indicator` має `description` (93 симв.) — правило 14.
- Назва шару лейбла `Time title` — залишок від Timer.
- Section `Statuses` — множина (правило «назви в однині»); legacy-набори (`Status/Indicator (deprecated)`, `status achivments card`, `wins status`, `Status payment history`, `Status icon`, `Profile statuses`, `Status`, `type bet Statuses`), `Slice 1` і загублені інстанси лишаються на канвасі.
- Немає `Inverted`.

## Відкриті питання
- SM: перепривʼязати на `status.*.xs` чи створити `status.sm.*`? (як назвати шкалу — xs/sm чи sm/md)
- Legacy-набори: мапінг на `Status/Badge` / `Status/Indicator` і видалення — коли?

## Мета знімка
| | |
|---|---|
| Знімок (дайджест) | `snapshots/status.json` |
| Вивчено | 2026-10-21 |
| Експорт токенів | 2026-10-21 |
| Варіантів | 28 + 14 |
