import { useEffect, useState } from "react";
import * as Progress from '@radix-ui/react-progress';

export interface ProgressBarProps {
    progressPercentage: number,
    progressName: string
}

const ProgressBar = (props: ProgressBarProps) => {
    const [progress, setProgress] = useState(13);
    
    useEffect(() => {
        const timer = setTimeout(() => setProgress(props.progressPercentage), 500);
        return () => clearTimeout(timer);
    }, [])

    return (
        <div className="z-[-1]">
            <div className="flex justify-between mb-1">
                <span className="text-base font-mulish">{props.progressName}</span>
                <span className="text-sm font-mulish">{props.progressPercentage}%</span>
            </div>
            <Progress.Root className="relative rounded-full bg-gray-500 overflow-hidden w-full h-[20px]"
                style={{
                transform: 'translateZ(0)',
            }} value={progress} >
                <Progress.Indicator
                    className="bg-blue-500 w-full h-full transition-transform duration-[1500ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                    style={{ transform: `translateX(-${100 - progress}%)` }}
                />
            </Progress.Root>
        </div>
        
      );
}

export default ProgressBar;