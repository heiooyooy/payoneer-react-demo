import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

window.URL.createObjectURL = vi.fn(() => 'mock-url-for-avatar');

describe('App Component Workflow', () => {
    it('should render the first step', () => {
        render(<App />);
        expect(screen.getByRole('heading', { name: /basic information/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
    });

    it('should show validation errors', async () => {
        const user = userEvent.setup();
        render(<App />);

        const nextButton = screen.getByRole('button', { name: /next/i });
        await user.click(nextButton);

        expect(await screen.findByText('First name is required.')).toBeInTheDocument();
        expect(screen.getByText('Last name is required.')).toBeInTheDocument();
        expect(screen.getByText('Date of birth is required.')).toBeInTheDocument();
    });

    it('should navigate to Step 2', async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.type(screen.getByLabelText(/first name/i), 'Darren');
        await user.type(screen.getByLabelText(/last name/i), 'Tu');
        await user.type(screen.getByLabelText(/date of birth/i), '1990-01-01');

        const nextButton = screen.getByRole('button', { name: /next/i });
        await user.click(nextButton);

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /details/i })).toBeInTheDocument();
        });
        expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    });
});
