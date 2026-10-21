# Знімки компонентів (дайджести)

Результат `scripts/snapshot-component.js` з `DIGEST=true` — по одному файлу на компонент (`<component>.json`, kebab-case, однина; набори одного компонента разом).
Дайджест = властивості наборів повністю + хеш (FNV-1a від канонічного JSON) атрибутів кожного шару в кожному варіанті. Значень у ньому немає — їх показує скрипт у режимі `BASELINE` (вставити вміст файла в константу), або опис у `references/components/<c>.md`.
Перезаписується при кожному вивченні; попередня версія — в історії git (`scripts/snapshot-diff.py snapshots/<c>.json` порівнює з нею).
Порядок роботи — `.claude/skills/wanda-x-design-system/references/learning-workflow.md`.
