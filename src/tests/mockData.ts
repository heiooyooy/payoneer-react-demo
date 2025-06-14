import type { AppFormData } from "../models/app-models";

export const initialMockData: AppFormData = {
    firstName: '',
    lastName: '',
    dob: '',
    country: '',
    gender: '',
    avatar: null,
    email: '',
    password: '',
};

export const filledMockData: AppFormData = {
    firstName: 'Darren',
    lastName: 'Tu',
    dob: '1990-01-01',
    country: 'Canada',
    gender: 'Male',
    email: 'darren.tu@test.com',
    password: 'a-strong-password',
    avatar: null,
  };