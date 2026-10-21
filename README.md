# Wanda X Design system

Робочий репозиторій команди для очистки Figma-файлу **[Wanda X] Design system** (`3MbdWPLOGBjBj92Y3EnPYN`, бренди MB / XON).

## Структура

```
.claude/skills/wanda-x-design-system/   # Claude skill — правила, еталони, DoD, скрипт аудиту
├── SKILL.md
└── references/
    ├── reference-components.md
    ├── naming.md
    ├── tokens.md
    ├── definition-of-done.md
    ├── audit-script.md
    ├── audit-2026-10-19.md
    └── layouts.md
reports/                            # звіти аудитів, по одному файлу на дату
└── audit-2026-10-19.md
```

## Як користуватись
- **Claude Code**: відкрити репо — скіл з `.claude/skills/` підхоплюється автоматично.
- **Claude app**: заархівувати `.claude/skills/wanda-x-design-system` у zip і завантажити як skill.

## Правила оновлення
- Компонент став Ready for dev → список у `SKILL.md` + рядок у беклозі.
- Нове правило → відповідний `references/*.md`, не `SKILL.md`.
- Повторний аудит → новий `reports/audit-YYYY-MM-DD.md`; беклог у `references/` оновити на актуальний.
