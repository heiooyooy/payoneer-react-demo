import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressBar } from './ProgressBar';
import type { ProgressBarProps } from '../../models/app-models';

const renderComponent = (props: ProgressBarProps) => {
    return render(<ProgressBar {...props} />);
};

describe('ProgressBar Component', () => {
    it('should render the progress bar container and the inner bar', () => {
        renderComponent({ currentStep: 1, totalSteps: 4 });
        expect(screen.getByTestId('progress-bar-container')).toBeInTheDocument();
        expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    });

    it('should calculate the width as 0%', () => {
        renderComponent({ currentStep: 1, totalSteps: 4 });
        const progressBar = screen.getByTestId('progress-bar');
        expect(progressBar).toHaveStyle('width: 0%');
    });

    it('should calculate the width as 100%', () => {
        renderComponent({ currentStep: 4, totalSteps: 4 });
        const progressBar = screen.getByTestId('progress-bar');
        expect(progressBar).toHaveStyle('width: 100%');
    });

    it('should calculate the width correctly for an intermediate step', () => {
        renderComponent({ currentStep: 3, totalSteps: 5 });
        const progressBar = screen.getByTestId('progress-bar');
        expect(progressBar).toHaveStyle('width: 50%');
    });
});
