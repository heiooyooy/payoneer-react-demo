import { useMemo, type ChangeEvent, type FC } from "react";
import type { StepProps } from "../../models/app-models";
import './AccountStep.css';

export const AccountStep: FC<StepProps> = ({ data, setData, errors }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const passwordStrength = useMemo(() => {
        const password = data.password;
        if (password.length === 0) return { label: '', color: '#e5e7eb', width: '0%' };
        if (password.length < 8) return { label: 'Weak', color: '#ef4444', width: '33%' };
        if (password.length < 12) return { label: 'Medium', color: '#f59e0b', width: '66%' };
        return { label: 'Strong', color: '#22c55e', width: '100%' };
    }, [data.password]);

    return (
        <div className="form-step">
            <h2>Account Setup</h2>
            <div>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="min. 8 characters"
                />
                {errors.password && <p className="error-message">{errors.password}</p>}
                {data.password.length > 0 && (
                    <div className="password-strength-container">
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ backgroundColor: passwordStrength.color, width: passwordStrength.width }}></div>
                        </div>
                        <p>{passwordStrength.label}</p>
                    </div>
                )}
            </div>
        </div>
    );
};