import React, { useState } from 'react';

import styles from './Card.module.css';

export const Card = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={styles.scene}>
            <div className={`${styles.card} ${isFlipped ? styles['is-flipped'] : ''}`} onClick={handleClick}>
                <div className={`${styles['card__face']} ${styles['card__face--front']}`}>front</div>
                <div className={`${styles['card__face']} ${styles['card__face--back']}`}>back</div>
            </div>
        </div>
    );
};
