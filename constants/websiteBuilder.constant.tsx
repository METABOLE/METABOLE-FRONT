import { WEBSITE_BUILDER_ANIMATIONS, WEBSITE_BUILDER_STEPS } from '@/types';
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
            Nommez vos pages (ex : Accueil, Contact…) et précisez le nombre de sections par page.
          </span>
        </p>
      ),
      en: (
        <p>
          <span className="text-black">How many pages?</span>
          <br />
          <span className="text-black-30">
            Name each page (e.g. Home, Contact) and estimate how many sections it will contain.
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
    type: WEBSITE_BUILDER_STEPS.PAGES,
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
    type: WEBSITE_BUILDER_STEPS.ANIMATIONS,
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
    type: WEBSITE_BUILDER_STEPS.OPTIONS,
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
          <span className="text-black">Votre estimation est prête</span>
          <br />
          <span className="text-black-30">
            Vous pouvez ajuster vos choix ou demander un devis sur-mesure.
          </span>
        </p>
      ),
      en: (
        <p>
          <span className="text-black">Your estimate is ready</span>
          <br />
          <span className="text-black-30">Adjust your choices or request a custom quote.</span>
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
    type: WEBSITE_BUILDER_STEPS.FINAL,
  },
];

export const TJM = 500;

// PAGES
export const PAGES = [
  {
    id: uuidv4(),
    title: { fr: 'Accueil', en: 'Home' },
    days: 2.5,
  },
  {
    id: uuidv4(),
    title: { fr: 'Contact', en: 'Contact' },
    days: 1,
  },
  {
    id: uuidv4(),
    title: { fr: 'À propos', en: 'About' },
    days: 1,
  },
];

// ANIMATIONS
export const ANIMATIONS = {
  LIGHT: {
    type: WEBSITE_BUILDER_ANIMATIONS.LIGHT,
    title: { fr: 'Légères', en: 'Light' },
    percent: 0.1,
  },
  IMMERSIVES: {
    type: WEBSITE_BUILDER_ANIMATIONS.IMMERSIVES,
    title: { fr: 'Immersives', en: 'Immersive' },
    percent: 0.25,
  },
  ADVANCED: {
    type: WEBSITE_BUILDER_ANIMATIONS.ADVANCED,
    title: { fr: 'Interactivité poussée', en: 'Advanced interactivity' },
    percent: 0.5,
  },
};

// OPTIONS
export const OPTIONS = [
  {
    title: { fr: 'Multilingue', en: 'Multilingual' },
    days: 1.5,
  },
  {
    title: { fr: 'CMS', en: 'CMS' },
    days: 2,
  },
  {
    title: { fr: 'SEO', en: 'SEO' },
    days: 1,
  },
];
