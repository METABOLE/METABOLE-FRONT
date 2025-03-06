import { useLanguage } from '@/providers/language.provider';
import { postSubscribeNewsletter } from '@/services/newsletter.service';
import { COLORS } from '@/types';
import { NewsletterSubscribeData } from '@/types/newsletter.type';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import Hint from './Hint';
import { IconArrow, IconQuestionMark } from './Icons';
import Typography from './Typography';

interface LeadFormProps {
  className?: string;
  isDark?: boolean;
  animate?: boolean;
}

const LeadForm = ({ className, isDark }: LeadFormProps) => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const lineRef = useRef(null);
  const arrowRef = useRef(null);

  const [email, setEmail] = useState('');

  const { isFrench } = useLanguage();

  const subscribeNewsletter = useMutation({
    mutationFn: ({ email, language }: NewsletterSubscribeData) =>
      postSubscribeNewsletter({ email, language }),
    onSuccess: (data) => {
      console.info('Inscription réussie', data);
      setEmail('');
    },
    onError: (error) => {
      console.error("Erreur d'inscription", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    subscribeNewsletter.mutate({
      email: email,
      language: isFrench ? 'fr' : 'en',
    });
  };

  return (
    <div ref={wrapperRef} className={clsx(className, 'relative')}>
      <div className="flex items-center gap-5 pb-3">
        <Typography className={clsx('p3', isDark ? 'text-black' : 'text-white')} variant="h3">
          {isFrench ? 'Rejoignez notre newsletter ' : 'Join our newsletter '}
        </Typography>
        <button ref={containerRef} className="cursor-help">
          <IconQuestionMark color={COLORS.YELLOW} />
          <Hint container={containerRef} isLeft={true}>
            {isFrench ? (
              <p>
                On ne spamme pas : <strong>1 mail tous les 3 mois</strong>, avec des news et du
                contenu utile !
              </p>
            ) : (
              <p>
                We don’t spam: <strong>1 email every 3 months</strong>, with news and useful
                content!
              </p>
            )}
          </Hint>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center overflow-hidden">
          <input
            ref={inputRef}
            name="email"
            placeholder="johndoe@company.com"
            type="email"
            value={email}
            className={clsx(
              'p3 w-full py-4',
              isDark ? 'placeholder-black-30 text-black' : 'placeholder-white-30 text-white',
            )}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button ref={arrowRef} aria-label="Send" className="ml-4 cursor-pointer" type="submit">
            <IconArrow className="rotate-45" color={isDark ? COLORS.BLACK : COLORS.WHITE} />
          </button>
          <div
            ref={lineRef}
            className={clsx(
              'absolute bottom-0 left-0 h-px w-full origin-left',
              isDark ? 'bg-black' : 'bg-white',
            )}
          />
        </div>
      </form>

      <p className="text-white-30 disclaimer w-full pt-2">
        {isFrench
          ? 'En vous inscrivant, vous consentez à recevoir notre newsletter. Désinscription possible à tout moment.'
          : 'By signing up, you consent to receive our newsletter. Unsubscribe at any time.'}
      </p>
    </div>
  );
};

export default LeadForm;
