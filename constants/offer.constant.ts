import { CONTACT_TYPE_VALUES, OFFER_TYPE } from '@/types';

export const OFFERS = [
  {
    type: OFFER_TYPE.LANDING,
    title: {
      en: 'PREMIUM LANDING PAGE',
      fr: 'LANDING PAGE PREMIUM',
    },
    startingPrice: '4500',
    options: [
      {
        title: {
          en: 'Up to 6 sections',
          fr: "Jusqu'à 6 sections",
        },
      },
      {
        title: {
          en: 'Elegant animations on every section',
          fr: 'Animations élégantes sur chaque section',
        },
      },
      {
        title: {
          en: '100% custom design',
          fr: 'Design 100% sur-mesure',
        },
      },
      {
        title: {
          en: 'Responsive design (mobile)',
          fr: 'Responsive design (mobile)',
        },
      },
      {
        title: {
          en: 'Technical SEO',
          fr: 'SEO technique',
        },
      },
      {
        title: {
          en: 'Available options: simple CMS, multilingual, etc...',
          fr: 'Options possibles : CMS simple, multilingue, etc...',
        },
      },
    ],
    delivery: {
      title: {
        en: 'Fast delivery',
        fr: 'Livraison rapide',
      },
      description: {
        en: '3 to 4 weeks',
        fr: '3 à 4 semaines',
      },
    },
    href: '/contact?type=' + CONTACT_TYPE_VALUES.LANDING,
  },
  {
    type: OFFER_TYPE.SIMPLE,
    title: {
      en: 'SIGNATURE WEBSITE',
      fr: 'SITE SIGNATURE',
    },
    startingPrice: '6500',
    options: [
      {
        title: {
          en: '3 to 6 pages',
          fr: 'De 3 à 6 pages',
        },
      },
      {
        title: {
          en: 'Elegant animations on every page',
          fr: 'Animations élégantes sur chaque page',
        },
      },
      {
        title: {
          en: '100% custom design',
          fr: 'Design 100% sur-mesure',
        },
      },
      {
        title: {
          en: 'Responsive design (mobile)',
          fr: 'Responsive design (mobile)',
        },
      },
      {
        title: {
          en: 'Technical SEO',
          fr: 'SEO technique',
        },
      },
      {
        title: {
          en: 'Available options: simple CMS, multilingual, blog, etc...',
          fr: 'Options possibles : CMS simple, multilingue, blog, etc...',
        },
      },
    ],
    delivery: {
      title: {
        en: 'Delivery',
        fr: 'Livraison',
      },
      description: {
        en: '6 to 8 weeks',
        fr: '6 à 8 semaines',
      },
    },
    href: '/contact?type=' + CONTACT_TYPE_VALUES.SIMPLE,
  },
  {
    type: OFFER_TYPE.CUSTOM,
    title: {
      en: 'CUSTOM WEBSITE',
      fr: 'SITE SUR-MESURE',
    },
    startingPrice: 'Custom',
    options: [
      {
        title: {
          en: 'Unlimited pages',
          fr: 'Nombre de pages illimité',
        },
      },
      {
        title: {
          en: 'Immersive animations',
          fr: 'Animations immersives',
        },
      },
      {
        title: {
          en: '100% custom design',
          fr: 'Design 100% sur-mesure',
        },
      },
      {
        title: {
          en: 'Responsive design (mobile)',
          fr: 'Responsive design (mobile)',
        },
      },
      {
        title: {
          en: 'Technical SEO',
          fr: 'SEO technique',
        },
      },
      {
        title: {
          en: 'Available options: simple CMS, multilingual, blog, etc...',
          fr: 'Options possibles : CMS simple, multilingue, blog, etc...',
        },
      },
    ],
    delivery: {
      title: {
        en: 'Delivery',
        fr: 'Livraison',
      },
      description: {
        en: '6+ weeks',
        fr: '+ 6 semaines',
      },
    },
    href: '/contact?type=' + CONTACT_TYPE_VALUES.CUSTOM,
  },
];
