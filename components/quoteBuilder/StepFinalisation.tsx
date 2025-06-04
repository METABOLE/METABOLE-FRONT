import { useLanguage } from '@/providers/language.provider';
import { motion } from 'framer-motion';
import { isEmail, isPhone } from '@/utils/validation.utils';
import { useEffect, useState } from 'react';
import Input from '../Input';
import { StepFormData } from '@/types/quote.type';

interface StepFinalisationProps {
  formData: StepFormData;
  onFormChange: (formData: StepFormData, isValid: boolean) => void;
}

const StepFinalisation = ({ formData, onFormChange }: StepFinalisationProps) => {
  const { isFrench } = useLanguage();

  const [errors, setErrors] = useState<Record<string, string>>({
    name: '',
    email: '',
    phone: '',
  });

  const isFormValid = () =>
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '' &&
    isEmail(formData.email) &&
    isPhone(formData.phone) &&
    Object.values(errors).every((error) => error === '');

  const updateFormData = (field: keyof StepFormData, value: string) => {
    const updatedFormData = { ...formData, [field]: value };
    onFormChange(updatedFormData, isFormValid());
  };

  useEffect(() => {
    const isValid = isFormValid();
    onFormChange(formData, isValid);
  }, [formData, errors, onFormChange]);

  return (
    <div className="flex w-full flex-col gap-8 p-6">
      <motion.div
        key="step-finalisation-name"
        animate={{ scale: 1, transformOrigin: 'left' }}
        exit={{ scale: 0, transformOrigin: 'left' }}
        initial={{ scale: 0, transformOrigin: 'left' }}
        transition={{
          duration: 0.3,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.02,
        }}
        layout
      >
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
            updateFormData('name', e.target.value);
            e.target.value &&
              setErrors((prev) => ({
                ...prev,
                name: '',
              }));
          }}
        />
      </motion.div>

      <div className="grid w-full grid-cols-2 gap-6">
        <motion.div
          key="step-finalisation-email"
          animate={{ scale: 1, transformOrigin: 'left' }}
          exit={{ scale: 0, transformOrigin: 'left' }}
          initial={{ scale: 0, transformOrigin: 'left' }}
          transition={{
            duration: 0.3,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.04,
          }}
          layout
        >
          <Input
            errorMessage={errors.email}
            id="email"
            isDark={true}
            name="email"
            placeholder="john@company.com"
            type="email"
            value={formData.email}
            onBlur={() => {
              isEmail(formData.email) ||
                setErrors((prev) => ({
                  ...prev,
                  email: isFrench
                    ? 'Veuillez entrer un email valide'
                    : 'Please enter a valid email',
                }));
              !formData.email &&
                setErrors((prev) => ({
                  ...prev,
                  email: isFrench ? 'Veuillez entrer votre email' : 'Please enter your email',
                }));
            }}
            onChange={(e) => {
              isEmail(e.target.value) && setErrors((prev) => ({ ...prev, email: '' }));
              updateFormData('email', e.target.value);
            }}
          />
        </motion.div>

        <motion.div
          key="step-finalisation-phone"
          animate={{ scale: 1, transformOrigin: 'left' }}
          exit={{ scale: 0, transformOrigin: 'left' }}
          initial={{ scale: 0, transformOrigin: 'left' }}
          transition={{
            duration: 0.3,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.06,
          }}
          layout
        >
          <Input
            errorMessage={errors.phone}
            id="phone"
            isDark={true}
            name="phone"
            placeholder="+33 6 12 34 56 78"
            type="tel"
            value={formData.phone}
            onBlur={() => {
              isPhone(formData.phone) ||
                setErrors((prev) => ({
                  ...prev,
                  phone: isFrench
                    ? 'Veuillez entrer un numéro de téléphone valide'
                    : 'Please enter a valid phone number',
                }));
              !formData.phone &&
                setErrors((prev) => ({
                  ...prev,
                  phone: isFrench
                    ? 'Veuillez entrer votre numéro de téléphone'
                    : 'Please enter your phone number',
                }));
            }}
            onChange={(e) => {
              isPhone(e.target.value) && setErrors((prev) => ({ ...prev, phone: '' }));
              updateFormData('phone', e.target.value);
              e.target.value &&
                setErrors((prev) => ({
                  ...prev,
                  phone: '',
                }));
            }}
          />
        </motion.div>
      </div>

      <motion.div
        key="step-finalisation-message"
        animate={{ scale: 1, transformOrigin: 'left' }}
        exit={{ scale: 0, transformOrigin: 'left' }}
        initial={{ scale: 0, transformOrigin: 'left' }}
        transition={{
          duration: 0.3,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.08,
        }}
        layout
      >
        <Input
          id="message"
          isDark={true}
          name="message"
          placeholder={isFrench ? 'Un message à nous transmettre ?' : 'A message to send us?'}
          type="textarea"
          value={formData.message}
          onChange={(e) => updateFormData('message', e.target.value)}
        />
      </motion.div>
    </div>
  );
};

export default StepFinalisation;
