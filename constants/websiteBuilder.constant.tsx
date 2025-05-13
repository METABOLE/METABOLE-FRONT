import { WEBSITE_BUILDER_STEPS } from '@/types';

export const STEPS = [
  {
    title: 'Pages du site',
    description: (
      <p>
        <span className="text-black">Combien de pages pour raconter votre histoire ?</span>
        <br />
        <span className="text-black-30">
          Ajoutez et supprimez des pages en fonction de vos besoins. Vous pouvez nommer vos pages
          pour vous repérer
        </span>
      </p>
    ),
    type: WEBSITE_BUILDER_STEPS.PAGES,
  },
  {
    title: 'Type d’animations',
    description: (
      <p>
        <span className="text-black">Fonctionnalités, modules, intégrations.</span>
        <br />
        <span className="text-black-30">
          Blog, formulaire, multilingue, carte, CMS… cochez ce dont vous avez besoin. Tout est pensé
          pour vous simplifier la vie sans compromettre l'esthétique.
        </span>
      </p>
    ),
    type: WEBSITE_BUILDER_STEPS.ANIMATIONS,
  },
  {
    title: 'Options',
    description: (
      <p>
        <span className="text-black">Fonctionnalités, modules, intégrations.</span>
        <br />
        <span className="text-black-30">
          Blog, formulaire, multilingue, carte, CMS… cochez ce dont vous avez besoin. Tout est pensé
          pour vous simplifier la vie sans compromettre l'esthétique.
        </span>
      </p>
    ),
    type: WEBSITE_BUILDER_STEPS.OPTIONS,
  },
];

export const PAGES = [
  {
    id: crypto.randomUUID(),
    title: {
      fr: 'Accueil',
      en: 'Home',
    },
    pricing: 1000,
  },
  {
    id: crypto.randomUUID(),
    title: {
      fr: 'Contact',
      en: 'Contact',
    },
    pricing: 500,
  },
  {
    id: crypto.randomUUID(),
    title: {
      fr: 'À propos',
      en: 'About',
    },
    pricing: 500,
  },
  {
    id: crypto.randomUUID(),
    title: {
      fr: 'Blog',
      en: 'Blog',
    },
    pricing: 1000,
  },
  {
    id: crypto.randomUUID(),
    title: {
      fr: 'Equipe',
      en: 'Team',
    },
    pricing: 700,
  },
  {
    id: crypto.randomUUID(),
    title: {
      fr: 'Services',
      en: 'Services',
    },
    pricing: 800,
  },
  {
    id: crypto.randomUUID(),
    title: {
      fr: 'Réalisations',
      en: 'Projects',
    },
    pricing: 600,
  },
];

export const ANIMATIONS = [
  {
    title: {
      fr: 'Légères',
      en: 'Light',
    },
    pricing: 100,
  },
  {
    title: {
      fr: 'Immersives',
      en: 'Immersive',
    },
    pricing: 200,
  },
  {
    title: {
      fr: 'Intéractivité poussée',
      en: 'Advanced interactivity',
    },
    pricing: 300,
  },
];

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
