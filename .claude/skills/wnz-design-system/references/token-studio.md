# Token Studio у файлі WNZ

## Структура
- Версія плагіна 2.13, storage `local` (токени живуть у самому Figma-файлі).
- Сети: `mb/core`, `mb/alias`, `mb/component`, `xon/core`, `xon/alias`, `xon/component`. Тема `Product` → режими MB / XON колекції `Product`.
- Компонентні токени — **тільки** в `*/component`.

## Джерело правди
Повний експорт усіх сетів і тем — `tokens/system/` у корені репо (`$themes.json`, `$metadata.json`, `mb/*`, `xon/*`). Перед роботою з токенами читати звідти; після змін у Token Studio — оновлювати експорт.

**Останній експорт у репо: 2026-10-21** (MB component 656 токенів, XON component 654).

## Свіжість експорту — питати щоразу
Токени в Token Studio щодня змінюють і доповнюють інші колеги, тому експорт у репо швидко застаріває.

1. **На початку будь-якої роботи з WNZ** (компонент, токени, лейаут, аудит) — спитати: «Чи були нові зміни в Token Studio? Якщо так — дай, будь ласка, свіжий архів JSON». Не починати збирання чи прив'язку токенів, поки не відповіли.
2. Архів (zip, структура як `tokens/system/`) розпакувати в окрему порожню папку (scratchpad), не в репо.
3. Порівняти: `python3 -I scripts/tokens-diff.py tokens/system <розпакований архів>` → коротко показати людині: що додано / видалено / змінено, чи торкається це компонента, з яким працюємо, чи немає конфлікту імен з токенами, які ми додаємо.
4. Замінити вміст `tokens/system/` новим експортом, оновити дату «Останній експорт» вище, комітом у `main` (`tokens: export YYYY-MM-DD`).
5. Перевірити, чи потрапили в експорт токени, які ми раніше передали на вставку (`tokens/<component>.*.component.json`); якщо ні — нагадати, що їх ще треба вставити в Token Studio.

Якщо свіжого архіву немає — працювати з останнім експортом і прямо сказати, від якої дати він.

**Ніколи не писати токени в storage Token Studio** (розділ нижче) на основі застарілого експорту — це перезапише зміни колег. Перед записом — тільки свіжий архів і diff.

## Бренди різні
MB — світлий продукт (page `#f0f8ff`, heading `#113098`), XON — темний (page `#0e1935`, heading білий). Однаковий semantic-аліас у двох брендах може дати протилежний результат. Кольори компонента — **тільки з alias (`semantic.*`)**, ніколи напряму з `core.*`: брендові відмінності вже закладені в alias кожного бренду. Перевіряти результат на фоні сторінки та на білій картці обох брендів; якщо semantic не дає потрібного контрасту — питання до команди, а не обхід через core.

**Як в еталонах (Accordion, Tabs, Button tertiary):** `Inverted=False` → `semantic.text.default.*` (MB темний на світлому продукті, XON білий на темному продукті); `Inverted=True` → `semantic.text.default-invert.*`. Однакові semantic-токени в обох брендах — різницю дає alias бренду. Не підміняти на `text.static.*`, щоб «вирівняти» бренди.

## Іменування токенів компонента
| Що | Шаблон | Тип |
|---|---|---|
| розміри, падінги, gap | `<component>.<part>.<property>` (`anchor.item.height`) | `sizing` / `spacing` |
| радіус | `border-radius.<component>.<part>` | `borderRadius` |
| кольори | `contextual.<component>.<part>.<role>` → якщо є стани: `.<role>.<state>` | `color` |
| типографіка | наявний alias-токен (`text.md-strong`) | `typography` |

