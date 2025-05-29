import { useLanguage } from '@/providers/language.provider';
import { FormWebsiteBuilderData } from '@/types';
import { isEmail } from '@/utils/validation.utils';
import { useEffect, useState } from 'react';
import Input from '../Input';

interface StepFinalisationProps {
  initialFormData?: FormWebsiteBuilderData;
  onFormChange?: (formData: FormWebsiteBuilderData, isValid: boolean) => void;
  errors?: Record<string, string>;
}

const StepFinalisation = ({ initialFormData, onFormChange }: StepFinalisationProps) => {
  const { isFrench } = useLanguage();

  const [formData, setFormData] = useState<FormWebsiteBuilderData>(
    initialFormData || {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  );

  const [errors, setErrors] = useState<Record<string, string>>({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  const isFormValid = (): boolean => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      isEmail(formData.email) &&
      Object.values(errors).every((error) => error === '')
    );
  };

  useEffect(() => {
    if (onFormChange) {
      const isValid = isFormValid();
      onFormChange(formData, isValid);
    }
  }, [formData, errors, onFormChange]);

  return (
    <div className="flex w-full flex-col gap-8 p-6">
      <Input
        errorMessage={errors.name}
        id="name"
        isDark={true}
        name="name"
        placeholder="John Doe"
        type="text"
        value={formData.name}
        onBlur={() => {
          !formData.name &&
            setErrors((prev) => ({
              ...prev,
              name: isFrench ? 'Veuillez entrer un nom' : 'Please enter a name',
            }));
        }}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, name: e.target.value }));
          e.target.value &&
            setErrors((prev) => ({
              ...prev,
              name: '',
            }));
        }}
      />

      <Input
        errorMessage={errors.email}
        id="email"
        isDark={true}
        name="email"
        placeholder="johndoe@company.com"
        type="email"
        value={formData.email}
        onBlur={() => {
          isEmail(formData.email) ||
            setErrors((prev) => ({
              ...prev,
              email: isFrench ? 'Veuillez entrer un email valide' : 'Please enter a valid email',
            }));
          !formData.email &&
            setErrors((prev) => ({
              ...prev,
              email: isFrench ? 'Veuillez entrer votre email' : 'Please enter your email',
            }));
        }}
        onChange={(e) => {
          isEmail(e.target.value) && setErrors((prev) => ({ ...prev, email: '' }));
          setFormData((prev) => ({ ...prev, email: e.target.value }));
        }}
      />

      <Input
        id="phone"
        isDark={true}
        name="phone"
        placeholder="+33 6 12 34 56 78"
        type="tel"
        value={formData.phone}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, phone: e.target.value }));
          e.target.value &&
            setErrors((prev) => ({
              ...prev,
              phone: '',
            }));
        }}
      />

      <Input
        id="message"
        isDark={true}
        name="message"
        placeholder={isFrench ? 'Un message à nous transmettre ?' : 'A message to send us?'}
        type="textarea"
        value={formData.message}
        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
      />
    </div>
  );
};

export default StepFinalisation;
