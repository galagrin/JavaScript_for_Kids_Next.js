# 🧪 Тестирование 


## 📋 Обзор тестирования

Проект использует стек для тестирования:
- **Jest** - основной фреймворк для тестирования
- **React Testing Library** - для тестирования React компонентов
- **@testing-library/user-event** - для симуляции пользовательских действий
- **@testing-library/jest-dom** - дополнительные матчеры для DOM

## 🔧 Конфигурация

### Jest конфигурация (`jest.config.js`)
```javascript
- testEnvironment: 'jest-environment-jsdom' 
- setupFilesAfterEnv: ['<rootDir>/jest.setup.js'] // Глобальная настройка
- moduleNameMapper: Поддержка алиасов (@/) и CSS модулей
```

### Глобальная настройка (`jest.setup.js`)
- Импорт `@testing-library/jest-dom` для расширенных матчеров
- Моки для Next.js (router, navigation, image)
- Моки для браузерных API (matchMedia, IntersectionObserver, ResizeObserver)

## 📊 Скрипты для тестирования

```bash
npm test              # Запуск всех тестов
npm run test:watch    # Запуск в watch режиме
npm run test:coverage # Запуск с отчетом покрытия
npm run test:ci       # Запуск для CI/CD
```

## 🗂️ Структура тестов

### 1. 🏪 Тесты сторов (Zustand)

Все сторы находятся в `src/entities/*/model/store.ts` и имеют соответствующие тесты в `src/entities/*/model/__tests__/*.test.ts`:

#### ✅ Arrays Store (`src/entities/arrays/model/__tests__/store.test.ts`)
- **6 тестов** - полное покрытие с кэшированием
- Тестирует: начальное состояние, загрузку данных, обработку ошибок, кэширование, принудительное обновление
- Особенности: включает тестирование кэша с `lastFetchTime` и `cacheExpiry`

#### ✅ Strings Store (`src/entities/strings/model/__tests__/stringStore.test.ts`)
- **4 теста** - базовое покрытие
- Тестирует: начальное состояние, загрузку данных, обработку Error и не-Error ошибок

#### ✅ DataTypes Store (`src/entities/datatypes/model/__tests__/datatypesStore.test.ts`)
- **4 теста** - базовое покрытие
- Тестирует: начальное состояние, загрузку данных, обработку Error и не-Error ошибок

#### ✅ Objects Store (`src/entities/objects/model/__tests__/objectsStore.test.ts`)
- **4 теста** - базовое покрытие
- Тестирует: начальное состояние, загрузку данных объектов, обработку Error и не-Error ошибок

#### ✅ Numbers Store (`src/entities/numbers/model/__tests__/numbersStore.test.ts`)
- **4 теста** - базовое покрытие  
- Тестирует: начальное состояние, загрузку данных чисел, обработку Error и не-Error ошибок

#### ✅ Dates Store (`src/entities/dates/model/__tests__/datesStore.test.ts`)
- **4 теста** - базовое покрытие
- Тестирует: начальное состояние, загрузку данных дат, обработку Error и не-Error ошибок

#### ✅ Promises Store (`src/entities/promises/model/__tests__/promisesStore.test.ts`)
- **4 теста** - базовое покрытие
- Тестирует: начальное состояние, загрузку данных промисов, обработку Error и не-Error ошибок

#### ✅ Quiz Store (`src/entities/quiz/model/__tests__/quizStore.test.ts`)
- **13 тестов** - расширенное покрытие игровой логики
- Тестирует:
  - Начальное состояние (11 свойств)
  - Загрузку методов из всех категорий
  - Обработку частичных ошибок при загрузке
  - Запуск игры и генерацию вопросов
  - Выбор правильных/неправильных ответов
  - Завершение игры по лимиту вопросов (MAX_QUESTIONS = 2)
  - Переход к следующему вопросу
  - Сброс игры к начальному состоянию
  - Защиту от повторного ответа
  - Обработку пустого списка методов

### 2. 🧩 Тесты компонентов

#### ✅ NavLink Component (`src/entities/navlink/ui/__tests__/NavLink.test.tsx`)
- **8 тестов** - тестирование навигационного компонента
- Тестирует:
  - Рендеринг с правильными href и children
  - Добавление active класса при точном совпадении (exact=true)
  - Добавление active класса при частичном совпадении (exact=false)
  - Работу без className
  - Обработку onClick событий
  - Обработку null pathname
  - Передачу дополнительных props

#### ✅ NavigationMenu Component (`src/features/navigation/ui/__tests__/NavigationMenu.test.tsx`)
- **7 тестов** - тестирование мобильного меню
- Тестирует:
  - Рендеринг без ошибок
  - Открытие/закрытие меню по клику
  - Закрытие меню по Escape
  - Закрытие меню при клике вне области
  - Сохранение открытого состояния при клике внутри
  - Правильную очистку event listeners при размонтировании

#### ✅ Card Component (`src/features/Card/ui/__tests__/Card.test.tsx`)
- **25 тестов** - комплексное тестирование интерактивной карточки
- Тестирует:
  - **Рендеринг (6 тестов)**:
    - Корректное отображение данных (name, childExplanation, childExample)
    - Форматирование примеров кода функцией `formatExample`
    - Применение CSS классов `rollOut` и `isFlipped` в зависимости от состояний
  - **Интерактивность (6 тестов)**:
    - Переключение состояния по клику мыши
    - Навигация с клавиатуры (Enter, Space)
    - Игнорирование ненужных клавиш (Escape, Tab)
    - Корректное переключение между состояниями true/false
  - **Доступность (4 теста)**:
    - Корректный `role="button"` для screen readers
    - `tabIndex=0` для навигации с клавиатуры
    - Динамические `aria-label` в зависимости от состояния карточки
  - **Функция formatExample (4 теста)**:
    - Разделение строк по точке с запятой
    - Обработка строк без разделителей
    - Удаление лишних пробелов
    - Обработка пустых строк
  - **Краевые случаи (3 теста)**:
    - Обработка пустых данных
    - Длинные названия методов
    - Специальные символы в примерах
  - **Интеграционные тесты (2 теста)**:
    - Полный сценарий взаимодействия пользователя
    - Обновление состояний компонента

