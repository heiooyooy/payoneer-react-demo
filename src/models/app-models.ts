import type { Dispatch, SetStateAction } from "react";

export interface AppFormData {
    firstName: string;
    lastName: string;
    dob: string;
    country: string;
    gender: string;
    avatar: File | null;
    email: string;
    password: string;
}

export type FormErrors = Partial<Record<keyof Omit<AppFormData, 'avatar'>, string>>;

export interface StepProps {
    data: AppFormData;
    setData: Dispatch<SetStateAction<AppFormData>>;
    errors: FormErrors;
}