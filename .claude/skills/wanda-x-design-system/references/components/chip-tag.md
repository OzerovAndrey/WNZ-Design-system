# Chip & Tag — у роботі (Андрей)

Сторінка `↳ Chip & Tag - Андрей` (до 2026-10-21 — `Chips & Tags`) · Section `Chip` (78589:280056) з набором `Chips` (46859:45827) · Section `Tag` (78589:294522) з **новим** набором `Tag` (78589:294536) · статус: In progress (team)

> Сторінку переробляють прямо зараз (під час вивчення 21.10 старий `Tag` 42238:3739 зник з канвасу, з'явились окремі Section). Документ фіксує стан на 11:01 UTC — оновити, коли команда скаже, що готово.

## Chip (набір `Chips`)
- Фільтр-капсула: лейбл `text/md` + опційні іконки зліва/справа, висота 32, радіус full, обведення 1.
- `State` = Default | Hover | Active (Active — фон `core.content.a8`); `Type` = Normal (єдине значення).
- Токени: `contextual.chips.normal.{fill,border}.{default,hover,active}`, `border-radius.chips` — значення з `core.*`; текст — `semantic.text.default.{secondary,primary,heading}`.
- Властивості: `Icon-left`, `Icon-right`, `Left-icon`, `Right-icon`, `Label` — змішаний стиль ключів.

## Tag (новий набір)
- Тег у полі вводу / фільтрі: лейбл `text/md-strong` + іконка `close` (16) зліва/справа, висота 24, радіус `border-radius.tag` (`core.200`).
- `State` = Default | Hover | Disabled. Властивості: `Show-right-icon`, `left icon`, `Label` (без swap іконки).
- Токени: `contextual.tag.{fill,border,color}.{default,hover,disabled}`, `tag.icon-size` (16).
- **XON:** `contextual.tag.color.default` / `.disabled` = `{core.content.a0}` — текст прозорий (дефект з аудиту 19.10 лишився).
- `State=Default` має лише токени Token Studio, `Hover`/`Disabled` — ще й змінну `border-radius/tag` на радіусі (неоднаково).

## Відхилення (стан на 21.10)
- Набір `Chips` — множина; Section уже `Chip`. `Type=Normal` з одним значенням.
- Кольори з `core.*` (правило 6, semantic-only).
- Ключі властивостей у трьох стилях (`Icon-left`, `Show-right-icon`, `left icon`).
- Немає `Inverted`.

## Мета знімка
`snapshots/chip.json`, `snapshots/tag.json` · вивчено 2026-10-21 (проміжний стан).
