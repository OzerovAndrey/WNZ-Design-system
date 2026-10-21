# Controls (Checkbox, Radio, Toggle)

Сторінка `↳ Controls (Checkbox, Radio, Toggle) 💛` · Section `Controls` (78361:636600, `#808080`) · набори `Controls/checkbox` (78315:499124), `Controls/radio` (78315:499199), `Controls/toggle` (78315:499274) · статус: Learned

## Призначення і характер
Три контроли вибору з однаковою анатомією: квадрат/коло/перемикач + підпис. Замінюють старі `Selection-controls` (20v) і `Toggles` (20v), які ще лежать на канвасі поза Section.
- **Роль і місце:** форми, фільтри, налаштування профілю; підпис праворуч, gap 4.
- **Поведінка:** `Active=True` — заливка бренду `checkbox.fill.selected.*` + білий `check-mark` / `Bullet` / зсув `Indicator` вправо (у toggle порядок `Inner` ↔ `Indicator` міняється місцями). `Hover` — світліший відтінок. `Disabled` — заливка з прозорістю, текст `tertiary`. `Validation` (лише checkbox) — червоне обведення `border.unselected.error` в обох `Active`.
- **Inverted:** немає.
- **MB vs XON:** однакові значення (`core.brand-60.500` у selected).
- **Масштаб:** один розмір — контрол 20×20 (toggle 44×24), текст `text/md`. Ширина HUG.
- **Межі:** у checkbox і radio підпис не вимикається (немає Boolean `Label`), у toggle — є.

## Анатомія
```
Controls/checkbox | radio | toggle (COMPONENT_SET)   State × Active
└─ Variant  HORIZONTAL · HUG · gap contextual.selection-controls.gap (4)
    ├─ Control  20×20 (toggle 44×24, padding contextual.selection-controls.controls.toggle.padding)
    │   │       fill / border  contextual.selection-controls.controls.<checkbox|radio-button|toggle>.{fill|border}.{selected|unselected}.{state}
    │   │       radius  border-radius.checkbox (4) · border-radius.core.full (radio) · border-radius.toggle (16)
    │   ├─ check-mark   INSTANCE (remote) 16×16          — checkbox, Active=True
    │   ├─ Bullet       ELLIPSE 10×10 · …radio-button.bullet.selected.*   — radio, Active=True
    │   └─ Indicator 20×20 + Inner (min-width 20)        — toggle; порядок задає положення
    └─ Text  text/md · semantic.text.default.primary (Disabled → tertiary)   ← toggle: Boolean Label
```

## Властивості
| Набір | Властивості |
|---|---|
| `Controls/checkbox` | `State` = Default \| Hover \| Disabled \| Validation · `Active` = False \| True |
| `Controls/radio` | `State` = Default \| Hover \| Disabled · `Active` = False \| True |
| `Controls/toggle` | `State` = Default \| Hover \| Disabled · `Active` = False \| True · Boolean `Label` |

## Токени
| Токен | MB | XON |
|---|---|---|
| `contextual.selection-controls.gap` | 4 | 4 |
| `contextual.selection-controls.controls.checkbox.size` / `.radio-button.size` | 20 | 20 |
| `contextual.selection-controls.controls.toggle.indicator.size` / `.inner.min-width` / `.padding` | 20 / 20 / 2 | = |
| `…checkbox.fill.selected.default` | `{core.brand-60.500}` | = |
| `…checkbox.fill.unselected.default` | `{semantic.fill.default}` | = |
| `…checkbox.border.unselected.default` | `{semantic.border.default.default}` | = |
| `…radio-button.bullet.selected.default` | `{core.white.500}` | = |
| `…toggle.{fill,border,bullet}.*` | alias на `…checkbox.*` / `…radio-button.bullet.*` | = |
| `border-radius.checkbox` / `border-radius.toggle` | 4 / 16 | = |
| `border.selection-controls.controls.checkbox` / `.toggle` | 1 | 1 |
| `border.selection-controls.controls.radio-button` | 1 | **відсутній** |

## Рішення (історія)
1. 2026-10-21 — (команда) нові набори `Controls/*` у Section `Controls`; сторінку виділено з Forms.

## Відхилення від правил
- Старі `Selection-controls` і `Toggles` лишились на канвасі поза Section (дублі сутності — правило 8, сміття — правило 12).
- Один спільний неймспейс `contextual.selection-controls.*` на три компоненти (правило 6 — власні токени компонента); radio бере `border-radius.core.full` напряму.
- Кольори selected / bullet з `core.*` (`core.brand-60.500`, `core.white.500`), не `semantic.*`.
- `border.selection-controls.controls.radio-button` немає в XON — у XON обведення radio не резолвиться.
- Назви наборів lowercase (`checkbox`, `radio`, `toggle`) — naming: Title Case.
- `Active` замість `Selected`/`Checked`; немає `Inverted`.
- `check-mark` — remote-іконка (перевірити, що з `Static — Icons`).

## Відкриті питання
- Старі набори: видаляємо чи маркуємо `Deprecated`? Скільки інстансів у лейаутах?
- `Validation` є лише в checkbox — для radio/toggle не потрібен?
- Назви: `Controls/Checkbox` (Title Case) чи лишаємо lowercase?

## Мета знімка
| | |
|---|---|
| Знімок (дайджест) | `snapshots/controls.json` |
| Вивчено | 2026-10-21 |
| Експорт токенів | 2026-10-21 |
| Варіантів | 8 + 6 + 6 |
