import Button from '@/components/Button';
import Input from '@/components/Input';
import Typography from '@/components/Typography';
import { useLanguage } from '@/providers/language.provider';
import { postUnsubscribeNewsletter } from '@/services/newsletter.service';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type UnsubscribeStatus = 'idle' | 'loading' | 'success' | 'error';

const UnsubscribePage = () => {
  const { isFrench } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<UnsubscribeStatus>('idle');
  const searchParams = useSearchParams();

  // Extraction de l'email des paramètres d'URL au chargement de la page
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      // Décoder l'email s'il est encodé pour l'URL
      const decodedEmail = decodeURIComponent(emailParam);
      setEmail(decodedEmail);
    }
  }, [searchParams]);

  // Mutation pour la désinscription
  const unsubscribeMutation = useMutation({
    mutationFn: (email: string) => postUnsubscribeNewsletter({ email }),
    onMutate: () => {
      setStatus('loading');
    },
    onSuccess: () => {
      setStatus('success');
    },
    onError: () => {
      setStatus('error');
    },
  });

  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && status !== 'loading') {
      unsubscribeMutation.mutate(email);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-12">
      <div className="bg-blur-glass relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl p-8 text-black backdrop-blur-xl">
        <div className="mb-8 flex flex-col space-y-6">
          <Typography className="text-center" variant="h2">
            {isFrench ? 'Se désinscrire' : 'Unsubscribe'}
          </Typography>
          <Typography className="text-black-70 text-center" variant="p">
            {isFrench
              ? 'Entrez votre adresse e-mail pour vous désinscrire de notre newsletter.'
              : 'Enter your email address to unsubscribe from our newsletter.'}
          </Typography>
        </div>

        {status !== 'success' ? (
          <form className="flex flex-col space-y-6">
            <Input
              name="email"
              placeholder={isFrench ? 'Votre adresse e-mail' : 'Your email address'}
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="mx-auto w-fit">
              <Button color="secondary" onClick={handleSubmit}>
                {isFrench ? 'Se désinscrire' : 'Unsubscribe'}
              </Button>
            </div>

            {status === 'error' && (
              <div className="rounded-lg bg-red-50 p-4 text-center text-red-800">
                {isFrench
                  ? 'Une erreur est survenue. Veuillez réessayer plus tard.'
                  : 'An error occurred. Please try again later.'}
              </div>
            )}
          </form>
        ) : (
          <div className="rounded-lg bg-green-50 p-6 text-center">
            <div className="mb-4 flex justify-center">
              <svg
                fill="none"
                height="48"
                viewBox="0 0 48 48"
                width="48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="24" fill="#3B82F6" fillOpacity="0.1" r="24" />
                <path
                  d="M32 18L22 28L16 22"
                  stroke="#3B82F6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <Typography className="mb-2" variant="h4">
              {isFrench ? 'Désinscription réussie' : 'Successfully unsubscribed'}
            </Typography>
            <Typography className="text-black-70" variant="p">
              {isFrench
                ? 'Vous ne recevrez plus nos communications marketing.'
                : 'You will no longer receive our marketing communications.'}
            </Typography>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            className="text-blue-600 transition-colors hover:underline focus:outline-none"
            href="/"
          >
            {isFrench ? "Retour à l'accueil" : 'Back to home'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnsubscribePage;
