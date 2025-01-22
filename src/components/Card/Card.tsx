import React, { useState } from 'react';
import { ApiTypes } from 'types/apiTypes';

import styles from './Card.module.css';

interface CardProps {
    data: ApiTypes;
}
export const Card = ({ data }: CardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={styles.scene}>
            <div className={`${styles.card} ${isFlipped ? styles['is-flipped'] : ''}`} onClick={handleClick}>
                <div className={`${styles['card__face']} ${styles['card__face--front']}`}>{data.name}</div>
                <div className={`${styles['card__face']} ${styles['card__face--back']}`}>
                    <div>{data.description}</div>
                </div>
            </div>
        </div>
    );
};
