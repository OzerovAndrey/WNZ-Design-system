# Token Studio у файлі WNZ

## Структура
- Версія плагіна 2.13, storage `local` (токени живуть у самому Figma-файлі).
- Сети: `mb/core`, `mb/alias`, `mb/component`, `xon/core`, `xon/alias`, `xon/component`. Тема `Product` → режими MB / XON колекції `Product`.
- Компонентні токени — **тільки** в `*/component`.

## Джерело правди
Повний експорт усіх сетів і тем — `tokens/system/` у корені репо (`$themes.json`, `$metadata.json`, `mb/*`, `xon/*`). Перед роботою з токенами читати звідти; після змін у Token Studio — оновлювати експорт.

## Бренди різні
MB — світлий продукт (page `#f0f8ff`, heading `#113098`), XON — темний (page `#0e1935`, heading білий). Однаковий semantic-аліас у двох брендах може дати протилежний результат. Кольори компонента — **тільки з alias (`semantic.*`)**, ніколи напряму з `core.*`: брендові відмінності вже закладені в alias кожного бренду. Перевіряти результат на фоні сторінки та на білій картці обох брендів; якщо semantic не дає потрібного контрасту — питання до команди, а не обхід через core.

## Іменування токенів компонента
| Що | Шаблон | Тип |
|---|---|---|
| розміри, падінги, gap | `<component>.<part>.<property>` (`anchor.item.height`) | `sizing` / `spacing` |
| радіус | `border-radius.<component>.<part>` | `borderRadius` |
| кольори | `contextual.<component>.<part>.<role>` → якщо є стани: `.<role>.<state>` | `color` |
| типографіка | наявний alias-токен (`text.md-strong`) | `typography` |

**Структура «в рядок»** (як `contextual.button.primary.fill.{default,hover,active,disabled}`): останній рівень — це набір значень, що стоять поруч (стани, розміри `sm/md/lg`, ролі `fill/text/icon`). **Не створювати рівень з одним листком** (`fill.default`, коли станів немає) — це дає окрему гілку на кожен колір. Без станів: `contextual.anchor.item.{fill,text,icon}`, `contextual.anchor.item-invert.{fill,text,icon}`.

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
