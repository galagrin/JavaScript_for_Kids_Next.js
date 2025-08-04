import { CardData, CardProps } from '../model/types';

import styles from './Card.module.scss';

export const Card = ({ data, isFlipped, setIsFlipped, rolledOut }: CardProps<CardData>) => {

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`${styles.scene} ${rolledOut ? styles.rollOut : ''}`}>
            <div className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`} onClick={handleClick}>
                <div className={`${styles.cardFace} ${styles.cardFaceFront}`}>{data.name} ()</div>
                <div className={`${styles.cardFace} ${styles.cardFaceBack}`}>
                    <div>{data.childExplanation}</div>
                    <div>{data.childExample}</div>
                </div>
            </div>
        </div>
    );
};
