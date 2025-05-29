import { WEBSITE_BUILDER_STEPS } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const STEPS = [
  {
    title: {
      fr: 'Pages de votre site',
      en: 'Pages of your site',
    },
    description: {
      fr: (
        <p>
          <span className="text-black">Combien de pages pour raconter votre histoire ?</span>
          <br />
          <span className="text-black-30">
            Ajoutez et supprimez des pages en fonction de vos besoins. Vous pouvez nommer vos pages
            pour vous repérer
          </span>
        </p>
      ),
      en: (
        <p>
          <span className="text-black">How many pages to tell your story?</span>
          <br />
          <span className="text-black-30">
            Add and remove pages as needed. You can name your pages to keep track of them.
          </span>
        </p>
      ),
    },
    type: WEBSITE_BUILDER_STEPS.PAGES,
  },
  {
    title: {
      fr: 'Type d’animation',
      en: 'Type of animation',
    },
    description: {
      fr: (
        <p>
          <span className="text-black">Fonctionnalités, modules, intégrations.</span>
          <br />
          <span className="text-black-30">
            Blog, formulaire, multilingue, carte, CMS… cochez ce dont vous avez besoin. Tout est
            pensé pour vous simplifier la vie sans compromettre l'esthétique.
          </span>
        </p>
      ),
      en: (
        <p>
          <span className="text-black">Animation type</span>
          <br />
          <span className="text-black-30">
            Choose the animation type that best suits your needs. You can select from light,
            immersive, or advanced interactivity animations.
          </span>
        </p>
      ),
    },
    type: WEBSITE_BUILDER_STEPS.ANIMATIONS,
  },
  {
    title: {
      fr: 'Options',
      en: 'Options',
    },
    description: {
      fr: (
        <p>
          <span className="text-black">Fonctionnalités, modules, intégrations.</span>
          <br />
          <span className="text-black-30">
            Blog, formulaire, multilingue, carte, CMS… cochez ce dont vous avez besoin. Tout est
            pensé pour vous simplifier la vie sans compromettre l'esthétique.
          </span>
        </p>
      ),
      en: (
        <p>
          <span className="text-black">Features, modules, integrations.</span>
          <br />
          <span className="text-black-30">
            Blog, form, multilingual, map, CMS... check what you need. Everything is designed to
            make your life easier without compromising aesthetics.
          </span>
        </p>
      ),
    },
    type: WEBSITE_BUILDER_STEPS.OPTIONS,
  },
  {
    title: {
      fr: 'Finalisation',
      en: 'Finalisation',
    },
    description: {
      fr: (
        <p>
          <span className="text-black">Finalisez votre devis.</span>
          <br />
          <span className="text-black-30">
            Vous pouvez modifier vos choix à tout moment. Vous pouvez également demander un devis
            personnalisé.
          </span>
        </p>
      ),
      en: (
        <p>
          <span className="text-black">Finalize your quote.</span>
          <br />
          <span className="text-black-30">
            You can modify your choices at any time. You can also request a custom quote.
          </span>
        </p>
      ),
    },
    type: WEBSITE_BUILDER_STEPS.FINAL,
  },
];

export const PAGES = [
  {
    id: uuidv4(),
    title: {
      fr: 'Accueil',
      en: 'Home',
    },
    pricing: 1000,
  },
  {
    id: uuidv4(),
    title: {
      fr: 'Contact',
      en: 'Contact',
    },
    pricing: 500,
  },
  {
    id: uuidv4(),
    title: {
      fr: 'À propos',
      en: 'About',
    },
    pricing: 500,
  },
  {
    id: uuidv4(),
    title: {
      fr: 'Blog',
      en: 'Blog',
    },
    pricing: 1000,
  },
  {
    id: uuidv4(),
    title: {
      fr: 'Equipe',
      en: 'Team',
    },
    pricing: 700,
  },
  {
    id: uuidv4(),
    title: {
      fr: 'Services',
      en: 'Services',
    },
    pricing: 800,
  },
  {
    id: uuidv4(),
    title: {
      fr: 'Réalisations',
      en: 'Projects',
    },
    pricing: 600,
  },
];

export const ANIMATIONS = {
  LIGHT: {
    title: {
      fr: 'Légères',
      en: 'Light',
    },
    percent: 0.1,
  },
  IMMERSIVES: {
    title: {
      fr: 'Immersives',
      en: 'Immersive',
    },
    percent: 0.25,
  },

  ADVANCED: {
    title: {
      fr: 'Intéractivité poussée',
      en: 'Advanced interactivity',
    },
    percent: 0.5,
  },
};

export const OPTIONS = [
  {
    title: {
      fr: 'Blog',
      en: 'Blog',
    },
    pricing: 100,
  },
  {
    title: {
      fr: 'Multilingue',
      en: 'Multilingual',
    },
    pricing: 200,
  },
  {
    title: {
      fr: 'CMS',
      en: 'CMS',
    },
    pricing: 300,
  },
  {
    title: {
      fr: 'Formulaire',
      en: 'Form',
    },
    pricing: 400,
  },
  {
    title: {
      fr: 'Carte',
      en: 'Map',
    },
    pricing: 500,
  },
  {
    title: {
      fr: 'SEO',
      en: 'SEO',
    },
    pricing: 600,
  },
  {
    title: {
      fr: 'Intégration API',
      en: 'API integration',
    },
    pricing: 700,
  },
];
