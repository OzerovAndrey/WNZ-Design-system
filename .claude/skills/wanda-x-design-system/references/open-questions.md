# Відкриті питання до команди

Збираються під час вивчення (`learning-workflow.md`). Коли команда відповіла — відповідь переноситься в правило (`SKILL.md` / `references/*.md`) або в «Рішення» компонента, а рядок звідси прибирається.

## Конвенції, що повторюються на оновлених (💛) сторінках — нове рішення чи відхилення?

| # | Що бачимо | Де | Суперечить | Питання |
|---|---|---|---|---|
| 1 | Section сірі **`#808080`** | Input, Controls, Empty, Status, Popup, Switcher, Banner | правило 12 (`#BBBBBB`, як Anchor і еталони) | `#808080` — новий стандарт для всіх Section? Оновити правило? |
| 2 | Позначка **💛** і суфікс автора (`- Андрей`, `- Ден`) у назвах сторінок | 9 сторінок | — | 💛 = «оновлено, перевірити»? Чи = «готово до Ready for dev»? |
| 3 | **Немає `Inverted`** | Input, Controls, Status, Empty, Section (Timer — `Invert=false\|true`) | правило 15 | Inverted обов'язковий для всіх, чи лише для компонентів, що стоять на темному фоні? |
| 4 | **`description` заповнений** | Input (362), Status/Indicator (93), Banner (466) | правило 14 | Команда тепер документує у Figma? Тоді правило 14 змінюємо або дублюємо в скіл. |
| 5 | Шкала **breakpoint `3xs … 3xl`** | Header, Footer, Layout, Navigation, TabBar | `device=mobile\|desktop` у Section, Banner | Зафіксувати шкалу як стандарт для властивості `Breakpoint`? |
| 6 | Розміри **`SM \| MD`** (uppercase), **`xs \| md`** | Status, Empty | еталони `lg \| md \| sm` | Єдина шкала розмірів? |
| 7 | **Спільний неймспейс токенів** на кілька компонентів (`contextual.selection-controls.*`) і **semantic напряму** (`semantic.status.*`, тексти Timer) | Controls, Status, Timer | правило 6 | Дозволяємо спільні токени для сімейства компонентів? |

## Компоненти
- **Status/Badge SM** — прив'язаний до неіснуючих `status.sm.*`. Перепривʼязати на `status.*.xs` чи створити `status.sm.*`? (`components/status.md`)
- **XON** — немає `border.selection-controls.controls.radio-button` (`components/controls.md`); текст Tag прозорий (`contextual.tag.color.*` = `core.content.a0`, `components/chip-tag.md`).
- **Input** — Hover/Active без обведення при наявних токенах `border-color.hover/active` — так задумано? (`components/input.md`)
- **Empty md** — тексти не прив'язані до `Title`/`Discription` (`components/empty.md`).
- **Legacy-набори** поруч з новими (Controls: `Selection-controls`, `Toggles`; Status: 8 наборів; Popup, Switcher, Progress, Banner) — видаляємо чи `Deprecated/…`?
- **Button/Text** — перейменування з `Button/Link` (еталон) — підтвердити, оновити `reference-components.md` (оновлено 21.10 за файлом).
