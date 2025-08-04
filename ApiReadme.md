# 🚀 JS for Kids API

---

**Навигация:**

- [🏠 Главная](/)
- [🔢 Массивы](/arrays)
- [🔤 Строки](/strings)
- [🧩 Объекты](/objects)

---

🎯 Архитектура API:

```
src/shared/api/apiBase.ts (базовый слой)
├── fetchApi() - общая функция
├── fetchArrays() - для массивов
├── fetchStrings() - для строк  
└── fetchObjects() - для объектов

src/entities/
├── arrays/model/store.ts
├── strings/model/store.ts
└── objects/model/store.ts
```

🔧 Особенности реализации:

- Кэширование: Все данные сохраняются в localStorage
- Обработка ошибок: Централизованная с детальной информацией
- Loading состояния: Индикаторы загрузки для UX
- Типизация: Полная TypeScript поддержка
- Персистентность: Данные сохраняются между сессиями