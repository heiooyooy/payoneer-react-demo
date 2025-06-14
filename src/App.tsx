import { useEffect, useState, type FormEvent, type JSX } from 'react'
import type { AppFormData, FormErrors } from './models/app-models';
import { BasicInfoStep } from './components/BasicInfoStep/BasicInfoStep';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { SuccessMessage } from './components/SuccessMessage/SuccessMessage';
import { DetailsStep } from './components/DetailsStep/DetailsStep';
import { AccountStep } from './components/AccountStep/AccountStep';
import { ConfirmationStep } from './components/ConfirmationStep/ConfirmationStep';
import './App.css'
import payoneerLogo from './assets/Payoneer_logo.svg';
import { AuthService } from './services/AuthService';

function App() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<AppFormData>({
    firstName: '',
    lastName: '',
    dob: '',
    country: '',
    gender: '',
    avatar: null,
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const totalSteps = 4;

  useEffect(() => {
    if (isSubmitting) {
      document.body.classList.add('body-busy-cursor');
    } else {
      document.body.classList.remove('body-busy-cursor');
    }

    return () => {
      document.body.classList.remove('body-busy-cursor');
    };
  }, [isSubmitting]);

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {};
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required.';
      if (!formData.lastName) newErrors.lastName = 'Last name is required.';
      if (!formData.dob) newErrors.dob = 'Date of birth is required.';
    } else if (step === 2) {
      if (!formData.country) newErrors.country = 'Country is required.';
      if (!formData.gender) newErrors.gender = 'Gender is required.';
    } else if (step === 3) {
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid.';
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (): void => {
    if (validateStep())
      setStep(s => s + 1);
  };

  const prevStep = (): void => {
    if (step > 1)
      setStep(s => s - 1);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const result = await AuthService.submitRegistration(formData);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setSubmissionError(result.error || 'An unknown error occurred.');
      }
    } catch (error) {
      setSubmissionError('A critical error occurred. Please try again later.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = (): JSX.Element | null => {
    switch (step) {
      case 1: return <BasicInfoStep data={formData} setData={setFormData} errors={errors} />;
      case 2: return <DetailsStep data={formData} setData={setFormData} errors={errors} />;
      case 3: return <AccountStep data={formData} setData={setFormData} errors={errors} />;
      case 4: return <ConfirmationStep data={formData} />;
      default: return null;
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <div className="form-container">

          <div className="form-branding">
            <img src={payoneerLogo} alt="Payoneer Logo" className="form-logo" />
            <p className="form-author">A Demo by Dejun (Darren) Tu</p>
          </div>

          {isSubmitted ? (
            <SuccessMessage name={formData.firstName} />
          ) : (
            <form onSubmit={handleSubmit}>
              <ProgressBar currentStep={step} totalSteps={totalSteps} />
              <div style={{ margin: '2rem 0' }}>
                {renderStep()}
              </div>
              {submissionError && (
                <p className="submission-error">{submissionError}</p>
              )}
              <div className="button-container">
                {step > 1 && (
                  <button type="button" onClick={prevStep} className="btn btn-secondary">Back</button>
                )}
                {step < totalSteps && (
                  <button type="button" onClick={nextStep} className="btn btn-primary">Next</button>
                )}
                {step === totalSteps && (
                  <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default App