### 3. ⚙️ Настройка тестирования

#### ✅ Setup Test (`src/__tests__/setup.test.tsx`)
- **3 теста** - проверка корректности настройки тестовой среды
- Тестирует:
  - Работу Jest и React Testing Library
  - Доступность jest-dom матчеров
  - Корректное мокирование CSS модулей

## 📈 Статистика покрытия

### Общие метрики
- **Всего тестовых файлов**: 12
- **Всего тестов**: 68


### Покрытие по категориям

#### Stores (8 файлов, 35 тестов)
- **Arrays Store**: 6 тестов (включая кэширование)
- **Strings Store**: 4 теста
- **DataTypes Store**: 4 теста  
- **Objects Store**: 4 теста
- **Numbers Store**: 4 теста
- **Dates Store**: 4 теста
- **Promises Store**: 4 теста
- **Quiz Store**: 13 тестов (самый сложный)

#### Components (3 файла, 40 тестов)
- **NavLink**: 8 тестов
- **NavigationMenu**: 7 тестов
- **Card**: 25 тестов

#### Setup (1 файл, 3 теста)
- **Test Environment**: 3 теста

## 🎯 Паттерны тестирования

### Тестирование Zustand сторов
```typescript
// Создание тестового стора без persist middleware
const createTestStore = () => {
    return create<StoreType>()((set, get) => ({
        // Копия логики из оригинального стора
    }));
};

// Мокирование API
jest.mock('@/shared/api/apiBase', () => ({
    fetchData: jest.fn(),
}));
```

### Тестирование React компонентов
```typescript
// Мокирование зависимостей
jest.mock('next/navigation', () => ({
    usePathname: () => mockUsePathname(),
}));

// Мокирование CSS модулей для изолированного тестирования
jest.mock('../Card.module.scss', () => ({
    scene: 'scene',
    card: 'card',
    isFlipped: 'isFlipped',
    // ... другие классы
}));

// Использование user-event для интерактивности
const user = userEvent.setup();
await user.click(button);
await user.keyboard('{Enter}'); // Тестирование клавиатурной навигации
```

## 🔍 Особенности тестирования

### Stores
- **Изоляция**: Каждый тест использует свежий экземпляр стора
- **API мокирование**: Все внешние API вызовы мокируются
- **Async/Await**: Правильная обработка асинхронных операций с `act()`
- **Error Handling**: Тестирование как Error объектов, так и строковых ошибок

### Components  
- **Next.js Integration**: Полное мокирование Next.js функциональности
- **User Interactions**: Симуляция реальных пользовательских действий
- **Accessibility**: Использование семантических селекторов (getByRole)
- **Event Cleanup**: Проверка правильной очистки event listeners
- **CSS Module Testing**: Мокирование стилей для изолированного тестирования классов
- **State Management**: Тестирование компонентов с внешним состоянием (props)
- **Keyboard Navigation**: Полное покрытие клавиатурной доступности

### Card Component (специальные случаи)
- **CSS Module Mocking**: Детальное мокирование всех CSS классов для тестирования стилей
- **Text Formatting**: Тестирование функции `formatExample` с различными входными данными
- **Accessibility Testing**: Комплексное тестирование ARIA атрибутов и клавиатурной навигации
- **State Prop Testing**: Тестирование компонента с внешним состоянием через props
- **Event Handling**: Проверка обработки как mouse, так и keyboard событий
- **Edge Cases**: Тестирование граничных случаев (пустые данные, спецсимволы, длинный текст)

### Quiz Store (специальные случаи)
- **Random Logic**: Мокирование `Math.random()` и `Date.now()` для предсказуемости
- **Game Flow**: Тестирование полного игрового цикла
- **Partial Failures**: Обработка ситуаций, когда только часть API вызовов успешна
- **State Transitions**: Проверка корректных переходов между состояниями игры

## 🚀 Запуск тестов

### Все тесты
```bash
npm test
```

### Только тесты сторов
```bash
npm test -- --testPathPatterns="Store\.test\.ts"
```

### Конкретный стор
```bash
npm test -- --testPathPatterns="arrays.*store\.test\.ts"
```

### Только тесты компонентов
```bash
npm test -- --testPathPatterns="Component\.test\.(tsx|ts)"
```

### Конкретный компонент (например, Card)
```bash
npm test Card.test.tsx
```

### С покрытием кода
```bash
npm run test:coverage
```

### В режиме разработки
```bash
npm run test:watch
```


## 🎭 Моки и утилиты

### API Моки
Все API вызовы мокируются через `@/shared/api/apiBase`:
- `fetchArrays`, `fetchStrings`, `fetchObjects`, `fetchDates`
- `fetchPromises`, `fetchNumbers`, `fetchDataTypes`

### Next.js Моки
- **Router**: `useRouter`, `useSearchParams`, `usePathname`
- **Image**: Замена на простой `<img>` тег
- **Link**: Замена на простой `<a>` тег

### Browser API Моки
- **matchMedia**: Для медиа-запросов
- **IntersectionObserver**: Для lazy loading
- **ResizeObserver**: Для отслеживания изменений размеров



## 🔄 Continuous Integration

Для CI/CD используйте:
```bash
npm run test:ci
```

Этот скрипт запускает тесты без watch режима и генерирует отчет покрытия.


