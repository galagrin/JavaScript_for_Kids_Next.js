import React, { useState } from 'react';
import { ApiTypes } from 'types/apiTypes';

import styles from './Card.module.css';

interface CardProps {
    data: ApiTypes;
    isFlipped: boolean;
    setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Card = ({ data, isFlipped, setIsFlipped }: CardProps) => {

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={styles.scene}>
            <div className={`${styles.card} ${isFlipped ? styles['is-flipped'] : ''}`} onClick={handleClick}>
                <div className={`${styles['card__face']} ${styles['card__face--front']}`}>{data.name}</div>
                <div className={`${styles['card__face']} ${styles['card__face--back']}`}>
                    <div>{data.childExplanation}</div>
                    <div>{data.childExample}</div>
                </div>
            </div>
        </div>
    );
};
