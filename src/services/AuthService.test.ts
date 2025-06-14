// File: src/services/AuthService.test.ts

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from './AuthService';
import { filledMockData } from '../tests/mockData';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('AuthService', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When use mock', () => {
        it('should fetch the success', async () => {
            const mockSuccessResponse = { success: true };
            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => mockSuccessResponse,
            });
            const result = await AuthService.submitRegistration(filledMockData);
            expect(mockFetch).toHaveBeenCalledWith('/mock-api/mock-success.json');
            expect(result).toEqual({ success: true });
        });

        it('should return success', async () => {
            mockFetch.mockResolvedValue({
                ok: false, 
            });

            const result = await AuthService.submitRegistration(filledMockData);
            expect(mockFetch).toHaveBeenCalledWith('/mock-api/mock-success.json');
            expect(result).toEqual({ success: false, error: 'Failed to load mock data.' });
        });

        it('should return false if the mock file contains invalid JSON', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => { throw new SyntaxError('Invalid JSON'); },
            });
            const result = await AuthService.submitRegistration(filledMockData);
            expect(result).toEqual({ success: false, error: 'Failed to load mock data.' });
        });
    });
});
