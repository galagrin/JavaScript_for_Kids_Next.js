import styles from './Card.module.scss';
import { ArrayMethod } from '@/entities/arrays/model/types';

interface CardProps {
    data: ArrayMethod;
    isFlipped: boolean;
    setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
    rolledOut: boolean;
}
export const Card = ({ data, isFlipped, setIsFlipped, rolledOut }: CardProps) => {
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
        </div>
    );
};
