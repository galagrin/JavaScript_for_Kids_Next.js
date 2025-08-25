import { CardData, CardProps } from '../model/types';

import styles from './Card.module.scss';

// Функция для форматирования текста
const formatExample = (example: string) => {
    return example.split(';').map((line, index) => (
        <div key={index}>{line.trim()}</div> // Удаляем лишние пробелы и создаем новый div для каждой строки
    ));
};

export const Card = ({ data, isFlipped, setIsFlipped, rolledOut }: CardProps<CardData>) => {
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`${styles.scene} ${rolledOut ? styles.rollOut : ''}`}>
            <div 
                className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`} 
                onClick={handleClick}
                role="button"
                tabIndex={0}
                aria-label={`${isFlipped ? 'Скрыть' : 'Показать'} детали метода ${data.name}`}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsFlipped(!isFlipped);
                    }
                }}
            >
                <div className={`${styles.cardFace} ${styles.cardFaceFront}`}>{data.name} ()</div>
                <div className={`${styles.cardFace} ${styles.cardFaceBack}`}>
                    <div>{data.childExplanation}</div>
                    <pre className={styles.codeBlock}>
                        <code>{formatExample(data.childExample)}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
};
