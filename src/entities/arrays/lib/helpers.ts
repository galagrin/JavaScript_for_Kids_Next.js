import { ArrayMethod } from '../model/types';

export const sortArrayMethodsByName = (methods: ArrayMethod[]) => {
    return [...methods].sort((a, b) => a.name.localeCompare(b.name));
};

export const filterArrayMethodsByKeyword = (methods: ArrayMethod[], keyword: string) => {
    return methods.filter(
        (method) =>
            method.name.toLowerCase().includes(keyword.toLowerCase()) || method.description.toLowerCase().includes(keyword.toLowerCase())
    );
};
