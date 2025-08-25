import { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { CgArrowLeftO, CgArrowRightO } from 'react-icons/cg';

import styles from './ArrowButton.module.scss';

interface ArrowButtonProps {
    onClick: () => void;
    direction: 'Left' | 'Right';
}

export const ArrowButton = ({ onClick, direction }: ArrowButtonProps) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === `Arrow${direction}`) {
                onClick();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClick, direction]);

    const Icon = direction === 'Left' ? CgArrowLeftO : CgArrowRightO;
    
    return (
        <IconContext.Provider value={{ size: '2em' }}>
            <div>
                <Icon onClick={onClick} className={styles.arrowButton} />
            </div>
        </IconContext.Provider>
    );
};
