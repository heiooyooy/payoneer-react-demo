import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DetailsStep } from './DetailsStep';
import type { FormErrors, StepProps } from '../../models/app-models';
import { initialMockData } from '../../tests/mockData';

const mockSetData = vi.fn();

const renderComponent = (props: Partial<StepProps> = {}) => {
    const defaultProps: StepProps = {
        data: initialMockData,
        setData: mockSetData,
        errors: {},
        ...props,
    };
    return render(<DetailsStep {...defaultProps} />);
};

describe('DetailsStep Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render dropdowns', () => {
        renderComponent();
        expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    });

    it('should call setData when a user selects a country', async () => {
        const user = userEvent.setup();
        renderComponent();

        const countrySelect = screen.getByLabelText(/country/i);
        await user.selectOptions(countrySelect, 'Canada');

        expect(mockSetData).toHaveBeenCalled();
    });

    it('should call setData when a user selects a gender', async () => {
        const user = userEvent.setup();
        renderComponent();

        const genderSelect = screen.getByLabelText(/gender/i);
        await user.selectOptions(genderSelect, 'Female');

        expect(mockSetData).toHaveBeenCalled();
    });

    it('should display error messages', () => {
        const mockErrors: FormErrors = {
            country: 'Country is required.',
            gender: 'Gender selection is required.',
        };
        renderComponent({ errors: mockErrors });

        expect(screen.getByText('Country is required.')).toBeInTheDocument();
        expect(screen.getByText('Gender selection is required.')).toBeInTheDocument();
    });
});
