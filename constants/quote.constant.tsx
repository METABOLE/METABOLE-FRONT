import { QUOTE_ANIMATIONS, QUOTE_STEPS } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const STEPS = [
  {
    id: 'step-1-pages',
    title: {
      fr: 'Pages de votre site',
      en: 'Pages of your site',
    },
    description: {
      fr: (
        <p>
          <span className="text-black">Combien de pages ?</span>
          <br />
          <span className="text-black-30">
            Nommez les pages que vous souhaitez (ex : Accueil, Contact, À propos…).
          </span>
        </p>
      ),
      en: (
        <p>
          <span className="text-black">How many pages?</span>
          <br />
          <span className="text-black-30">
            Name the pages you want (e.g. Home, Contact, About…).
          </span>
        </p>
      ),
    },
    button: {
      next: {
        fr: 'Suivant',
        en: 'Next',
      },
      reset: {
        fr: 'Réinitialiser',
        en: 'Reset',
      },
    },
    type: QUOTE_STEPS.PAGES,
  },
  {
    id: 'step-2-animations',
    title: {
      fr: 'Type d’animation',
      en: 'Type of animation',
    },
    description: {
      fr: (
        <p>
          <span className="text-black">Quel niveau d’animation ?</span>
          <br />
          <span className="text-black-30">
            • Légères : transitions simples.
            <br />
            • Immersives : effets de scroll.
            <br />• Interactives : storytelling, animations complexes.
          </span>
        </p>
      ),
      en: (
        <p>
          <span className="text-black">Animation level?</span>
          <br />
          <span className="text-black-30">
            • Light: simple transitions.
            <br />
            • Immersive: scroll effects.
            <br />• Interactive: storytelling, advanced motion.
          </span>
        </p>
      ),
    },
    button: {
      next: {
        fr: 'Suivant',
        en: 'Next',
      },
      reset: {
        fr: 'Réinitialiser',
        en: 'Reset',
      },
    },
    type: QUOTE_STEPS.ANIMATIONS,
  },
  {
    id: 'step-3-options',
    title: {
      fr: 'Options',
      en: 'Options',
    },
    description: {
      fr: (
        <p>
          <span className="text-black">Fonctionnalités globales</span>
          <br />
          <span className="text-black-30">
            Multilingue, CMS, SEO… sélectionnez ce qui vous est utile.
          </span>
        </p>
      ),
      en: (
        <p>
          <span className="text-black">Global features</span>
          <br />
          <span className="text-black-30">Multilingual, CMS, SEO… pick what matters to you.</span>
        </p>
      ),
    },
    button: {
      next: {
        fr: 'Suivant',
        en: 'Next',
      },
      reset: {
        fr: 'Réinitialiser',
        en: 'Reset',
      },
    },
    type: QUOTE_STEPS.OPTIONS,
  },
  {
    id: 'step-4-finalisation',
    title: {
      fr: 'Finalisation',
      en: 'Finalisation',
    },
    description: {
      fr: (
        <p>
          <span className="text-black">Votre brief est prêt</span>
          <br />
          <span className="text-black-30">
            Merci. Nous allons étudier votre demande et vous recontacter sous 48h avec une
            proposition sur-mesure.
          </span>
        </p>
      ),
      en: (
        <p>
          <span className="text-black">Your brief is ready</span>
          <br />
          <span className="text-black-30">
            Thank you. We will review your request and get back to you within 48 hours with a
            tailored proposal.
          </span>
        </p>
      ),
    },
    button: {
      next: {
        fr: 'Terminer',
        en: 'Finish',
      },
      reset: {
        fr: 'Réinitialiser',
        en: 'Reset',
      },
    },
    type: QUOTE_STEPS.FINAL,
  },
];

export const TJM = 500;

// PAGES
export const PAGES = [
  {
    id: uuidv4(),
    title: { fr: 'Accueil', en: 'Home' },
  },
  {
    id: uuidv4(),
    title: { fr: 'Contact', en: 'Contact' },
  },
  {
    id: uuidv4(),
    title: { fr: 'À propos', en: 'About' },
  },
];

// ANIMATIONS
export const ANIMATIONS = {
  LIGHT: {
    type: QUOTE_ANIMATIONS.LIGHT,
    title: { fr: 'Légères', en: 'Light' },
  },
  IMMERSIVES: {
    type: QUOTE_ANIMATIONS.IMMERSIVES,
    title: { fr: 'Immersives', en: 'Immersive' },
  },
  ADVANCED: {
    type: QUOTE_ANIMATIONS.ADVANCED,
    title: { fr: 'Interactivité poussée', en: 'Advanced interactivity' },
  },
};

// OPTIONS
export const OPTIONS = [
  {
    title: { fr: 'Multilingue', en: 'Multilingual' },
    description: {
      fr: 'Support de plusieurs langues avec traductions automatiques.',
      en: 'Multi-language support with automatic translations.',
    },
  },
  {
    title: { fr: 'CMS', en: 'CMS' },
    description: {
      fr: 'Gestion de contenu simple et intuitive.',
      en: 'Simple and intuitive content management.',
    },
  },
  {
    title: { fr: 'SEO', en: 'SEO' },
    description: {
      fr: 'Optimisation pour les moteurs de recherche.',
      en: 'Search engine optimization features.',
    },
  },
];
