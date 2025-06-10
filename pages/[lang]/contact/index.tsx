import Button from '@/components/atoms/Button';
import Checkbox from '@/components/atoms/Checkbox';
import Input from '@/components/Input';
import { useLanguage } from '@/providers/language.provider';
import { postContactForm } from '@/services/contact.service';
import { FORM_STATUS } from '@/types';
import { ContactFormData } from '@/types/contact.type';
import { isEmail } from '@/utils/validation.utils';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const ContactPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: type || '',
    consentMarketing: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  const [formStatus, setFormStatus] = useState(FORM_STATUS.DEFAULT);
  const { isFrench } = useLanguage();

  const sendContact = useMutation({
    mutationFn: ({ name, email, phone, message, type, consentMarketing, lang }: ContactFormData) =>
      postContactForm({ name, email, phone, message, type, consentMarketing, lang }),
    onSuccess: () => {
      resetForm();
      resetErrors();
      setFormStatus(FORM_STATUS.SUCCESS);
    },
    onMutate: () => {
      setFormStatus(FORM_STATUS.PENDING);
    },
    onError: (error) => {
      setFormStatus(FORM_STATUS.ERROR);
      console.error("Erreur d'inscription", error);
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      type: type || '',
      consentMarketing: false,
    });
  };

  const resetErrors = () => {
    setErrors({
      name: '',
      email: '',
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetErrors();

    let hasErrors = false;

    if (!formData.name) {
      setErrors((prev) => ({
        ...prev,
        name: isFrench ? 'Veuillez entrer un nom' : 'Please enter a name',
      }));
      hasErrors = true;
    }

    if (!formData.email) {
      setErrors((prev) => ({
        ...prev,
        email: isFrench ? 'Veuillez entrer votre email' : 'Please enter your email',
      }));
      hasErrors = true;
    } else if (!isEmail(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: isFrench ? 'Veuillez entrer un email valide' : 'Please enter a valid email',
      }));
      hasErrors = true;
    }

    if (!hasErrors) {
      sendContact.mutate({
        ...formData,
        lang: isFrench ? 'fr' : 'en',
      });
    }
  };

  const getButtonText = () => {
    const texts = {
      SUCCESS: isFrench ? 'Envoyé' : 'Sent',
      ERROR: isFrench ? 'Erreur' : 'Error',
      DEFAULT: isFrench ? 'Envoyer' : 'Send',
      PENDING: isFrench ? 'Envoi...' : 'Sending...',
    };

    return texts[formStatus] || texts.DEFAULT;
  };

  return (
    <div className="px-x-default py-y-default min-h-screen">
      <form className="pt-y-default flex flex-col gap-6" onSubmit={handleSubmit}>
        <Input
          errorMessage={errors.name}
          isDark={true}
          label={isFrench ? 'Nom complet *' : 'Full name *'}
          name="contact-name"
          placeholder="John Doe"
          type="text"
          value={formData.name}
          required
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
          isDark={true}
          label={isFrench ? 'Email *' : 'Email *'}
          name="contact-email"
          placeholder="john@company.com"
          type="email"
          value={formData.email}
          required
          onBlur={() => {
            if (!formData.email) {
              setErrors((prev) => ({
                ...prev,
                email: isFrench ? 'Veuillez entrer votre email' : 'Please enter your email',
              }));
            } else if (!isEmail(formData.email)) {
              setErrors((prev) => ({
                ...prev,
                email: isFrench ? 'Veuillez entrer un email valide' : 'Please enter a valid email',
              }));
            }
          }}
          onChange={(e) => {
            isEmail(e.target.value) && setErrors((prev) => ({ ...prev, email: '' }));
            setFormData((prev) => ({ ...prev, email: e.target.value }));
          }}
        />

        <Input
          isDark={true}
          label={isFrench ? 'Téléphone' : 'Phone'}
          name="contact-phone"
          placeholder="+33 6 12 34 56 78"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
        />

        <Input
          isDark={true}
          label={isFrench ? 'Type de demande' : 'Request type'}
          name="contact-type"
          type="select"
          value={formData.type}
          onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
        >
          <option value="">{isFrench ? 'Sélectionnez un type' : 'Select a type'}</option>
          <option value="devis">{isFrench ? 'Demande de devis' : 'Quote request'}</option>
          <option value="contact">{isFrench ? 'Contact général' : 'General contact'}</option>
          <option value="support">{isFrench ? 'Support technique' : 'Technical support'}</option>
          <option value="partnership">{isFrench ? 'Partenariat' : 'Partnership'}</option>
        </Input>

        <Input
          isDark={true}
          label={isFrench ? 'Message' : 'Message'}
          name="contact-message"
          placeholder={isFrench ? 'Un message à nous transmettre ?' : 'A message to send us?'}
          type="textarea"
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
        />

        <Checkbox
          checked={formData.consentMarketing}
          id="contact-consentMarketing"
          isDisclaimer={true}
          name="contact-consentMarketing"
          label={
            isFrench
              ? "Je souhaite m'inscrire à la newsletter et je consens à recevoir des communications marketing"
              : 'I want to subscribe to the newsletter and I consent to receiving marketing communications'
          }
          onChange={(checked) => setFormData((prev) => ({ ...prev, consentMarketing: checked }))}
        />

        <div className="flex justify-center pt-4">
          <Button
            color="primary"
            disabled={formStatus === FORM_STATUS.SUCCESS || formStatus === FORM_STATUS.PENDING}
          >
            {getButtonText()}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
