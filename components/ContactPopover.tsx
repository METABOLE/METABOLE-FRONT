import { useClickOutside } from '@/hooks/useClickOutside';
import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useLanguage } from '@/providers/language.provider';
import { postContactForm } from '@/services/contact.service';
import { COLORS, FORM_STATUS } from '@/types';
import { ContactFormData } from '@/types/contact.type';
import { clampVw } from '@/utils/clamp.utils';
import { isEmail } from '@/utils/validation.utils';
import { useGSAP } from '@gsap/react';
import { useMutation } from '@tanstack/react-query';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import Button, { AnimatedButtonRef } from './atoms/Button';
import { IconCross } from './Icons';
import Input, { AnimatedIputRef } from './Input';
import Typography, { AnimatedTypoRef } from './Typography';
import Checkbox from './atoms/Checkbox';

const ContactPopover = () => {
  const buttonOpenRef = useRef(null);
  const buttonCloseRef = useRef(null);
  const containerRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<AnimatedTypoRef>(null);
  const inputsRefs = {
    name: useRef<AnimatedIputRef>(null),
    email: useRef<AnimatedIputRef>(null),
    phone: useRef<AnimatedIputRef>(null),
    message: useRef<AnimatedIputRef>(null),
    consentMarketing: useRef<HTMLLabelElement>(null),
  };
  const buttonSubmitRef = useRef<AnimatedButtonRef>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consentMarketing: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });
  const [formStatus, setFormStatus] = useState(FORM_STATUS.DEFAULT);
  const [isAnimating, setIsAnimating] = useState(false);

  const { contextSafe } = useGSAP();
  const { isFrench } = useLanguage();

  const playAnim = contextSafe(() => {
    if (isAnimating || !containerRef.current || !titleRef.current) return;

    setIsAnimating(true);

    const textAnimationTitle = titleRef.current.play();

    const timeline = gsap.timeline();
    const mm = gsap.matchMedia();
    timeline.add(() => setIsOpen(true));

    mm.add('(min-width: 768px)', () => {
      timeline
        .to(
          wrapperRef.current,
          {
            width: 430,
            duration: 0.3,
            ease: 'power3.inOut',
          },
          '<',
        )
        .to(
          wrapperRef.current,
          {
            height: 604,
            duration: 0.6,
            ease: 'power3.inOut',
          },
          '-=0.15',
        );
    });

    mm.add('(max-width: 767px)', () => {
      timeline
        .to(
          wrapperRef.current,
          {
            width: window.innerWidth - clampVw(20, 8, 100) * 2,
            duration: 0.3,
            ease: 'power3.inOut',
          },
          '<',
        )
        .to(
          wrapperRef.current,
          {
            height: 634,
            duration: 0.6,
            ease: 'power3.inOut',
          },
          '-=0.15',
        );
    });

    timeline
      .to(
        buttonOpenRef.current,
        {
          padding: '32px',
          duration: 0.3,
        },
        '<',
      )
      .to(
        buttonCloseRef.current,
        {
          scale: 1,
          ease: 'elastic.out',
          rotate: 45,
          duration: 1.2,
        },
        '<',
      )
      .set(
        containerRef.current,
        {
          width: '100%',
          height: '100%',
        },
        '<',
      )
      .add(textAnimationTitle, '-=1')
      .add(() => inputsRefs.name.current?.play(), '-=1.2')
      .add(() => inputsRefs.email.current?.play(), '-=1.1')
      .add(() => inputsRefs.phone.current?.play(), '-=1')
      .add(() => inputsRefs.message.current?.play(), '-=0.9')
      .to(
        inputsRefs.consentMarketing.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
        },
        '-=0.5',
      )
      .add(() => buttonSubmitRef.current?.play(), '-=0.4')
      .add(() => setIsAnimating(false));
  });

  const closeAnim = contextSafe(() => {
    if (isAnimating || !containerRef.current || !titleRef.current) return;

    setIsAnimating(true);
    resetErrors();

    const textAnimationTitle = titleRef.current.reverse();

    gsap
      .timeline({
        onComplete: () => setIsAnimating(false),
      })
      .to(
        buttonCloseRef.current,
        {
          scale: 0,
          rotate: 0,
          duration: 0.3,
        },
        '<',
      )
      .add(() => buttonSubmitRef.current?.reverse())
      .to(inputsRefs.consentMarketing.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
      })
      .add(() => inputsRefs.message.current?.reverse(), '+=0.1')
      .add(() => inputsRefs.phone.current?.reverse(), '+=0.1')
      .add(() => inputsRefs.email.current?.reverse(), '+=0.1')
      .add(() => inputsRefs.name.current?.reverse(), '+=0.1')
      .add(textAnimationTitle)
      .to(
        containerRef.current,
        {
          width: 0,
          height: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        },
        '-=0.3',
      )
      .to(
        wrapperRef.current,
        {
          width: 117,
          height: 44,
          duration: 0.3,
          ease: 'power2.out',
        },
        '<',
      )
      .to(
        buttonOpenRef.current,
        {
          padding: '0px 24px',
          duration: 0.3,
        },
        '-=0.15',
      )
      .add(() => {
        setFormStatus(FORM_STATUS.DEFAULT);
        setIsOpen(false);
      });
  });

  const handleClickOutside = contextSafe(() => {
    if (!isAnimating && isOpen) {
      closeAnim();
    }
  });

  const wrapperRef = useClickOutside<HTMLDivElement>(handleClickOutside);

  const sendContact = useMutation({
    mutationFn: ({ name, email, phone, message, consentMarketing, lang }: ContactFormData) =>
      postContactForm({ name, email, phone, message, consentMarketing, lang }),
    onSuccess: () => {
      resetForm();
      resetErrors();
      setFormStatus(FORM_STATUS.SUCCESS);
      setTimeout(() => {
        if (!isAnimating) closeAnim();
      }, 1000);
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
    if (!formData.name)
      setErrors((prev) => ({
        ...prev,
        name: isFrench ? 'Veuillez entrer un nom' : 'Please enter a name',
      }));

    if (!formData.email)
      setErrors((prev) => ({
        ...prev,
        email: isFrench ? 'Veuillez entrer votre email' : 'Please enter your email',
      }));

    if (!isEmail(formData.email))
      setErrors((prev) => ({
        ...prev,
        email: isFrench ? 'Veuillez entrer un email valide' : 'Please enter a valid email',
      }));

    if (errors.name || errors.email || !isEmail(formData.email))
      throw new Error('Formulaire invalide');

    sendContact.mutate({
      ...formData,
      lang: isFrench ? 'fr' : 'en',
    });
  };

  const getButtonText = () => {
    const texts = {
      SUCCESS: isFrench ? 'Envoyé' : 'Sent',
      ERROR: isFrench ? 'Erreur' : 'Error',
      DEFAULT: isFrench ? 'Contactez-nous' : 'Contact us',
      PENDING: isFrench ? 'Envoi...' : 'Sending...',
    };

    return texts[formStatus] || texts.DEFAULT;
  };

  return (
    <div
      ref={wrapperRef}
      className="border-red bg-blur-glass absolute right-0 h-11 w-[117px] max-w-[430px] overflow-hidden rounded-3xl text-black backdrop-blur-xl md:relative"
      onClick={() => !isOpen && !isAnimating && playAnim()}
      onMouseMove={(e) => useMagnet(e, 0.8)}
      onMouseOut={(e) => useResetMagnet(e)}
    >
      <div
        ref={buttonOpenRef}
        className="flex h-11 cursor-pointer items-center justify-between px-6"
        onMouseMove={(e) => !isOpen && useMagnet(e, 0.4)}
        onMouseOut={(e) => useResetMagnet(e)}
      >
        <button
          aria-label={isFrench ? 'Ouvrir le formulaire de Contact' : 'Open the Contact form'}
          className="label w-full cursor-pointer text-left"
          type="button"
        >
          CONTACT
        </button>
        <button
          ref={buttonCloseRef}
          aria-label={isFrench ? 'Fermer le formulaire de Contact' : 'Close the Contact form'}
          className="absolute right-4 scale-0 rotate-45 cursor-pointer p-4"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!isAnimating) closeAnim();
          }}
        >
          <IconCross className="transition-transform hover:rotate-90" color={COLORS.BLUE} />
        </button>
      </div>
      <form
        ref={containerRef}
        className="flex h-fit w-0 flex-col gap-8 overflow-hidden px-8"
        onSubmit={handleSubmit}
      >
        <Typography ref={titleRef} animate={true} className="p3 pt-4" variant="h3">
          {isFrench
            ? "Entrez votre e-mail et nous vous recontactons pour vous donner plus d'informations:"
            : "Enter your email and we'll get back to you with more information:"}
        </Typography>
        <Input
          ref={inputsRefs.name}
          animate={true}
          errorMessage={errors.name}
          isDark={true}
          name="name"
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
          ref={inputsRefs.email}
          animate={true}
          errorMessage={errors.email}
          isDark={true}
          name="email"
          placeholder="johndoe@company.com"
          type="email"
          value={formData.email}
          required
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
          ref={inputsRefs.phone}
          animate={true}
          isDark={true}
          name="phone"
          placeholder="+33 6 12 34 56 78"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
        />
        <Input
          ref={inputsRefs.message}
          animate={true}
          isDark={true}
          name="message"
          placeholder={isFrench ? 'Un message à nous transmettre ?' : 'A message to send us?'}
          type="textarea"
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
        />
        <Checkbox
          ref={inputsRefs.consentMarketing}
          checked={formData.consentMarketing}
          className="-translate-y-5 opacity-0"
          id="consentMarketing"
          isDisclaimer={true}
          name="consentMarketing"
          label={
            isFrench
              ? "Je souhaite m'inscrire à la newsletter et je consens à recevoir des communications marketing"
              : 'I want to subscribe to the newsletter and I consent to receiving marketing communications'
          }
          onChange={(checked) => setFormData((prev) => ({ ...prev, consentMarketing: checked }))}
        />
        <div className="w-fit pt-4">
          <Button
            ref={buttonSubmitRef}
            className=""
            color="secondary"
            disabled={formStatus === FORM_STATUS.SUCCESS || formStatus === FORM_STATUS.PENDING}
          >
            {getButtonText()}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactPopover;
