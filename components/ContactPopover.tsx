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

  const { contextSafe } = useGSAP();
  const { isFrench } = useLanguage();

  const playAnim = contextSafe(() => {
    if (!containerRef.current || !titleRef.current) return;

    const textAnimationTitle = titleRef.current.play();

    gsap
      .timeline()
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
      .add(() => buttonSubmitRef.current?.play(), '-=0.4');
  });

  const closeAnim = contextSafe(() => {
    if (!containerRef.current || !titleRef.current) return;

    const textAnimationTitle = titleRef.current.reverse();

    gsap
      .timeline()
      .add(() => buttonSubmitRef.current?.reverse())
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

  const wrapperRef = useClickOutside<HTMLDivElement>(closeAnim);

  const sendContact = useMutation({
    mutationFn: ({ name, email, phone, message, consentMarketing, language }: ContactFormData) =>
      postContactForm({ name, email, phone, message, consentMarketing, language }),
    onSuccess: (data) => {
      console.log('Inscription réussie', data);
    },
    onError: (error) => {
      console.error("Erreur d'inscription", error);
    },
  });

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
      onClick={() => !isOpen && playAnim()}
    >
      <div ref={buttonOpenRef} className="flex h-11 items-center justify-between px-6">
        <button className="label w-full text-left">CONTACT</button>
        <button
          ref={buttonCloseRef}
          className="scale-0 rotate-45 cursor-pointer"
          onClick={closeAnim}
        >
          <IconCross color={COLORS.BLUE} />
        </button>
      </div>
      <form
        ref={containerRef}
        className="flex h-fit w-0 flex-col gap-8 overflow-hidden px-8"
        onSubmit={handleSubmit}
      >
        <Typography ref={titleRef} animate={true} className="p3 pt-4" variant="h3">
          Entrez votre e-mail et nous vous recontactons pour vous donner plus d'informations:
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
          placeholder="Un message à nous transmettre ?"
          type="textarea"
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
        />
        <div className="flex items-center gap-2">
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
