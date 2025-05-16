import { useLanguage } from '@/providers/language.provider';
import { FormWebsiteBuilderData } from '@/types';
import { isEmail } from '@/utils/validation.utils';
import { useEffect, useState } from 'react';
import Input from '../Input';

const StepFinalisation = ({
  onFormChange,
}: {
  onFormChange?: (formData: FormWebsiteBuilderData, isValid: boolean) => void;
  errors?: Record<string, string>;
}) => {
  const { isFrench } = useLanguage();
  const [formData, setFormData] = useState<FormWebsiteBuilderData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({
    name: '',
    email: '',
    phone: '',
  });

  const isFormValid = (): boolean => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      isEmail(formData.email) &&
      formData.phone.trim() !== '' &&
      Object.values(errors).every((error) => error === '')
    );
  };

  useEffect(() => {
    if (onFormChange) {
      const isValid = isFormValid();
      onFormChange(formData, isValid);
    }
  }, [formData, errors]);

  return (
    <div className="flex w-full flex-col gap-8">
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
        errorMessage={errors.phone}
        id="phone"
        isDark={true}
        name="phone"
        placeholder="+33 6 12 34 56 78"
        type="tel"
        value={formData.phone}
        onBlur={() => {
          !formData.phone &&
            setErrors((prev) => ({
              ...prev,
              phone: isFrench
                ? 'Veuillez entrer votre téléphone'
                : 'Please enter your phone number',
            }));
        }}
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
