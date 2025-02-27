import React from 'react';

import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
    value: number;
    max: number;
}

export const ProgressBar = ({ value, max }: ProgressBarProps) => {
    return (
        <div className={styles['progress-bar']}>
            {' '}
            <div className={styles['progress-fill']} style={{ width: `${(value / max) * 100}%` }}></div>
        </div>
    );
};
