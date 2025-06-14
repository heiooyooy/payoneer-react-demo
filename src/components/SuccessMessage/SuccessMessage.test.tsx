import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SuccessMessage } from './SuccessMessage';
import type { SuccessMessageProps } from '../../models/app-models';

const renderComponent = (props: SuccessMessageProps) => {
    return render(<SuccessMessage {...props} />);
};

describe('SuccessMessage Component', () => {
    it('should render the heading', () => {
        renderComponent({ name: 'Darren' });
        const heading = screen.getByRole('heading', { name: /registration successful/i });
        expect(heading).toBeInTheDocument();
    });

    it('should display the name', () => {
        const testName = 'Darren';
        renderComponent({ name: testName });
        const welcomeMessage = screen.getByText(new RegExp(`Welcome, ${testName}!`));
        expect(welcomeMessage).toBeInTheDocument();
    });

    it('should display a different name', () => {
        const testName = 'Jane';
        renderComponent({ name: testName });
        const welcomeMessage = screen.getByText(new RegExp(`Welcome, ${testName}!`));
        expect(welcomeMessage).toBeInTheDocument();
        expect(screen.queryByText(/welcome, darren!/i)).not.toBeInTheDocument();
    });
});
