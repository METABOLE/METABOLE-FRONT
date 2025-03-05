import { useClickOutside } from '@/hooks/useClickOutside';
import { postContactForm } from '@/services/contact.service';
import { COLORS } from '@/types';
import { ContactFormData } from '@/types/contact.type';
import { useGSAP } from '@gsap/react';
import { useMutation } from '@tanstack/react-query';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import Button, { AnimatedButtonRef } from './Button';
import { IconCross } from './Icons';
import Input, { AnimatedIputRef } from './Input';
import Typography, { AnimatedTypoRef } from './Typography';
import { useLanguage } from '@/providers/language.provider';
import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';

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
    consentMarketing: useRef<HTMLDivElement>(null),
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

  // État pour suivre si une animation est en cours
  const [isAnimating, setIsAnimating] = useState(false);

  const { contextSafe } = useGSAP();
  const { isFrench } = useLanguage();

  const playAnim = contextSafe(() => {
    // Ne pas démarrer une nouvelle animation si une autre est en cours
    if (isAnimating || !containerRef.current || !titleRef.current) return;

    // Marquer le début de l'animation
    setIsAnimating(true);

    const textAnimationTitle = titleRef.current.play();

    gsap
      .timeline({
        // Lorsque l'animation est terminée, on peut à nouveau déclencher des animations
        onComplete: () => setIsAnimating(false),
      })
      .add(() => setIsOpen(true))
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
          duration: 0.4,
          ease: 'power3.inOut',
        },
        '-=0.15',
      )
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
      .set(containerRef.current, {
        width: '100%',
        height: '100%',
      })
      .add(textAnimationTitle, '<')
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
      .add(() => buttonSubmitRef.current?.play(), '-=0.4');
  });

  const closeAnim = contextSafe(() => {
    // Ne pas démarrer une nouvelle animation si une autre est en cours
    if (isAnimating || !containerRef.current || !titleRef.current) return;

    // Marquer le début de l'animation
    setIsAnimating(true);

    const textAnimationTitle = titleRef.current.reverse();

    gsap
      .timeline({
        // Lorsque l'animation est terminée, on peut à nouveau déclencher des animations
        onComplete: () => setIsAnimating(false),
      })
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
      .to(buttonCloseRef.current, {
        scale: 0,
        rotate: 0,
        duration: 0.3,
      })
      .to(
        containerRef.current,
        {
          width: '0',
          height: '0',
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
      .add(() => setIsOpen(false));
  });

  // Utilisons useClickOutside mais en veillant à ne pas déclencher si une animation est en cours
  const handleClickOutside = contextSafe(() => {
    if (!isAnimating && isOpen) {
      closeAnim();
    }
  });

  const wrapperRef = useClickOutside<HTMLDivElement>(handleClickOutside);

  const sendContact = useMutation({
    mutationFn: ({ name, email, phone, message, consentMarketing, language }: ContactFormData) =>
      postContactForm({ name, email, phone, message, consentMarketing, language }),
    onSuccess: () => {
      resetForm();
    },
    onError: (error) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendContact.mutate({
      ...formData,
      language: isFrench ? 'fr' : 'en',
    });
  };

  return (
    <div
      ref={wrapperRef}
      className="border-red bg-blur-glass relative h-11 w-[117px] overflow-hidden rounded-3xl text-black backdrop-blur-xl"
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
        <button className="label w-full cursor-pointer text-left">CONTACT</button>
        <button
          ref={buttonCloseRef}
          className="scale-0 rotate-45 cursor-pointer"
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
          name="name"
          placeholder="John Doe"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
        />
        <Input
          ref={inputsRefs.email}
          animate={true}
          name="email"
          placeholder="johndoe@company.com"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        />
        <Input
          ref={inputsRefs.phone}
          animate={true}
          name="phone"
          placeholder="+33 6 12 34 56 78"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
        />
        <Input
          ref={inputsRefs.message}
          animate={true}
          name="message"
          placeholder={isFrench ? 'Un message à nous transmettre ?' : 'A message to send us?'}
          type="textarea"
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
        />
        <div
          ref={inputsRefs.consentMarketing}
          className="flex -translate-y-5 items-center gap-2 opacity-0"
        >
          <input
            checked={formData.consentMarketing}
            className="h-4 w-4 rounded-md"
            id="consentMarketing"
            name="consentMarketing"
            type="checkbox"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, consentMarketing: e.target.checked }))
            }
          />
          <label className="label text-black-70" htmlFor="consentMarketing">
            {isFrench
              ? "Je souhaite m'inscrire à la newsletter et je consens à recevoir des communications marketing"
              : 'I want to subscribe to the newsletter and I consent to receiving marketing communications'}
          </label>
        </div>
        <div className="w-fit pt-4">
          <Button ref={buttonSubmitRef} className="" color="secondary">
            Contact
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactPopover;
