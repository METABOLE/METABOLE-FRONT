import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import Input, { AnimatedInputRef } from '@/components/ui/Input';
import { TIMELINE } from '@/constants/timeline.constant';
import { useAudio } from '@/hooks/useAudio';
import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { useLanguage } from '@/providers/language.provider';
import { usePerformance } from '@/providers/performance.provider';
import { postContactForm } from '@/services/contact.service';
import { CONTACT_TYPE_VALUES, FORM_STATUS } from '@/types';
import { ContactFormData, ContactFormState, ContactType } from '@/types/contact.type';
import { isEmail } from '@/utils/validation.utils';
import { useGSAP } from '@gsap/react';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import gsap from 'gsap';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

const ContactForm = ({ className }: { className?: string }) => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const { play: playError } = useAudio('/sounds/error.mp3');
  const { play: playSuccess } = useAudio('/sounds/sent.mp3');

  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<AnimatedInputRef>(null);
  const emailInputRef = useRef<AnimatedInputRef>(null);
  const phoneInputRef = useRef<AnimatedInputRef>(null);
  const typeInputRef = useRef<AnimatedInputRef>(null);
  const messageInputRef = useRef<AnimatedInputRef>(null);
  const checkboxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();
  const { performanceLevel } = usePerformance();

  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: (type as ContactType) || CONTACT_TYPE_VALUES.DEFAULT,
    consentMarketing: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    type: '',
  });

  const [formStatus, setFormStatus] = useState(FORM_STATUS.DEFAULT);
  const { isFrench } = useLanguage();

  const revealAnimation = contextSafe(() => {
    nameInputRef.current?.reset();
    emailInputRef.current?.reset();
    phoneInputRef.current?.reset();
    typeInputRef.current?.reset();
    messageInputRef.current?.reset();

    gsap.set(checkboxRef.current, { y: 30, opacity: 0 });
    gsap.set(buttonRef.current, {
      ...(performanceLevel === PERFORMANCE_LEVEL.HIGH && {
        filter: 'blur(10px)',
      }),
      opacity: 0,
    });

    gsap
      .timeline({
        delay: TIMELINE.DELAY_AFTER_PAGE_TRANSITION,
      })
      .add(() => nameInputRef.current?.play())
      .add(() => emailInputRef.current?.play(), '+=0.1')
      .add(() => phoneInputRef.current?.play(), '+=0.1')
      .add(() => typeInputRef.current?.play(), '+=0.1')
      .add(() => messageInputRef.current?.play(), '+=0.1')
      .to(checkboxRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.inOut' })
      .to(
        buttonRef.current,
        {
          ...(performanceLevel === PERFORMANCE_LEVEL.HIGH && {
            filter: 'blur(0px)',
          }),
          opacity: 1,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        '+=0.1',
      );
  });

  useGSAP(() => {
    revealAnimation();
  }, []);

  const sendContact = useMutation({
    mutationFn: ({ name, email, phone, message, type, consentMarketing, lang }: ContactFormData) =>
      postContactForm({ name, email, phone, message, type, consentMarketing, lang }),
    onSuccess: () => {
      playSuccess();
      resetForm();
      resetErrors();
      setFormStatus(FORM_STATUS.SUCCESS);
    },
    onMutate: () => {
      setFormStatus(FORM_STATUS.PENDING);
    },
    onError: (error) => {
      playError();
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
      type: (type as ContactType) || CONTACT_TYPE_VALUES.DEFAULT,
      consentMarketing: false,
    });
  };

  const resetErrors = () => {
    setErrors({
      name: '',
      email: '',
      type: '',
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

    if (!formData.type || formData.type === CONTACT_TYPE_VALUES.DEFAULT) {
      setErrors((prev) => ({
        ...prev,
        type: isFrench ? 'Veuillez sélectionner un type' : 'Please select a type',
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
    <form
      ref={formRef}
      className={clsx(
        'border-blue-30 bg-blur-glass flex flex-col gap-6 rounded-3xl border-[1px] p-9 backdrop-blur-xl',
        className,
      )}
      onSubmit={handleSubmit}
    >
      <Input
        ref={nameInputRef}
        errorMessage={errors.name}
        isDark={true}
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
        ref={emailInputRef}
        errorMessage={errors.email}
        isDark={true}
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
        ref={phoneInputRef}
        isDark={true}
        name="contact-phone"
        placeholder="+33 6 12 34 56 78"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
      />

      <Input
        ref={typeInputRef}
        errorMessage={errors.type}
        isDark={true}
        name="contact-type"
        type="select"
        value={formData.type}
        required
        onBlur={() => {
          if (!formData.type || formData.type === CONTACT_TYPE_VALUES.DEFAULT) {
            setErrors((prev) => ({
              ...prev,
              type: isFrench ? 'Veuillez sélectionner un type' : 'Please select a type',
            }));
          }
        }}
        onChange={(e) => {
          const newType = e.target.value as ContactType;

          setFormData((prev) => ({
            ...prev,
            type: newType,
          }));

          if (newType !== CONTACT_TYPE_VALUES.DEFAULT) {
            setErrors((prev) => ({ ...prev, type: '' }));
          } else {
            setErrors((prev) => ({
              ...prev,
              type: isFrench ? 'Veuillez sélectionner un type' : 'Please select a type',
            }));
          }
        }}
      >
        <option value={CONTACT_TYPE_VALUES.DEFAULT}>
          {isFrench ? 'Sélectionnez un type' : 'Select a type'}
        </option>
        <option value={CONTACT_TYPE_VALUES.ONE_PAGE}>One Page (1 page)</option>
        <option value={CONTACT_TYPE_VALUES.WEBSITE}>
          {isFrench ? 'Site web (3 à 6 pages)' : 'Website (3 to 6 pages)'}
        </option>
        <option value={CONTACT_TYPE_VALUES.WEB_EXPERIENCE}>
          {isFrench ? 'Expérience web (pages illimitées)' : 'Web experience (unlimited pages)'}
        </option>
        <option value={CONTACT_TYPE_VALUES.OTHER}>{isFrench ? 'Autre' : 'Other'}</option>
      </Input>

      <Input
        ref={messageInputRef}
        isDark={true}
        name="contact-message"
        placeholder={isFrench ? 'Un message à nous transmettre ?' : 'A message to send us?'}
        type="textarea"
        value={formData.message}
        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
      />

      <div className="overflow-hidden">
        <div ref={checkboxRef}>
          <Checkbox
            checked={formData.consentMarketing}
            id="contact-consentMarketing"
            isDisclaimer={true}
            name="contact-consentMarketing"
            label={
              isFrench
                ? "Je veux recevoir la newsletter (promis, c'est 1 mail tous les 3 mois, pas plus)."
                : "I want to receive the newsletter (we promise, it's 1 email every 3 months, no more)."
            }
            onChange={(checked) => setFormData((prev) => ({ ...prev, consentMarketing: checked }))}
          />
        </div>
      </div>

      <div ref={buttonRef} className="origin-left pt-4">
        <Button
          color="primary"
          disabled={formStatus === FORM_STATUS.SUCCESS || formStatus === FORM_STATUS.PENDING}
          isResizable={true}
        >
          {getButtonText()}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
