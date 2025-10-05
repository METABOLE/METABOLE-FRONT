import { CONTACT_TYPE_VALUES, OFFER_TYPE } from '@/types';

export const OFFERS = [
  {
    type: OFFER_TYPE.ONE_PAGE,
    title: {
      en: 'ONE-PAGE',
      fr: 'ONE-PAGE',
    },
    description: {
      en: 'A modern single-page website with smooth animations and responsive design. Perfect for portfolios and landing pages.',
      fr: "Un site web moderne d'une seule page avec des animations fluides et un design responsive. Parfait pour les portfolios et pages d'atterrissage.",
    },
    scope: [
      {
        title: {
          fr: '1 page',
          en: '1 page',
        },
      },
      {
        title: {
          fr: '8 sections',
          en: '8 sections',
        },
      },
      {
        title: {
          fr: 'Page contact',
          en: 'Contact page',
        },
      },
      {
        title: {
          fr: 'Pages légales',
          en: 'Legal pages',
        },
      },
    ],
    services: [
      {
        isIncluded: true,
        title: {
          fr: 'Design',
          en: 'Design',
        },
      },
      {
        isIncluded: true,
        title: {
          fr: 'Développement',
          en: 'Development',
        },
      },
      {
        isIncluded: true,
        title: {
          fr: 'Animations',
          en: 'Animations',
        },
      },
      {
        isIncluded: false,
        title: {
          fr: 'CMS',
          en: 'CMS',
        },
      },
      {
        isIncluded: false,
        title: {
          fr: 'Branding',
          en: 'Branding',
        },
      },
      {
        isIncluded: false,
        title: {
          fr: 'Stratégie',
          en: 'Strategy',
        },
      },
      {
        isIncluded: false,
        title: {
          fr: 'Copywriting',
          en: 'Copywriting',
        },
      },
      {
        isIncluded: false,
        title: {
          fr: '3D',
          en: '3D',
        },
      },
    ],
    timing: '4-6',
    videoUrl: '/videos/one-page.mp4',
    href: '/contact?type=' + CONTACT_TYPE_VALUES.ONE_PAGE,
  },
  {
    type: OFFER_TYPE.WEBSITE,
    title: {
      en: 'WEBSITE',
      fr: 'WEBSITE',
    },
    description: {
      en: 'A complete website with multiple pages, CMS integration, and custom branding. Perfect for professional businesses.',
      fr: 'Un site web complet avec plusieurs pages, intégration CMS et branding personnalisé. Parfait pour les entreprises professionnelles.',
    },
    scope: [
      {
        title: {
          fr: '3 à 6 pages',
          en: '3 to 6 pages',
        },
      },
      {
        title: {
          fr: '8 à 10 sections / pages',
          en: '8 to 10 sections / pages',
        },
      },
      {
        title: {
          fr: 'Page contact',
          en: 'Contact page',
        },
      },
      {
        title: {
          fr: 'Pages légales',
          en: 'Legal pages',
        },
      },
    ],
    services: [
      {
        isIncluded: true,
        title: {
          fr: 'Design',
          en: 'Design',
        },
      },
      {
        isIncluded: true,
        title: {
          fr: 'Développement',
          en: 'Development',
        },
      },
      {
        isIncluded: true,
        title: {
          fr: 'Animations',
          en: 'Animations',
        },
      },
      {
        isIncluded: true,
        title: {
          fr: 'CMS',
          en: 'CMS',
        },
      },
      {
        isIncluded: true,
        title: {
          fr: 'Branding',
          en: 'Branding',
        },
      },
      {
        isIncluded: false,
        title: {
          fr: 'Stratégie',
          en: 'Strategy',
        },
      },
      {
        isIncluded: false,
        title: {
          fr: 'Copywriting',
          en: 'Copywriting',
        },
      },
      {
        isIncluded: false,
        title: {
          fr: '3D',
          en: '3D',
        },
      },
    ],
    timing: '6-10',
    videoUrl: '/videos/website.mp4',
    href: '/contact?type=' + CONTACT_TYPE_VALUES.WEBSITE,
  },
  {
    type: OFFER_TYPE.WEB_EXPERIENCE,
    title: {
      en: 'WEB EXPERIENCE',
      fr: 'EXPÉRIENCE WEB',
    },
    description: {
      en: 'The ultimate digital experience with unlimited pages, 3D elements, strategy, and copywriting. For ambitious projects.',
      fr: "L'expérience numérique ultime avec des pages illimitées, éléments 3D, stratégie et copywriting. Pour les projets ambitieux.",
    },
    scope: [
      {
        title: {
          fr: 'Pages illimitées',
          en: 'Unlimited pages',
        },
      },
      {
        title: {
          fr: 'Sections illimitées',
          en: 'Unlimited sections',
        },
      },
      {
        title: {
          fr: 'Page contact',
          en: 'Contact page',
        },
      },
      {
        title: {
          fr: 'Pages légales',
          en: 'Legal pages',
        },
      },
    ],
    services: [
      {
        isIncluded: true,
        title: {
          fr: 'Design',
          en: 'Design',
        },
      },
      {
        isIncluded: true,
        title: {
          fr: 'Développement',
          en: 'Development',
        },
      },
      {
        isIncluded: true,
        title: {
          fr: 'Animations',
          en: 'Animations',
        },
      },
      {
        isIncluded: true,
        title: {
          fr: 'CMS',
          en: 'CMS',
        },
      },
      {
        isIncluded: true,
        title: {
          fr: 'Branding',
          en: 'Branding',
        },
      },
      {
        isIncluded: true,
        title: {
          fr: 'Stratégie',
          en: 'Strategy',
        },
      },
      {
        isIncluded: true,
        title: {
          fr: 'Copywriting',
          en: 'Copywriting',
        },
      },
      {
        isIncluded: true,
        title: {
          fr: '3D',
          en: '3D',
        },
      },
    ],
    timing: '8-12',
    videoUrl: '/videos/web-experience.mp4',
    href: '/contact?type=' + CONTACT_TYPE_VALUES.WEB_EXPERIENCE,
  },
];
