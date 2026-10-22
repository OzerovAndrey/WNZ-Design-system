# Datepicker — виправлена копія (2026-10-22)

Сторінка `↳ Datepicker - Андрей` · оригінал зліва (не чіпали) · **нова Section `Datepicker` (78766:181)** праворуч, x 1000 · статус: на перевірці командою.

Завдання (Андрей): виправити й організувати як еталони, **без нових токенів і без Token Studio**; наявні прив'язки оригіналу на копії збережено.

## Анатомія копії
```
Section Datepicker (#BBBBBB, 80 px)
├─ Datepicker/Week day (78766:182)   COMPONENT · ✏️ Label (Su…Sa)
├─ Datepicker/Date     (78766:184)   State × Range · ✏️ Label
│    Day (було wrap) → Label (було "1")
├─ Datepicker/Month    (78766:221)   State · ✏️ Label (January)
├─ Datepicker/Select   (78766:232)   COMPONENT · інстанси Input: Month, Year
└─ Datepicker          (78766:265)   Type = Days | Months
     Days:   Calendar → Select · Weeks → Week days (7× Week day) · Week ×6 (Date) ; Footer (Button sm)
     Months: Calendar → Row ×4 (3× Month)
```

## Властивості
| Компонент | Було | Стало |
|---|---|---|
| Date | `Type` (12 значень) + `Selected range` = no \| yes (дублює `Type`) | `State` = Default \| Hover \| Today \| Selected \| Selected Hover \| Disabled · `Range` = None \| Start \| Middle \| End · `✏️ Label` |
| Month | `Type` = Default \| Disabled \| Today \| Hover \| selected | `State` = Default \| Hover \| Today \| Selected \| Disabled · `✏️ Label` |
| Week day | — | `✏️ Label` |
| Datepicker | `type` = days \| months | `Type` = Days \| Months |

Мапа Date: Hover-Selected → Selected Hover/None; Start date → Default/Start; Selected range → Default/Middle; End date → Default/End; Hover Start date / Hover Selected range / Hover End date → Hover/Start|Middle|End.

## Що виправлено
- Набори Date/Month без GRID-лейауту, де варіанти накладались; варіанти сіткою 16 px (рядки Range, колонки State).
- Прихований `Title old` (вектори + текст `June` без стилю) прибрано.
- `Week day`: у мейні текст був білий hardcode, колір давали override-и інстансів → у мейн перенесено `semantic/text/default/primary` (+ токен на шарі `fill`), як в override-ах оригіналу.
- Вкладені інстанси Datepicker перемкнуто на нові під-компоненти, числа й назви місяців збережено через `✏️ Label`.
- Шари: `button` → `Footer`, `Days of the week` → `Week days`, `months row` → `Row`, `wrap` → `Day`.

## Токени (без змін, як в оригіналі)
`datepicker/date/size`, `border-radius/datepicker/{item,all}`, `contextual/datepicker/{fill,border,bottom-fill}`, `contextual/datepicker/item/{fill,border}/{default,hover,today,selected,selected-range,disabled}`, `contextual/datepicker/item/text/selected`, `datepicker/{gap,padding,selects/gap,weeks/gap,weeks/item/gap,months/padding-*}`, тексти `semantic/text/*`.

## Відхилення / питання (не виправлялось — точна копія)
- Немає `Inverted` — потребує нових токенів.
- Date: `Hover*` у Range мають обведення тільки зверху/знизу кольором `fill/selected`, а stroke прив'язаний до fill-токена (`…/fill/selected`); `Selected Hover` виглядає як `Selected`.
- Date Start/End: смуга діапазону (`fill/selected-range`) на кореневому шарі з радіусом full — під кругом не видно «напівсмуги» до сусідньої дати.
- Внутрішній `Day` різної висоти (32 vs 40) між варіантами.
- Months: радіус/обведення на корені, а fill/тінь на `Calendar` — подвійна обгортка.
- `Datepicker/Select`: Input «September» у ширині 100 переноситься в самому мейні (в Datepicker розтягнуто).
