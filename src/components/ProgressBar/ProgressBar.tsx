import type { FC } from "react";
import type { ProgressBarProps } from "../../models/app-models";
import './ProgressBar.css';

export const ProgressBar: FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    return (
        <div className="progress-bar-container">
            <div
                className="progress-bar"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    );
};