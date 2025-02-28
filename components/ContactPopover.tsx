import { useClickOutside } from '@/hooks/useClickOutside';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import Button, { AnimatedButtonRef } from './Button';
import Input, { AnimatedIputRef } from './Input';
import Typography, { AnimatedTypoRef } from './Typography';
import { IconCross } from './Icons';
import { COLORS } from '@/types';

const ContactPopover = () => {
  const buttonOpenRef = useRef(null);
  const buttonCloseRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<AnimatedTypoRef>(null);
  const inputsRefs = {
    name: useRef<AnimatedIputRef>(null),
    email: useRef<AnimatedIputRef>(null),
    phone: useRef<AnimatedIputRef>(null),
    message: useRef<AnimatedIputRef>(null),
  };
  const buttonSubmitRef = useRef<AnimatedButtonRef>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { contextSafe } = useGSAP();

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
          height: 564,
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
      <div ref={containerRef} className="flex h-fit w-0 flex-col gap-8 overflow-hidden px-8">
        <Typography ref={titleRef} animate={true} className="p3 pt-4" variant="h3">
          Entrez votre e-mail et nous vous recontactons pour vous donner plus d'informations:
        </Typography>
        <Input
          ref={inputsRefs.name}
          animate={true}
          name="name"
          placeholder="John Doe"
          type="text"
        />
        <Input
          ref={inputsRefs.email}
          animate={true}
          name="email"
          placeholder="johndoe@company.com"
          type="email"
        />
        <Input
          ref={inputsRefs.phone}
          animate={true}
          name="phone"
          placeholder="+33 6 12 34 56 78"
          type="tel"
        />
        <Input
          ref={inputsRefs.message}
          animate={true}
          name="message"
          placeholder="Un message à nous transmettre ?"
          type="textarea"
        />
        <div className="w-fit pt-4">
          <Button ref={buttonSubmitRef} className="" color="secondary">
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactPopover;
