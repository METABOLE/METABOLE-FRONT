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
    id: 'step-2-animations',
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
    id: 'step-3-options',
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
    id: 'step-4-finalisation',
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

export const TJM = 500;

// ----------------------
// Pages disponibles
// ----------------------

export const PAGES = [
  // Pages essentielles
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
    title: { fr: 'Mentions légales', en: 'Legal notice' },
    days: 0.3,
  },
  {
    id: uuidv4(),
    title: { fr: 'Page 404', en: '404 Page' },
    days: 0.5,
  },

  // Pages de contenu
  {
    id: uuidv4(),
    title: { fr: 'À propos', en: 'About' },
    days: 1,
  },
  {
    id: uuidv4(),
    title: { fr: 'Équipe', en: 'Team' },
    days: 1.2,
  },
  {
    id: uuidv4(),
    title: { fr: 'Services', en: 'Services' },
    days: 1.2,
  },
  {
    id: uuidv4(),
    title: { fr: 'Réalisations', en: 'Projects' },
    days: 2,
  },
  {
    id: uuidv4(),
    title: { fr: 'Détail projet', en: 'Project detail' },
    days: 1.5,
  },
  {
    id: uuidv4(),
    title: { fr: 'Blog', en: 'Blog' },
    days: 1.2,
  },
  {
    id: uuidv4(),
    title: { fr: 'Article', en: 'Article' },
    days: 1,
  },
];

// ----------------------
// Niveaux d'animation
// ----------------------

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

// ----------------------
// Options fonctionnelles
// ----------------------

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
    title: { fr: 'Formulaire', en: 'Form' },
    days: 1,
  },
  {
    title: { fr: 'Carte', en: 'Map' },
    days: 1.5,
  },
  {
    title: { fr: 'SEO', en: 'SEO' },
    days: 1,
  },
  {
    title: { fr: 'APIs', en: 'APIs' },
    days: 2,
  },
  {
    title: { fr: 'Blog', en: 'Blog' },
    days: 3,
  },
  {
    title: { fr: 'E-commerce', en: 'E-commerce' },
    days: 4,
  },
];
