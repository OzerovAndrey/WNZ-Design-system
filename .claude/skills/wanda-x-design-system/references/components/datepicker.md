# Datepicker — виправлена копія (2026-10-22)

Сторінка `↳ Datepicker - Андрей` · оригінал зліва (не чіпали) · **нова Section `Datepicker` (78766:181)** праворуч, x 1000 · статус: на перевірці командою.

Завдання (Андрей): виправити й організувати як еталони, **без нових токенів і без Token Studio**; наявні прив'язки оригіналу на копії збережено.

## Анатомія копії
```
Section Datepicker (#BBBBBB, 80 px) — основний зверху, під-компоненти під ним
├─ Datepicker          (78766:265)   Type = Days | Months
│    Days:   Calendar → Select · Weeks → Week days (7× Week day) · Week ×6 (Date) ; Footer (Button sm)
│    Months: Calendar → Row ×4 (3× Month)
├─ Datepicker/Select   (78766:232)   COMPONENT · інстанси Input: Month, Year
├─ Datepicker/Week day (78766:182)   COMPONENT
├─ Datepicker/Date     (78766:184)   State × Range · Day → Label
└─ Datepicker/Month    (78766:221)   State
```

## Властивості
| Компонент | Було | Стало |
|---|---|---|
| Date | `Type` (12 значень) + `Selected range` = no \| yes (дублює `Type`) | `State` = Default \| Hover \| Today \| Selected \| Selected Hover \| Disabled · `Range` = None \| Start \| Middle \| End |
| Month | `Type` = Default \| Disabled \| Today \| Hover \| selected | `State` = Default \| Hover \| Today \| Selected \| Disabled |
| Datepicker | `type` = days \| months | `Type` = Days \| Months |

Мапа Date: Hover-Selected → Selected Hover/None; Start date → Default/Start; Selected range → Default/Middle; End date → Default/End; Hover Start date / Hover Selected range / Hover End date → Hover/Start|Middle|End.

## Що виправлено
- Набори Date/Month без GRID-лейауту, де варіанти накладались; варіанти сіткою 16 px (рядки Range, колонки State).
- Прихований `Title old` (вектори + текст `June` без стилю) прибрано.
- `Week day`: у мейні текст був білий hardcode, колір давали override-и інстансів → у мейн перенесено `semantic/text/default/primary` (+ токен на шарі `fill`), як в override-ах оригіналу.
- Вкладені інстанси Datepicker перемкнуто на нові під-компоненти, числа й назви місяців збережено як override-и тексту (text-властивостей немає — правило 2026-10-22).
- Шари: `button` → `Footer`, `Days of the week` → `Week days`, `months row` → `Row`, `wrap` → `Day`.

## Токени — стан як в оригіналі (перепривʼязку відкочено 2026-10-22)
Копія, як і оригінал, прив'язана до змінних **видаленої колекції** (`66812:267089`): 646 прив'язок, шари показують кешовані значення. Спроба перепривʼязати на наявні змінні/шкалу відкочена на прохання Андрея — потрібні саме ті токени, яких зараз немає; рішення за командою.

Змінні, на які посилається компонент:
| Є в Product і Token Studio | **Немає ніде (треба створити)** |
|---|---|
| `contextual.datepicker.{fill,border,bottom-fill}`, `datepicker.padding`, `contextual.datepicker.item.{fill,border}.{default,hover,today,selected,selected-range,disabled}`, `semantic.text.{default.primary,disabled.primary,brand.on-brand}`, `button.gap.sm` | `datepicker.date.size` (→size.500, 40), `border-radius.datepicker.item` (→core.full), `border-radius.datepicker.all` (→core.300), `datepicker.gap` (→spacing.200), `datepicker.selects.gap` (→spacing.400), `datepicker.weeks.gap`, `datepicker.weeks.item.gap` (→spacing.0), `datepicker.months.padding-horizontal` (→spacing.200), `datepicker.months.padding-vertical` (→spacing.400), `contextual.datepicker.item.text.selected` (→core.content.a100) |

Навіть ті, що «є», на шарах вказують на старі (видалені) id — після створення відсутніх токенів і Export з Token Studio потрібна перепривʼязка за назвою.
Hardcode як в оригіналі: Footer padding 16/8, `Row` gap 8, Week day padding 6.
Єдина відмінність від оригіналу: текст `Datepicker/Week day` — `semantic/text/default/primary` у мейні (в оригіналі колір давали override-и інстансів).

## Відхилення / питання (не виправлялось — точна копія)
- Немає `Inverted` — потребує нових токенів.
- Date: `Hover*` у Range мають обведення тільки зверху/знизу кольором `fill/selected`, а stroke прив'язаний до fill-токена (`…/fill/selected`); `Selected Hover` виглядає як `Selected`.
- Date Start/End: смуга діапазону (`fill/selected-range`) на кореневому шарі з радіусом full — під кругом не видно «напівсмуги» до сусідньої дати.
- Внутрішній `Day` різної висоти (32 vs 40) між варіантами.
- Months: радіус/обведення на корені, а fill/тінь на `Calendar` — подвійна обгортка.
- `Datepicker/Select`: Input «September» у ширині 100 переноситься в самому мейні (в Datepicker розтягнуто).
