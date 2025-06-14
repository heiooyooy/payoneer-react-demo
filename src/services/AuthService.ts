import type { AppFormData } from '../models/app-models';

interface ServiceResponse {
    success: boolean;
    error?: string;
}

// Use mock data for demo purpose
const USE_MOCKS = true;

const API_BASE_URL = 'https://api.example.com'; 

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const AuthService = {
    /**
     * Submits the user registration data to the backend.
     * @param formData The user's registration data.
     * @returns A promise that resolves to a ServiceResponse object.
     */
    submitRegistration: async (formData: AppFormData): Promise<ServiceResponse> => {

        if (USE_MOCKS) {
            console.log('--- MOCK MODE: Submitting registration ---');
            await sleep(1000); 

            try {
                const response = await fetch('/mock-api/mock-success.json');

                if (!response.ok) {
                    throw new Error('Mock file not found!');
                }

                const mockData: ServiceResponse = await response.json();
                console.log('--- MOCK MODE: Received response:', mockData);

                return mockData;
            } catch (error) {
                console.error("Mock fetch failed:", error);
                return { success: false, error: "Failed to load mock data." };
            }
          }


        const { avatar, ...dataToSend } = formData;

        console.log('Sending data to backend:', dataToSend);

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }
            return { success: true };

        } catch (error) {
            console.error('Submission failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
            return { success: false, error: errorMessage };
        }
    },
};
