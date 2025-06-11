import { useLanguage } from '@/providers/language.provider';
import { COLORS, FORM_STATUS, NewsletterSubscribeData } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { IconArrow, IconQuestionMark } from './Icons';
import Typography, { AnimatedTypoRef } from './Typography';
import gsap from 'gsap';
import { useMutation } from '@tanstack/react-query';
import { postSubscribeNewsletter } from '@/services/newsletter.service';
import { isEmail } from '@/utils/validation.utils';
import Input, { AnimatedInputRef } from './Input';

interface LeadFormProps {
  className?: string;
  isDark?: boolean;
  animate?: boolean;
}

const SUCCESS_MESSAGES = {
  fr: 'Inscription réussie',
  en: 'Subscription successful',
};

export interface AnimatedNewsletterFormRef {
  play: () => gsap.core.TimelineChild;
  reverse: () => gsap.core.TimelineChild;
}

const NewsletterForm = forwardRef<AnimatedNewsletterFormRef, LeadFormProps>(
  ({ className, isDark }, ref) => {
    const typographyRef = useRef<AnimatedTypoRef>(null);
    const wrapperRef = useRef(null);
    const inputRef = useRef<AnimatedInputRef>(null);
    const arrowRef = useRef(null);

    const { contextSafe } = useGSAP();
    const { isFrench } = useLanguage();

    useGSAP(() => {
      typographyRef.current?.reset();
      // inputRef.current?.reset();
      gsap.set(arrowRef.current, { x: -50, y: 50 });
      gsap.set(wrapperRef.current, { opacity: 1 });
    }, []);

    const play = contextSafe(() => {
      if (!typographyRef.current) return gsap.timeline();

      gsap.killTweensOf([typographyRef.current, arrowRef.current]);

      return gsap
        .timeline()
        .set(arrowRef.current, { x: -50, y: 50 })
        .set(wrapperRef.current, { opacity: 1 })
        .add(() => inputRef.current?.play())
        .add(typographyRef.current.play())
        .to(
          arrowRef.current,
          {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: 'power2.in',
          },
          '<',
        );
    });

    const reverse = contextSafe(() => {
      if (!typographyRef.current) return gsap.timeline();

      gsap.killTweensOf([typographyRef.current, arrowRef.current]);

      return gsap
        .timeline()
        .add(() => inputRef.current?.reverse())
        .add(typographyRef.current.reverse())
        .to(
          arrowRef.current,
          {
            x: 50,
            y: -50,
            duration: 0.4,
            ease: 'power2.in',
          },
          '<',
        )
        .set(wrapperRef.current, { opacity: 0 });
    });

    useImperativeHandle(ref, () => ({
      play,
      reverse,
    }));

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [formStatus, setFormStatus] = useState(FORM_STATUS.DEFAULT);

    const subscribeNewsletter = useMutation({
      mutationFn: ({ email, lang }: NewsletterSubscribeData) =>
        postSubscribeNewsletter({ email, lang }),
      onSuccess: (data) => {
        console.info('Inscription réussie', data);
        inputRef.current?.blur();
        setFormStatus(FORM_STATUS.SUCCESS);
        setEmail('');
        setTimeout(() => {
          setFormStatus(FORM_STATUS.DEFAULT);
        }, 3000);
      },
      onError: (error) => {
        setFormStatus(FORM_STATUS.ERROR);
        setError(isFrench ? "Erreur d'inscription" : 'Subscription error');
        console.error('ERROR : ', error);
      },
      onMutate: () => {
        setFormStatus(FORM_STATUS.PENDING);
      },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!email)
        return setError(isFrench ? 'Veuillez entrer votre email' : 'Please enter your email');
      if (!isEmail(email)) return setError(isFrench ? 'Email invalide' : 'Invalid email');

      setError('');

      subscribeNewsletter.mutate({
        email: email,
        lang: isFrench ? 'fr' : 'en',
      });
    };

    return (
      <div ref={wrapperRef} className={className}>
        <div className="flex items-center gap-5 pb-3">
          <Typography
            ref={typographyRef}
            animate={true}
            className={clsx('p3 whitespace-nowrap', isDark ? 'text-black' : 'text-white')}
            variant="h2"
          >
            {isFrench ? 'Rejoignez notre newsletter ' : 'Join our newsletter '}
          </Typography>
          <button className="cursor-help" id="hint-newsletter">
            <IconQuestionMark color={COLORS.YELLOW} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative flex items-center">
            <Input
              ref={inputRef}
              animate={true}
              className={clsx('p3 w-full py-4 pr-5')}
              errorMessage={error}
              isDark={isDark}
              isLoading={formStatus === FORM_STATUS.PENDING}
              name="email"
              placeholder="john@company.com"
              type="email"
              value={email}
              successMessage={
                formStatus === FORM_STATUS.SUCCESS ? SUCCESS_MESSAGES[isFrench ? 'fr' : 'en'] : ''
              }
              onBlur={() => {
                isEmail(email) ||
                  setError(
                    isFrench ? 'Veuillez entrer un email valide' : 'Please enter a valid email',
                  );
                !email &&
                  setError(isFrench ? 'Veuillez entrer votre email' : 'Please enter your email');
              }}
              onChange={(e) => {
                isEmail(e.target.value) && setError('');
                setEmail(e.target.value);
              }}
            />
            <div className="absolute right-0 flex h-16 w-8 items-center justify-end overflow-hidden">
              <button
                ref={arrowRef}
                aria-label="Send"
                className="cursor-pointer disabled:opacity-50"
                disabled={formStatus === FORM_STATUS.PENDING || formStatus === FORM_STATUS.SUCCESS}
                type="submit"
              >
                <IconArrow className="rotate-45" color={isDark ? COLORS.BLACK : COLORS.WHITE} />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  },
);

export default NewsletterForm;
