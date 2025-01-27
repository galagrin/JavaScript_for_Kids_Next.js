import { IconContext } from 'react-icons';
import { CgArrowLeftO, CgArrowRightO } from 'react-icons/cg';

interface ArrowButtonProps {
    onClick: () => void;
    className?: string;
}
export const ArrowButtonLeft = ({ onClick, className }: ArrowButtonProps) => {
    return (
        <IconContext.Provider value={{ size: '2em' }}>
            <div>
                <CgArrowLeftO
                    onClick={onClick}
                    className="text-gray-500 transition-transform duration-200 hover:text-[#FDE69C] hover:scale-110 active:scale-90"
                />
            </div>
        </IconContext.Provider>
    );
};

export const ArrowButtonRight = ({ onClick }: ArrowButtonProps) => {
    return (
        <IconContext.Provider value={{ size: '2em' }}>
            <div>
                <CgArrowRightO
                    onClick={onClick}
                    className="text-gray-500 transition-transform duration-200 hover:text-[#FDE69C] hover:scale-110 active:scale-90"
                />
            </div>
        </IconContext.Provider>
    );
};
