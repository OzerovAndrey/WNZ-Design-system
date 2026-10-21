# Chip & Tag — у роботі (Андрей)

Сторінка `↳ Chip & Tag - Андрей` (до 2026-10-21 — `Chips & Tags`) · Section `Chip` (78589:280056) з набором `Chips` (46859:45827) · Section `Tag` (78589:294522) з **новим** набором `Tag` (78589:294536) · статус: In progress (team)

> Сторінку переробляють прямо зараз (під час вивчення 21.10 старий `Tag` 42238:3739 зник з канвасу, з'явились окремі Section). Документ фіксує стан на 11:01 UTC — оновити, коли команда скаже, що готово.

## Chip (набір `Chips`) — оновлено командою, Inverted додано 2026-10-21
- Фільтр-капсула: лейбл `text/md` + опційні іконки зліва/справа (`plus` за замовчуванням), висота 32, радіус full, обведення 1.
- Варіанти: `State` = Default | Hover | Active × **`Inverted` = False | True** (6 варіантів, сітка: рядки State, колонки Inverted).
- Властивості: `⬅️ Icon`, `Icon ➡️` (Boolean), `↳ 💠 Component` ×2 (swap), `State`, `Inverted`.
- Розміри: `chips.height`, `chips.padding-h`, `chips.gap`, `chips.icon.size`, `border-radius.chips` — спільні для обох версій.

### Кольорові токени
| Токен | Inverted=False (`contextual.chips.normal.*`) | Inverted=True (`contextual.chips.normal-invert.*`) |
|---|---|---|
| `fill.default` / `fill.hover` | `{core.content.a0}` | `{core.content.a0}` (плашка та сама) |
| `fill.active` | `{core.content.a8}` | `{core.white.a0}` ⚠ |
| `icon.default` / `icon.hover` (текст + іконка) | `{semantic.icon.default.tertiary}` | `{semantic.text.default-invert.tertiary}` |
| `icon.active` | `{core.content.a100}` | `{semantic.text.default-invert.heading}` |
| `border.default` | `{core.grey.300}` | `{core.white.a30}` |
| `border.hover` | `{contextual.chips.normal.border.active}` | `{contextual.chips.normal-invert.border.active}` |
| `border.active` | `{core.content.a100}` | `{core.white.500}` |

Значення однакові в MB і XON. Змінні `contextual/chips/normal-invert/*` у колекції `Product` — alias на ті самі змінні, scope `ALL_SCOPES` (як у `normal`). Токени Token Studio стоять на шарах (`fill`, `borderColor`) разом зі змінними.

### Рішення
1. 2026-10-21 — (Claude, на запит Андрея) додано `Inverted` за правилом 15: клон кожного State, міняються лише кольори контенту й обведення; розміри й text style спільні.
2. Неймінг інвертних токенів повторює структуру команди: `contextual.chips.normal` → `contextual.chips.normal-invert`.
3. Де є semantic-інверт — alias на нього (`semantic.text.default-invert.*`); де немає (обведення, `white`-тінт) — `core.white.*`, як у звичайній версії команда бере `core.*`.

### Відхилення / питання
- ⚠ `fill.active` інверта: у `core.white` немає `a8` (є 500, a90, a70, a50, a30, a0), тож Active-інверт відрізняється лише обведенням і кольором тексту. Потрібен `core.white.a8` (або semantic-тінт для темного фону)?
- Немає `semantic.icon.default-invert.*` і `semantic.border.*-invert` — іконка взята з `semantic.text.default-invert.*`, обведення з `core.white.*`.
- Кольори звичайної версії з `core.*` (правило 6, semantic-only) — рішення команди.
- Набір `Chips` — множина; Section уже `Chip`.

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

## Мета знімка
`snapshots/chip.json`, `snapshots/tag.json` · вивчено 2026-10-21 (проміжний стан).
