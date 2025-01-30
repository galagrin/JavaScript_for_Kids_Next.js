import { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { CgArrowLeftO, CgArrowRightO } from 'react-icons/cg';

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
    }, [onClick]);

    const Icon = direction === 'Left' ? CgArrowLeftO : CgArrowRightO;
    return (
        <IconContext.Provider value={{ size: '2em' }}>
            <div>
                <Icon
                    onClick={onClick}
                    className="text-gray-500 transition-transform duration-200 hover:text-[#FDE69C] hover:scale-110 active:scale-90"
                />
            </div>
        </IconContext.Provider>
    );
};

// export const ArrowButtonRight = ({ onClick }: ArrowButtonProps) => {
//     useEffect(() => {
//         const handleArrowRight = (event: KeyboardEvent) => {
//             if (event.key === 'ArrowRight') {
//                 onClick();
//             }
//         };
//         document.addEventListener('keydown', handleArrowRight);
//         return () => {
//             document.removeEventListener('keydown', handleArrowRight);
//         };
//     }, [onClick]);
//     return (
//         <IconContext.Provider value={{ size: '2em' }}>
//             <div>
//                 <CgArrowRightO
//                     onClick={onClick}
//                     className="text-gray-500 transition-transform duration-200 hover:text-[#FDE69C] hover:scale-110 active:scale-90"
//                 />
//             </div>
//         </IconContext.Provider>
//     );
// };
