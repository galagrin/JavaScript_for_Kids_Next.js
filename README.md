# JS для детей

Это проект на Next.js для обучения детей основам JavaScript.

## Начало работы

Сначала установите зависимости:

```bash
npm install
```

Затем запустите сервер разработки:

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере, чтобы увидеть результат.

## Скрипты

- `dev`: Запускает приложение в режиме разработки
- `build`: Собирает приложение для продакшена
- `start`: Запускает собранное приложение в продакшен-режиме
- `lint`: Запускает линтер

## Зависимости

- Next.js
- React
- React DOM
- Zustand (для управления состоянием)
- Axios (для API-запросов)
- Next-theme для переключения цветовой темы

## Зависимости для разработки

- TypeScript
- Tailwind CSS
- Prettier (с плагином @trivago/prettier-plugin-sort-imports)

## API

Проект использует внешний API, расположенный по адресу https://jsapi-alpha.vercel.app. В API устанавлилены заголовки для разрешения кросс-доменных запросов. Это позволяет  принимать запросы с других доменов, принимает GET запросы. Данный API предоставляет несколько маршрутов:

- `/random-array`: Возвращает описание и пример случайного метода массивов
- `/all-arrays`: Возвращает все доступные методы массивов в JS c описанием
- `/strings`: Возвращает данные, связанные с работой со строками в JS
- `/objects`: Возвращает данные, связанные с рабботой с объектами в JS

## TypeScript

Этот проект использует TypeScript. Типы для ответов API определены в файле `types/api.ts`.

## Стилизация

Для стилизации используется Tailwind CSS. Конфигурация находится в файле `tailwind.config.js`.
