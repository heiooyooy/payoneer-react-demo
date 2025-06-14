import type { FC } from "react";
import type { ConfirmationStepProps } from "../../models/app-models";
import './ConfirmationStep.css';

export const ConfirmationStep: FC<ConfirmationStepProps> = ({ data }) => {
    const avatarUrl = data.avatar ? URL.createObjectURL(data.avatar) : null;

    return (
        <div className="form-step">
            <h2>Confirmation</h2>
            <p>Please review your information before submitting.</p>
            <div className="confirmation-summary">
                {avatarUrl && (
                    <div className="summary-avatar">
                        <img src={avatarUrl} alt="Avatar" className="avatar-preview" />
                    </div>
                )}
                <div className="summary-item"><span>First Name:</span> <span>{data.firstName}</span></div>
                <div className="summary-item"><span>Last Name:</span> <span>{data.lastName}</span></div>
                <div className="summary-item"><span>Date of Birth:</span> <span>{data.dob}</span></div>
                <div className="summary-item"><span>Country:</span> <span>{data.country}</span></div>
                <div className="summary-item"><span>Gender:</span> <span>{data.gender}</span></div>
                <div className="summary-item"><span>Email:</span> <span>{data.email}</span></div>
            </div>
        </div>
    );
};