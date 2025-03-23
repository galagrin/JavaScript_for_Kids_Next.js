import { CardProps } from '../model/types';

import styles from './Card.module.scss';

export const Card = ({ data, isFlipped, setIsFlipped, rolledOut }: CardProps) => {
    const handleSpeak = () => {
        const speech = new SpeechSynthesisUtterance(data.childExplanation);
        speech.lang = 'ru-RU'; // Устанавливаем язык на русский
        window.speechSynthesis.speak(speech); // Произносим текст
    };
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`${styles.scene} ${rolledOut ? styles['roll-out'] : ''}`}>
            <div className={`${styles.card} ${isFlipped ? styles['is-flipped'] : ''}`} onClick={handleClick}>
                <div className={`${styles['card__face']} ${styles['card__face--front']}`}>{data.name} ()</div>
                <div className={`${styles['card__face']} ${styles['card__face--back']}`}>
                    <div>{data.childExplanation}</div>
                    <div>{data.childExample}</div>
                </div>
            </div>
            <button onClick={handleSpeak}>Озвучить</button>
        </div>
    );
};
