import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BasicInfoStep } from './BasicInfoStep';
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
    return render(<BasicInfoStep {...defaultProps} />);
};


describe('BasicInfoStep Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render all fields', () => {
        renderComponent();
        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
    });

    it('should display the initial values', () => {
        const dataWithValues: AppFormData = {
            ...initialMockData,
            firstName: 'Darren',
            lastName: 'Tu',
        };
        renderComponent({ data: dataWithValues });
        expect(screen.getByLabelText(/first name/i)).toHaveValue('Darren');
        expect(screen.getByLabelText(/last name/i)).toHaveValue('Tu');
    });

    it('should call the setData function', async () => {
        const user = userEvent.setup();
        renderComponent();
        const firstNameInput = screen.getByLabelText(/first name/i);
        await user.type(firstNameInput, 'John');
        expect(mockSetData).toHaveBeenCalled();
    });

    it('should display an error message', () => {
        const mockErrors: FormErrors = {
            firstName: 'First name is required.',
        };
        renderComponent({ errors: mockErrors });
        expect(screen.getByText('First name is required.')).toBeInTheDocument();
    });

    it('should not display an error message if it does not exist', () => {
        renderComponent(); 
        const errorMessage = screen.queryByText('First name is required.');
        expect(errorMessage).not.toBeInTheDocument();
    });
});
