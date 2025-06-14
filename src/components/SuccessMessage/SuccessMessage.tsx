import type { FC } from "react";
import type { SuccessMessageProps } from "../../models/app-models";
import './SuccessMessage.css';

export const SuccessMessage: FC<SuccessMessageProps> = ({ name }) => (
    <div className="success-message">
        <div className="success-icon-container">
            <svg className="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
        </div>
        <h2>Registration Successful!</h2>
        <p>Welcome, {name}! Thank you for joining us. Your account has been created.</p>
    </div>
);
