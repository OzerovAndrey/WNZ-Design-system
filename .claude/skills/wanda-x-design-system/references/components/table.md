# Table — інвентаризація та план універсального компонента

Статус: **інвентаризація (2026-10-23), збірку не розпочато** — чекає рішень Андрея (розділ «Питання»).
Сторінка: `↳ Table -` (`78083:324361`).

## 1. Що лежить на сторінці `↳ Table -`
Лише продуктові набори (правило 11 — не ДС), жодного базового Table:

| Набір | Node | Варіанти | Що це |
|---|---|---|---|
| `Hall-of-fame / Table` | `48681:1133800` | `Type=Mobile(320-767) \| Desktop&Tablet(768-1920)` | хедер колонок + 9 рядків-карток (місце, гравець, статус-медаль, гра з thumb, сума), рядок поточного гравця підсвічений |
| `[M] Hall-of-fame / Player-number` | `48912:27815` | `Device × Type`, Boolean talisman | рядок лідерборду |
| `Hall-of-fame / Player-number-states` | `48912:28700` | `State=Default \| Current user` × `Device` | стани рядка |
| `transactions table item` | `48364:61133` | `state=hover \| default` | рядок-картка транзакції: шеврон, іконка, 2-рядковий текст, статус, сума + метод, kebab |
| `transactions table group` | `48539:44574` | `Property 1=Variant2` | розкрита група: ID, статус, сума, kebab + підрядок |
| `Welcome_bonus_row` | `33250:316385` | `Type=default \| bottom` | 2 колонки, розділювач між рядками |
| `Welcome_bonus_column` | `33250:316359` | — | заголовок + хедер колонок `Deposit / Bonus` + 3 рядки |

## 2. Таблиці поза сторінкою Table (не зібрані)
| Де | Набір / фрейм | Node | Тип |
|---|---|---|---|
| Tournaments + / Lottery + / Races + | `tourmanents / lottery leader table` | `68537:202555` | лідерборд на темній плашці, смугасті рядки, місце-медаль, поточний гравець — акцент |
| Tournaments + | `Table Header Lottery` (`Device=mobile\|desktop`) | `67722:62201` | хедер колонок `№ / Player / Sum` |
| Tournaments + | ` Tournaments / players, places` (`place=gold\|silver\|bronze`, `device`) | `67718:61873` | рядки топ-3 |
| Profile + | `Time limit history` / `table row` | `32979:1001414`, `32979:1001665` | 3 колонки без розділювачів, комірки 2-рядкові; empty state |
| Profile + | `Loyalty points history item` / `table item points exchange history` | `32979:1004457`, `32979:1004591` | рядок з розділювачем, шеврон, **розкривається** панеллю деталей |
| Profile + | `Betting history item`, `bet history mob item`, `Bets history content` | `32979:1004232`, `32979:1004742`, `34118:949048` | рядок з розкриттям (express), кнопка Cashout, статус Win/Loss |
| Cashbox (s2p) | `Payment history item` (8v), `transactions table group item mobile` | `48642:130910`, `48655:56422` | те саме, що `transactions table *` (дубль) |
| FAQ, Rules, Statistics + | фрейм `Tables`, `Accordion-content / Table-head` | `49705:48928`, `49622:53929` | класична сітка з хедером і розділювачами (4 колонки; та 2 колонки з медаллю) |
| Ingame + | `table row` (2v), `cell igame additional`, `thead cell igame additional` | `63335:462804`, `30827:106137`, `30827:106138` | рядок лідерборду в грі; комірки й хедер — сироти (головний компонент без сторінки) |
| Wheel of Fortune + | `spin history` | `61849:5540` | рядок історії на темній плашці |
| Achievements + | `Achivments table` | `68586:48661` | **не таблиця** (картка) — виключити |

## 3. Спільна анатомія (кандидат на універсальний компонент)
- **`Table`** — контейнер: необов'язковий `Table/Header` + SLOT `Rows` (preferred — `Table/Row`).
- **`Table/Header`** — рядок назв колонок (текст secondary, sm).
- **`Table/Row`** — горизонтальний рядок комірок. Варіанти, що реально зустрічаються:
  - `Style = Card | Divider | Plain` (картка з заливкою і радіусом та gap між рядками / лінія між рядками / без меж);
  - `State = Default | Hover | Current` (Current — рядок поточного гравця) + `Open` для рядків з деталями (панель під рядком — слот).
- **`Table/Cell`** — комірка; типи контенту: `Text`, `Text + Subtext` (2 рядки, мобільне згортання колонок), `Place` (номер / медаль), `Icon + Text`, `Thumb + Text`, `Status`, `Amount` (праворуч), `Action` (kebab / кнопка), `Chevron`.
- Мобільна версія = ті самі комірки в режимі `Text + Subtext`, без окремих Device-варіантів (`naming.md` → пристрій ≠ варіант).

## 4. Питання до Андрея (блокують збірку)
1. Сторінка Table містить не всі варіанти — переносимо на неї знайдені в п. 2 (у Section `Originals`) чи збираємо універсальний компонент одразу з усіх джерел?
2. Обсяг: які з типів п. 2 входять у Table, а які лишаються окремими (Betting history з Cashout, Transactions з групами — скоріше `List`/Accordion-патерн)?
3. Inverted: лідерборд турнірів і spin history стоять на темній плашці — робимо `Inverted` у `Table/Row` / `Table/Header`?
4. Розкриття рядка (`State=Open` + панель деталей) — частина `Table/Row` чи окремий компонент?
</content>
</invoke>
