import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AccountStep } from './AccountStep';
import type { AppFormData, FormErrors, StepProps } from '../../models/app-models';
import { initialMockData } from '../../tests/mockData';

const mockSetData = vi.fn();

const renderComponent = (props: Partial<StepProps> = {}) => {
    const defaultProps: StepProps = {
        data: initialMockData,
        setData: mockSetData,
        errors: {},
        ...props,
    };
    return render(<AccountStep {...defaultProps} />);
};

describe('AccountStep Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render email and password', () => {
        renderComponent();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('should display initial values', () => {
        const dataWithValues: AppFormData = {
            ...initialMockData,
            email: 'test@example.com',
        };
        renderComponent({ data: dataWithValues });

        expect(screen.getByLabelText(/email address/i)).toHaveValue('test@example.com');
    });

    it('should call setData', async () => {
        const user = userEvent.setup();
        renderComponent();

        const emailInput = screen.getByLabelText(/email address/i);
        await user.type(emailInput, 'user@test.com');

        expect(mockSetData).toHaveBeenCalled();
    });

    it('should display an error message', () => {
        const mockErrors: FormErrors = { email: 'Please enter a valid email.' };
        renderComponent({ errors: mockErrors });
        expect(screen.getByText('Please enter a valid email.')).toBeInTheDocument();
    });

    it('should not display the password strength indicator when the password is empty', () => {
        renderComponent();
        expect(screen.queryByText(/weak|medium|strong/i)).not.toBeInTheDocument();
    });

    it('should display "Weak" for passwords shorter than 8 characters', async () => {
        const dataWithWeakPassword = { ...initialMockData, password: '123' };
        renderComponent({ data: dataWithWeakPassword });

        expect(await screen.findByText(/weak/i)).toBeInTheDocument();
    });

    it('should display "Medium" for passwords between 8 and 11 characters', async () => {
        const dataWithMediumPassword = { ...initialMockData, password: 'password' }; // 8 chars
        renderComponent({ data: dataWithMediumPassword });

        expect(await screen.findByText(/medium/i)).toBeInTheDocument();
    });

    it('should display "Strong" for passwords 12 characters or longer', async () => {
        const dataWithStrongPassword = { ...initialMockData, password: 'a-very-strong-password' };
        renderComponent({ data: dataWithStrongPassword });

        expect(await screen.findByText(/strong/i)).toBeInTheDocument();
    });
});
