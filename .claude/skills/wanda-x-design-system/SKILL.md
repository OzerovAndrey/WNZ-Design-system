---
name: wanda-x-design-system
description: Правила, еталони та чекліст очистки для Figma-файлу "[Wanda X] Design system" (fileKey 3MbdWPLOGBjBj92Y3EnPYN, бренди MB / XON, Token Studio core/alias/component). Use ANY TIME the user works on Wanda X components, layouts or tokens — audit, cleanup, fixing a component, building a layout from Wanda X components — or mentions "Wanda X", "Wanda X ДС", file key 3MbdWPLOGBjBj92Y3EnPYN, MB/XON themes. INDEX file — details live in references/*.md, load only what the task needs.
---

# Wanda X — index

> **Figma зараз — лише читання.** Команда сама доробляє компоненти у файлі; нічого в Figma не змінювати (жодних `use_figma`/записів), поки команда явно не скаже підключатися.

Дизайн-система, отримана від іншого департаменту. Мета команди — **очистити її від неправильних рішень** і далі використовувати як робочу бібліотеку. Еталон якості — компоненти, позначені **Ready for dev**.

## Файл

| | |
|---|---|
| Figma | `https://www.figma.com/design/3MbdWPLOGBjBj92Y3EnPYN/-Wanda-X--Design-system` |
| fileKey | `3MbdWPLOGBjBj92Y3EnPYN` |
| Бренди / теми | **MB**, **XON** (Token Studio: у кожного бренду сети `core`, `alias`, `component`) |
| Змінні у Figma | 1 колекція `Product`, режими `MB` / `XON` |
| Розділи сторінок | `Tokens` · `Logotype` · `Breakpoints` · `Components` · `Atoms` · `Molecules` · `Organisms` · `[???]` · `All Cards` · продуктові лейаути (`Homepage +`, `Cashbox`, `Profile +` …) |

## Статус компонентів

**Еталон (Ready for dev, виправлено нашою командою):** Atoms → `Accordion`, `Badge`, `Button`, `Link`, `Divider`, `Dropdown`, `Label`, `Spinner`.

**Оновлено командою і вивчено (💛, не Ready for dev):** `Input`, `Controls`, `Status`, `Timer`, `Empty`, `Section` — `references/components/<c>.md`. У роботі: `Chip & Tag`, `Banner`, `Heading`. Повний список і статуси — `references/component-registry.md`; питання до команди — `references/open-questions.md`.

Все інше — **не еталон**, поки не пройшло `references/definition-of-done.md`. Поточний стан кожної сторінки — у `references/audit-2026-10-19.md`; що вже вивчено і коли — у `references/component-registry.md`.

## Режим навчання

Проєкт **поступово навчається**: команда освіжає й додає компоненти у Figma, Claude відстежує зміни і вивчає кожен компонент — характер, стани, токени (`references/learning-workflow.md`).
- Тригер — «оновили / додали `<Компонент>`», «що змінилось у `<X>`», або початок сесії (спитати, що чіпали з минулого разу).
- Цикл: свіжі токени → знімок `scripts/snapshot-component.js` (read-only) → `snapshots/<c>.json` → diff `scripts/snapshot-diff.py` → `references/components/<c>.md` за `_template.md` → реєстр → журнал + коміт `learn(<c>): …`.
- Claude нічого не виправляє: відхилення від правил — у розділ «Відхилення» компонента і питання команді; повторюване відхилення — привід спитати, чи це нове правило.

> Статус Ready for dev через Plugin API **не читається** (`devStatus` → "not a supported API"). Якщо список еталонів змінився — оновіть його тут вручну.

## 17 золотих правил

0. **Спершу — свіжі токени.** Токени в Token Studio щодня змінюють колеги. На початку будь-якої роботи з Wanda X спитати, чи були зміни, і попросити свіжий архів JSON; оновити `tokens/system/` і показати diff (`references/token-studio.md` → Свіжість експорту).

1. **Точна копія — нічого не додумувати.** Переробляючи компонент, зберігаємо вигляд, розміри, кількість елементів і стани оригіналу; змінюємо лише збірку. Нові варіанти/брейкпоінти/слоти — тільки на запит команди (`references/rebuild-workflow.md`).
2. **Еталон перш за все.** Перед тим як правити компонент — відкрий найближчий еталон і повтори його анатомію, неймінг і прив'язки токенів (`references/reference-components.md`).
3. **Instance, не імітація.** У компонентах і лейаутах — тільки інстанси реальних компонентів. Не малювати кнопку/бейдж фреймом.
4. **Токени Token Studio — напряму на шар.** Не лише Figma-змінна: на кожну властивість ставиться токен Token Studio (plugin data `tokens`) + однойменна змінна, як в еталоні Button (`references/tokens.md`).
5. **Жодного hardcode.** Колір, радіус, висота, падінги, розмір іконки, типографіка — через змінні/стилі. Hex-значення в компоненті = дефект.
6. **Свої компонентні токени** (для заливок, обведень, розмірів; **колір тексту, іконок і шевронів — глобальні `semantic.*` напряму**, без `contextual.<c>.text/icon/…`, рішення 2026-10-22). Компонент прив'язується до власних токенів `<component>.*`, `border-radius.<component>.*`, `contextual.<component>.*` у `mb/component` і `xon/component` (значення кольорів — **тільки alias `semantic.*`**, не `core.*`), а не напряму до semantic/core і не до токенів інших компонентів (`references/token-studio.md`).
7. **Жодних чужих бібліотек.** Змінні з чужих бібліотек (`Colors/text`, `Radius/0`, `spacing/xxs`, `grid/12`, `list item/*` …) заборонені — заміняти на токени колекції `Product`.
8. **Один компонент — одна сутність.** Дублікати (`Input` ×2, `Selection-controls` vs `Toggles`, 10 наборів `Status` …) зливаються в один набір з варіантами; legacy видаляється або маркується `Deprecated`.
9. **Без text-властивостей.** `✏️ Label` та інші TEXT-проперті не створюємо — текст міняють вручну в інстансі (рішення 2026-10-22).
9a. **Неймінг за стандартом** (`references/naming.md`): Title Case англійською, без опечаток, без `Property 1`, без `Frame 123`.
10. **Auto layout всюди**, де є 2+ дочірніх елементи. Absolute — тільки для оверлеїв/бейджів/масок.
11. **Продуктові компоненти — не в ДС.** Hall of fame, Cashbox, Welcome bonus, Lootboxes тощо переїжджають у продуктовий файл або розділ Patterns.
12. **Кожен компонент — у власній Section** з назвою компонента, без сміття на канвасі (нотатки, загублені інстанси, вектори). Section **сіра `#BBBBBB`**, обведення чорне 10%, радіус 2 — як `Anchor`; оформлення — `references/section-layout.md`.
13. **Іконки — тільки зі Static — Icons.** Будь-яка іконка в ДС (векторна, detached, з іншої бібліотеки) замінюється на найближчий відповідник з бібліотеки `Static — Icons` (`references/icons.md`).
14. **Документація — тільки в скілі.** Поле `description` компонентів у Figma лишаємо порожнім, нотатки на канвас не ставимо. Призначення, анатомія, токени, рішення — у `references/components/<component>.md`.
15. **Inverted у кожного компонента.** Окрема властивість `Inverted = False | True` для всіх поєднань варіантів; міняється лише колір контенту, токени `contextual.<component>.<part>-invert.*`. Не `State=Invert`, не окремий набір (`references/naming.md` → Inverted).
16. **Не редагувати без дозволу.** Аудит = read-only. Зміни у файлі — тільки після погодження; виправлену копію ставити поруч з оригіналом.

## Коли що читати

| Задача | Файл |
|---|---|
| Як влаштований еталон (Button, Badge, Dropdown …) | `references/reference-components.md` |
| Назви компонентів, властивостей, варіантів, шарів | `references/naming.md` |
| Структура токенів, як прив'язувати, відомі проблеми | `references/tokens.md` |
| Чи можна ставити компоненту Ready for dev | `references/definition-of-done.md` |
| **Переробити компонент (покроково)** | `references/rebuild-workflow.md` |
| Token Studio: формат, «в рядок», semantic-only, вставка JSON, запис у storage, Inspect | `references/token-studio.md` |
| Повний експорт токенів (джерело правди) | `tokens/system/` у корені репо |
| Отримали свіжий архів JSON — оновити експорт і показати diff | `references/token-studio.md` → Свіжість експорту, `scripts/tokens-diff.py` |
| Зробити аудит сторінки/компонента скриптом | `references/audit-script.md` |
| Що вже знайдено, беклог по сторінках | `references/audit-2026-10-19.md` |
| Збирати або чистити лейаут | `references/layouts.md` |
| Замінити / підібрати іконку | `references/icons.md` |
| Опис конкретного компонента (анатомія, токени, рішення) | `references/components/<component>.md` |
| **Команда оновила / додала компонент — вивчити** | `references/learning-workflow.md`, шаблон `references/components/_template.md` |
| Що вивчено, коли, статуси | `references/component-registry.md` |
| Питання до команди, нові конвенції на перевірку | `references/open-questions.md` |
| Знімок компонента і diff з минулим разом | `scripts/snapshot-component.js`, `scripts/snapshot-diff.py`, `snapshots/` |
| Як оформлювати Section на сторінці компонента | `references/section-layout.md` |

## Технічні нотатки Figma MCP (перевірено на цьому файлі)

- **Доступ:** Figma-конектор працює від акаунта `evgeniy.bogdanov@ys.bet` (Wanda — visualvoyager/desops). Перед змінами — пробний запис; `read-only mode` = немає Can edit на файл.

- Сторінки вантажаться ліниво: `get_metadata` без nodeId показує лише першу сторінку; список усіх сторінок — через `use_figma` → `figma.root.children`.
- Одна сторінка = один `use_figma` виклик; кілька сторінок — паралельні виклики (або батч по 4–7 сторінок для read-only).
- `node.devStatus` недоступний у Plugin API — статус Ready for dev вручну.
- `componentPropertyDefinitions` кидає помилку на зламаних наборах ("Component set has existing errors") — завжди `try/catch`; сам факт помилки = дефект.
- Корінь INSTANCE повертає `boundVariables` свого мейн-компонента — при підрахунку токенів не плутати їх з прив'язками на локальних шарах.
- Єдине джерело іконок — бібліотека `Static — Icons` (fileKey `J3DHQyf6ARy401o7WywySC`). Усе інше (вектори, `BR / Default / …`, `icons / general / …`, `icon / status / …`, голі `close`/`cancel`) — під заміну, див. `references/icons.md`.
- Token Studio (storage у файлі, запис токенів, токени на шарах) — `references/token-studio.md`.

## Журнал
- 2026-10-22 — **правило: висота рядкових компонентів — size-токен на height, без вертикальних падінгів**; Profile-menu/Item без обгортки Header (`components/list.md`).
- 2026-10-22 — **List / List/Bullet: токени** (`list.*`, `border-radius.list.bullet`, `contextual.list.bullet.fill.*`) + нові alias `semantic.fill.subtle`, `border-radius.global.xs`; **правило:** компонентні токени — тільки через alias, не core (`components/list-bullet.md`).
- 2026-10-22 — **Profile Menu → `List`** (`List/Item`, `List/Subitem`), перейменував Андрей; Section `List`; документація → `components/list.md`.
- 2026-10-22 — **Profile Menu/Item: `State = Default | Active | Open`** × Inverted (6v) — неактивний не може бути відкритим (рішення Андрея).
- 2026-10-22 — **Profile Menu стандартизовано:** один компонент без Device (слот, 3 пункти), дефолти `Label` + іконка `plus`; живі макети перенесено.
- 2026-10-22 — **Profile Menu: Inverted** для Item (8v) і Subitem (4v); Payment sidebar і Profile popup mobile перемкнуто на Inverted (`components/list.md`).
- 2026-10-22 — **Profile Menu**: 6 старих наборів (34 варіанти) зведено в 3 (8 варіантів); живі використання в Profile sidebar, Profile popup mobile, Payment sidebar, anchors замінено; оригінали в Section `Originals` (`components/list.md`). `List-item` + `List-item/Bullet` (виправлені командою) — у власній Section.
- 2026-10-22 — **правило:** квадратні елементи — lock aspect ratio, токен розміру лише на висоту; застосовано до іконок Filter sort.
- 2026-10-22 — **неймінг токенів падінгів:** `padding-h` / `padding-v`; Filter sort перейменовано (`naming.md`).
- 2026-10-22 — **правило:** текст, іконки, шеврони — глобальні `semantic.*` напряму, компонентних колірних токенів для них не створюємо. Filter button: fill hover/active → `semantic.fill.hover` / новий `semantic.fill.active` (alias), розміри `filter-sort.*`.
- 2026-10-22 — **Filter & Sorting вивчено**: використання (Inverted не потрібен — темного контексту немає), впорядкована копія `Tabs & Sort` + `Filter button` (`Type=Icon|Text`), список наявних і потрібних токенів; Open-thumb-provider → Patterns (`components/filter-sorting.md`).
- 2026-10-22 — **Datepicker: створено відсутні токени** (10 шт., аліаси з видалених змінних) у TS MB/XON + `Product`; копію перепривʼязано за назвою (`components/datepicker.md`, `tokens/datepicker.new-tokens.json`).
- 2026-10-22 — **Datepicker: перепривʼязку відкочено** — копія знову на змінних видаленої колекції, як оригінал; список відсутніх токенів — `components/datepicker.md`. Урок: не підміняти відсутні токени наявними без погодження.
- 2026-10-22 — **правило порядку в Section:** основний компонент (той, що йде в дизайн) — завжди перший, під-компоненти під ним; Section Datepicker переставлено (`section-layout.md`).
- 2026-10-22 — **правило: без text-властивостей** (`✏️ Label`) — текст змінюється вручну в інстансі. З копії Datepicker (`Week day`, `Date`, `Month`) прибрано, тексти 62 інстансів збережено.
- 2026-10-22 — **Datepicker: виправлена копія** (на запит Андрея, без нових токенів): Section `Datepicker` поруч з оригіналом; під-компоненти `Datepicker/Week day|Date|Month|Select`, Date — `State × Range` замість `Type` + `Selected range`; `✏️ Label`; прибрано `Title old`; колір Week day перенесено з override-ів у мейн (`components/datepicker.md`).
- 2026-10-21 — **Chip: Inverted** (на запит Андрея, запис у Figma): набір `Chips` State × Inverted (6v); 9 токенів `contextual.chips.inverted.*` у `mb/component` і `xon/component` + змінні `Product`. Питання: немає `core.white.a8` для Active-інверта (`components/chip-tag.md`).
- 2026-10-21 — **перший обхід у режимі навчання** (42 сторінки, read-only). Вивчено 💛: Input, Controls, Status, Timer, Empty, Section (+ проміжно Chip & Tag); дайджести в `snapshots/`. Структура файлу: Forms → `Input` + `Controls`, Loader → `Spinner`, Section-title → `Heading` (Molecules), Page → `Layout`, Image → Atoms, Thumb → Molecules, Breadcrumbs і Fader прибрані; `Button/Link` → `Button/Text`. Знімок у git — дайджест (хеші шарів), зміни — режимом `BASELINE`. Сім конвенцій на підтвердження — `open-questions.md`.
- 2026-10-21 — **режим навчання**: `learning-workflow.md`, шаблон `components/_template.md`, реєстр `component-registry.md`, скрипти `snapshot-component.js` / `snapshot-diff.py`, тека `snapshots/`. Команда освіжає компоненти — Claude знімає, порівнює і документує, не правлячи файл.
- 2026-10-21 — **перейменування в Wanda X**: проєкт, репо `OzerovAndrey/Wanda-X`, скіл `wanda-x-design-system`, назви у всіх файлах.
- 2026-10-21 — **відкат Chips/Tag**: нові набори `Chip` і `Tag`, їхні 42 змінні та файли (`components/chip.md`, `tag.md`, `tokens/chip.*`, `tokens/tag.*`) прибрано; `contextual/chips/normal/*` відновлено, старий `Chips` перепривʼязано; сторінка знову `↳ Chips & Tags`. Правила (Section, Inverted, однина, свіжі токени) лишаються.
- 2026-10-21 — Chip: група `base` прибрана (`contextual.chip.*`, `contextual.chip-invert.*`); стара `contextual.chips.normal.*` видалена з Token Studio і Figma після перевірки всього файлу. `border-radius.chips` лишається — його бере осиротілий `Chips/Default/Static` (126 інстансів).
- 2026-10-21 — правило «назви в однині»: `Chips` → `Chip` (набір, Section, сторінка `↳ Chip & Tag`, токени `chip.*`, `contextual.chip.*`, власний `border-radius.chip`); `components/chips.md` → `chip.md`.
- 2026-10-21 — правило «свіжі токени»: щоразу питати архів JSON з Token Studio; `tokens/system/` оновлено (+57 / −3 / ~1 у component кожного бренду), скрипт `scripts/tokens-diff.py`.
- 2026-10-21 — Chips і Tag перескладено за еталоном Anchor (State × Inverted, токени `contextual.<c>.base[-invert]`, сіра Section); Tag — один компонент з іконкою `close`, без окремої кнопки.
- 2026-10-21 — правила: Section сіра `#BBBBBB` (еталон — Section `Anchor`); `Inverted` обов'язковий для всіх компонентів (`naming.md`, DoD, `rebuild-workflow.md`).
- 2026-10-19 — Anchor: кольори з alias semantic, структура «в рядок», Inverted, іконка = текст, змінні перестворено після Export.
- 2026-10-19 — аудит файлу (`audit-2026-10-19.md`), створено скіл. Перший перескладений компонент — `Anchor` (`references/components/anchor.md`), на ньому відпрацьовано `rebuild-workflow.md`.
