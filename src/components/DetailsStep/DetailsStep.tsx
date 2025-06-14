import { type ChangeEvent, type FC, useState } from "react";
import type { StepProps } from "../../models/app-models";
import './DetailsStep.css';

export const DetailsStep: FC<StepProps> = ({ data, setData, errors }) => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData(prev => ({ ...prev, avatar: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const countries: string[] = ["China", "United States", "Canada", "United Kingdom", "Other"];

    return (
        <div className="form-step">
            <h2>Details</h2>
            <div>
                <label htmlFor="country">Country</label>
                <select
                    name="country"
                    id="country"
                    value={data.country}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setData(prev => ({ ...prev, country: e.target.value }))}
                >
                    <option value="">Select a country</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.country && <p className="error-message">{errors.country}</p>}
            </div>
            <div>
                <label htmlFor="gender">Gender</label>
                <select
                    name="gender"
                    id="gender"
                    value={data.gender}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setData(prev => ({ ...prev, gender: e.target.value }))}
                >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {errors.gender && <p className="error-message">{errors.gender}</p>}
            </div>
            <div>
                <label>Avatar (Optional)</label>
                <div className="avatar-upload">
                    {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar Preview" className="avatar-preview" />
                    ) : (
                        <span className="avatar-placeholder">
                            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </span>
                    )}
                    <input type="file" accept="image/*" onChange={handleAvatarChange} />
                </div>
            </div>
        </div>
    );
};
