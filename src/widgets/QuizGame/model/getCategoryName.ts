export function getCategoryName(category: string): string {
    const categoryNames: Record<string, string> = {
        arrays: 'Массивы',
        strings: 'Строки',
        objects: 'Объекты',
        dates: 'Даты',
        promises: 'Промисы',
        numbers: 'Числа',
        datatypes: 'Типы данных',
    };
    return categoryNames[category] || category;
}
