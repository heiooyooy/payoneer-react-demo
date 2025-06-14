import type { FC, ChangeEvent } from "react";
import type { StepProps } from "../../models/app-models";

export const BasicInfoStep: FC<StepProps> = ({ data, setData, errors }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="form-step">
            <h2>Basic Information</h2>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                    placeholder="John"
                />
                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                />
                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
            </div>
            <div>
                <label htmlFor="dob">Date of Birth</label>
                <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={data.dob}
                    onChange={handleChange}
                    max={new Date().toISOString().split("T")[0]}
                />
                {errors.dob && <p className="error-message">{errors.dob}</p>}
            </div>
        </div>
    );
};