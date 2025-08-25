# 🚀 JS for Kids API

🎯 Архитектура API:

```
src/shared/api/apiBase.ts (базовый слой)
├── fetchApi() - общая функция
├── fetchArrays() - для массивов
├── fetchStrings() - для строк  
├── fetchObjects() - для объектов
├── fetchDates() - для дат
├── fetchPromises() - для промисов
├── fetchNumbers() - для чисел
└── fetchDataTypes() - для типов данных

src/entities/
├── arrays/model/store.ts
├── strings/model/store.ts
├── objects/model/store.ts
├── dates/model/store.ts
├── promises/model/store.ts
├── numbers/model/store.ts
└── datatypes/model/store.ts
```

🔧 Особенности реализации:

- Кэширование: Все данные сохраняются в localStorage
- Обработка ошибок: Централизованная с детальной информацией
- Loading состояния: Индикаторы загрузки для UX
- Типизация: Полная TypeScript поддержка
- Персистентность: Данные сохраняются между сессиями

📡 Доступные эндпоинты:

- `/all-arrays` - методы массивов
- `/strings` - методы строк
- `/objects` - методы объектов
- `/date` - работа с датами
- `/promise` - промисы и асинхронность
- `/number` - работа с числами
- `/datatypes` - типы данных JavaScript