**Структура «в рядок»** (як `contextual.button.primary.fill.{default,hover,active,disabled}`): останній рівень — це набір значень, що стоять поруч (стани, розміри `sm/md/lg`, ролі `fill/text/icon`). **Не створювати рівень з одним листком** (`fill.default`, коли станів немає) — це дає окрему гілку на кожен колір. Без станів: `contextual.anchor.item.{fill,color}`, `contextual.anchor.item-invert.{fill,color}`.

**Компонент з однієї частини** (Chip, Tag, Badge) — без проміжного рівня `base`/`item`: кольори прямо в `contextual.<component>.<role>.<state>`, інвертовані — `contextual.<component>-invert.<role>.<state>` (`contextual.chip.border.hover`, `contextual.chip-invert.color.default`). Рівень частини (`item`, як в Anchor) — лише коли в компоненті є під-компоненти.

**Мінімум токенів:** текст і іконка одного елемента — **один** токен кольору (`color`, як `accordion.color.primary`); симетричні падінги — один токен `padding-horizontal` / `padding-vertical`, а не `padding-left` + `padding-right`; **структуру частин не зливати**: `item` / `item-invert` мають кожен свій `fill`, навіть якщо значення однакові (команда може розвести їх пізніше).

Значення — аліаси на alias/core (`{spacing.200}`, `{semantic.fill.default}`); сирі числа лише там, де немає відповідного аліасу (20).

## Як вставляти JSON вручну (JSON-вкладка сету)
Сет — один великий JSON-обʼєкт. **Ніколи** не вставляти новий обʼєкт `{ … }` у кінець файлу і **не дублювати кореневі ключі** `border-radius`, `contextual` — дубль ключа перезапише всю групу (всі `contextual.*` сету зникнуть).
1. Новий кореневий блок (`"anchor": {…}`) — перед останньою `}`: на попередньому закривальному рядку додати кому, вставити блок без коми в кінці.
2. `border-radius.<component>` — всередину **наявного** кореневого `"border-radius": {` (відступ 2 пробіли), одразу після `{`, з комою в кінці.
3. `contextual.<component>` — так само всередину наявного кореневого `"contextual": {`.
4. Перед **Save JSON** — жодної червоної помилки внизу. `Unable to read JSON: lineNumber …` = зайва/відсутня дужка або кома.
5. Повторити для `xon/component`.
6. **Styles & Variables → Export** у колекцію `Product`; опцію видалення змінних без звʼязку не вмикати.

## Запис токенів напряму в storage (Claude)
Коли ручна вставка незручна — Claude може дописати токени у файл сам:
- Дані: `figma.root` shared plugin data, namespace `tokens`: `values_meta` = `{"type":"chunked","count":N}`, `values_chunk_0..N-1` = LZ-string `compressToUTF16` від JSON `{ "<set>": [{name, value, type}] }`. Читати рівно `count` чанків (у файлі бувають залишкові чанки поза `count`).
- Ліміт Plugin API — 100 kB (UTF-8) на запис → чанки ≤ 30 000 символів; оновити `values_meta.count`, очистити зайві чанки, оновити `updatedAt`.
- Обовʼязково: закритий плагін Token Studio; бекап оригіналу в namespace `claude_backup`; roundtrip-перевірка компресора до запису і після.
- Після запису: перезапустити Token Studio → Inspect → Refresh.

## Токен на шарі
`node.setSharedPluginData('tokens', '<key>', JSON.stringify('<token.name>'))`. Ключі: `fill`, `borderColor`, `height`, `width`, `paddingLeft/Right/Top/Bottom`, `itemSpacing`, `borderRadiusTopLeft/TopRight/BottomRight/BottomLeft`, `typography`, `boxShadow`. Плюс однойменна Figma-змінна на тій самій властивості (як в еталоні Button).

## Діагностика в Inspect
| Значок | Значення | Що робити |
|---|---|---|
| ⬡ біля токена | прив'язка лише через Figma-змінну | поставити токен на шар (plugin data) |
| розірваний ланцюг | токена немає в активних сетах | дописати токен у `mb/component` і `xon/component` |
