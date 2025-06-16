import Button from '@/components/ui/Button';
import { IconArrow } from '@/components/ui/Icons';
import Input from '@/components/ui/Input';
import Typography from '@/components/ui/Typography';
import NewsletterLayout from '@/layout/newsletter';
import { NextPageWithLayout } from '@/pages/_app';
import { useLanguage } from '@/providers/language.provider';
import { postUnsubscribeNewsletter } from '@/services/newsletter.service';
import { COLORS, FORM_STATUS } from '@/types';
import { NewsletterUnsubscribeData } from '@/types/newsletter.type';
import { isEmail } from '@/utils/validation.utils';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

const UnsubscribePage: NextPageWithLayout = () => {
  const { isFrench, getInternalPath } = useLanguage();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState(FORM_STATUS.DEFAULT);
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      const decodedEmail = decodeURIComponent(emailParam);
      setEmail(decodedEmail);
    }
  }, [searchParams]);

  const getButtonText = () => {
    const texts = {
      [FORM_STATUS.SUCCESS]: isFrench ? 'Désinscrit' : 'Unsubscribed',
      [FORM_STATUS.ERROR]: isFrench ? 'Erreur' : 'Error',
      [FORM_STATUS.DEFAULT]: isFrench ? 'Se désinscrire' : 'Unsubscribe',
      [FORM_STATUS.PENDING]: isFrench ? 'Chargement...' : 'Loading...',
    };

    return texts[formStatus];
  };

  const unsubscribeMutation = useMutation({
    mutationFn: ({ email }: NewsletterUnsubscribeData) => postUnsubscribeNewsletter({ email }),
    onSuccess: (data) => {
      console.info('Désinscription réussie', data);
      inputRef.current?.blur();
      setIsLoading(false);
      setFormStatus(FORM_STATUS.SUCCESS);
      setSuccess(isFrench ? 'Désinscription réussie' : 'Unsubscription successful');
      setEmail('');
      setTimeout(() => {
        setSuccess('');
        setFormStatus(FORM_STATUS.DEFAULT);
      }, 3000);
    },
    onError: (error) => {
      setIsLoading(false);
      setFormStatus(FORM_STATUS.ERROR);
      setError(isFrench ? 'Erreur de désinscription' : 'Unsubscription error');
      console.error('ERROR : ', error);
      setTimeout(() => {
        setFormStatus(FORM_STATUS.DEFAULT);
      }, 3000);
    },
    onMutate: () => {
      setIsLoading(true);
      setFormStatus(FORM_STATUS.PENDING);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return setError(isFrench ? 'Veuillez entrer votre email' : 'Please enter your email');
    }

    if (!isEmail(email)) {
      return setError(isFrench ? 'Email invalide' : 'Invalid email');
    }

    setError('');
    unsubscribeMutation.mutate({ email });
  };

  return (
    <div className="px-x-default py-y-default flex h-3/4 items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-96 flex-col gap-12 overflow-hidden rounded-3xl bg-[#C5C4FF]/7 p-6 text-white backdrop-blur-xl">
        <Typography className="p3 uppercase" variant="p">
          {isFrench ? 'Se désinscrire' : 'Unsubscribe'}
        </Typography>
        <form className="" onSubmit={handleSubmit}>
          <Input
            errorMessage={error}
            isLoading={isLoading}
            name="email"
            placeholder="john@company.com"
            successMessage={success}
            type="email"
            value={email}
            label={
              isFrench
                ? 'Entrez votre adresse e-mail pour vous désinscrire de notre newsletter.'
                : 'Enter your email address to unsubscribe from our newsletter.'
            }
            required
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
          <Button
            className="mt-12"
            color="tertiary"
            disabled={formStatus === FORM_STATUS.PENDING || formStatus === FORM_STATUS.SUCCESS}
          >
            {getButtonText()}
          </Button>
        </form>
        <Link
          className="flex cursor-pointer items-center gap-3 text-white"
          href={getInternalPath('/')}
          scroll={false}
        >
          <IconArrow className="rotate-45" color={COLORS.WHITE} />
          {isFrench ? "Retour à l'accueil" : 'Back to home'}
        </Link>
      </div>
    </div>
  );
};

UnsubscribePage.getLayout = function getLayout(page: ReactElement) {
  return <NewsletterLayout>{page}</NewsletterLayout>;
};

export default UnsubscribePage;

export async function getStaticPaths() {
  return {
    paths: [{ params: { lang: 'en' } }, { params: { lang: 'fr' } }],
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
