import type { FC } from "react";
import type { ProgressBarProps } from "../../models/app-models";
import './ProgressBar.css';

export const ProgressBar: FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const progressPercentage = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;
    return (
        <div className="progress-bar-container" data-testid="progress-bar-container">
            <div
                className="progress-bar"
                data-testid="progress-bar"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    );
};