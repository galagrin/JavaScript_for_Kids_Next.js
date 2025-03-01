import { ArrayMethod } from '@/entities/arrays/model/types';

export interface CardProps {
    data: ArrayMethod;
    isFlipped: boolean;
    setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
    rolledOut: boolean;
}
