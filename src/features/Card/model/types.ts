export interface CardData {
    id: string;
    name: string;
    childExplanation: string;
    childExample: string;
    description: string;
    syntax: string;
    adultExample: string;
}

export interface CardProps<T = CardData> {
    data: T;
    isFlipped: boolean;
    setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
    rolledOut: boolean;
}

export interface AdultDetailsProps<T extends CardData> {
    data: T;
    id?: string;
}
