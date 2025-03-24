export interface CardData {
    name: string;
    childExplanation: string;
    childExample: string;
}

export interface CardProps<T = CardData> {
    data: T;
    isFlipped: boolean;
    setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
    rolledOut: boolean;
}
