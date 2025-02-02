interface ProgressBarProps {
    value: number;
    max: number;
}
export const ProgressBar = ({ value, max }: ProgressBarProps) => {
    return (
        <div className="w-[350px] bg-[#eee] border rounded-3xl ">
            <div
                className="h-5 bg-[#FDE38C] duration-500 ease-in-out border rounded-3xl "
                style={{ width: `${(value / max) * 100}%` }}
            ></div>
        </div>
    );
};
