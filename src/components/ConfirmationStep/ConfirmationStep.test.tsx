import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConfirmationStep } from './ConfirmationStep';
import type { ConfirmationStepProps } from '../../models/app-models';
import { filledMockData } from '../../tests/mockData';

window.URL.createObjectURL = vi.fn((blob: Blob) => {
    return 'mock-object-url';
});


const renderComponent = (props: Partial<ConfirmationStepProps> = {}) => {
    const defaultProps: ConfirmationStepProps = {
        data: filledMockData,
        ...props,
    };
    return render(<ConfirmationStep {...defaultProps} />);
};


describe('ConfirmationStep Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render the text', () => {
        renderComponent();
        expect(screen.getByRole('heading', { name: /confirmation/i })).toBeInTheDocument();
        expect(screen.getByText(/please review your information/i)).toBeInTheDocument();
    });

    it('should display all data', () => {
        renderComponent();
        expect(screen.getByText(filledMockData.firstName)).toBeInTheDocument();
        expect(screen.getByText(filledMockData.lastName)).toBeInTheDocument();
        expect(screen.getByText(filledMockData.dob)).toBeInTheDocument();
        expect(screen.getByText(filledMockData.country)).toBeInTheDocument();
        expect(screen.getByText(filledMockData.gender)).toBeInTheDocument();
        expect(screen.getByText(filledMockData.email)).toBeInTheDocument();
    });

    it('should not display the avatar image', () => {
        renderComponent({ data: { ...filledMockData, avatar: null } });
        expect(screen.queryByRole('img', { name: /avatar/i })).not.toBeInTheDocument();
    });

    it('should display the avatar image', () => {
        const mockFile = new File(['dummy-content'], 'avatar.png', { type: 'image/png' });
        renderComponent({ data: { ...filledMockData, avatar: mockFile } });
        const avatarImage = screen.getByRole('img', { name: /avatar/i });
        expect(avatarImage).toBeInTheDocument();
        expect(window.URL.createObjectURL).toHaveBeenCalledWith(mockFile);
        expect(avatarImage).toHaveAttribute('src', 'mock-object-url');
    });
});
