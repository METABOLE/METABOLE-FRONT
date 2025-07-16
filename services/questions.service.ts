const questions = [
  {
    id: 1,
    question: {
      en: 'What is creative coding and how does it enhance our website?',
      fr: "Qu'est-ce que le creative coding et comment améliore-t-il notre site web ?",
    },
    answer: {
      en: 'Creative coding combines programming with artistic expression to create unique, interactive digital experiences. We use technologies like Three.js, WebGL, and advanced animations to transform your website into an engaging, memorable experience that sets you apart from competitors.',
      fr: 'Le creative coding combine programmation et expression artistique pour créer des expériences numériques uniques et interactives. Nous utilisons des technologies comme Three.js, WebGL et des animations avancées pour transformer votre site en une expérience engageante et mémorable qui vous démarque.',
    },
  },
  {
    id: 2,
    question: {
      en: 'How much does a creative website cost?',
      fr: 'Combien coûte un site web créatif ?',
    },
    answer: {
      en: 'Our projects start at 5,500 € HT, for a custom landing page. Each quote is adjusted based on the project complexity, content to produce, animations, and specific needs. For more information, please visit our pricing page.',
      fr: "Nos projets débutent à 5 500 € HT, pour une landing page sur mesure. Chaque devis est ajusté selon la complexité du projet, le contenu à produire, les animations et les besoins spécifiques. Pour plus d'informations, consultez notre page tarifs.",
    },
    link: {
      url: '/pricing',
      text: {
        en: 'Our pricing',
        fr: 'Nos tarifs',
      },
    },
  },
  {
    id: 3,
    question: {
      en: 'How long does a project take?',
      fr: 'Combien de temps dure un projet ?',
    },
    answer: {
      en: 'A landing page generally takes 3 to 4 weeks. For a complete site, it takes 5 to 7 weeks. We establish a clear plan from the start, based on the project scope.',
      fr: 'Une landing page prend généralement entre 3 et 4 semaines. Pour un site complet, il faut compter entre 5 et 7 semaines. On établit un planning clair dès le départ, en fonction du périmètre du projet.',
    },
    link: {
      url: '/services#process',
      text: {
        en: 'Our process',
        fr: 'Notre processus',
      },
    },
  },
  {
    id: 4,
    question: {
      en: 'Do you also do branding or visual identity?',
      fr: 'Est-ce que vous faites aussi du branding ou de l’identité visuelle ?',
    },
    answer: {
      en: 'Web design is at the heart of our approach, but we also offer photography, motion design, illustrations, or any other creative content needed to enhance your project.',
      fr: 'Le web design est au centre de notre approche, mais on propose aussi de la photographie, du motion design, des illustrations, ou tout autre contenu créatif nécessaire pour sublimer votre projet.',
    },
  },
  {
    id: 5,
    question: {
      en: 'Why choose Metabole instead of an agency or a freelancer?',
      fr: 'Pourquoi choisir Metabole plutôt qu’une agence ou un freelance ?',
    },
    answer: {
      en: 'We are a small studio, creative but demanding, who really get involved in each project. We design few websites per year, but each one is unique, tailored, and thought through. We are not a big agency, but we are a team of 2, who are passionate about what we do.',
      fr: 'On est un studio à taille humaine, créatif mais exigeant, qui s’implique réellement dans chaque projet. On conçoit peu de sites par an, mais chacun est unique, sur mesure, et pensé dans le détail.',
    },
    link: {
      url: '/team',
      text: {
        en: 'Our team',
        fr: 'Notre équipe',
      },
    },
  },
  {
    id: 6,
    question: {
      en: 'Do you provide ongoing support and maintenance?',
      fr: 'Est-ce que vous assurez un suivi après la livraison ?',
    },
    answer: {
      en: 'Yes, we offer ongoing support and maintenance. We are available for adjustments, page additions, or variations. And if the project evolves, we can continue to accompany you over time.',
      fr: 'Oui. On reste disponibles pour des ajustements, ajouts de pages ou déclinaisons. Et si le projet évolue, on peut continuer à vous accompagner dans la durée.',
    },
  },
  {
    id: 7,
    question: {
      en: 'Do you work on partial projects? (ex: just one page)',
      fr: 'Est-ce que vous travaillez sur des projets partiels ? (ex : juste une page)',
    },
    answer: {
      en: 'Yes, if the brief is clear and corresponds to our level of expertise. We can also intervene creatively on larger projects, in collaboration with your teams or partners.',
      fr: 'Oui, si le brief est clair et qu’il correspond à notre niveau d’exigence. On peut aussi intervenir en renfort créatif sur des projets plus larges, en collaboration avec vos équipes ou prestataires.',
    },
  },
  {
    id: 8,
    question: {
      en: 'What technologies do you use for creative websites?',
      fr: 'Quelles technologies utilisez-vous pour les sites créatifs ?',
    },
    answer: {
      en: 'We use modern web technologies including React/Next.js, Three.js for 3D graphics, WebGL for advanced animations, GSAP for smooth animations, and custom shaders. We also integrate with headless CMS like Strapi or Sanity for easy content management while maintaining creative freedom.',
      fr: 'Nous utilisons des technologies web modernes incluant React/Next.js, Three.js pour graphiques 3D, WebGL pour animations avancées, GSAP pour animations fluides, et shaders personnalisés. Nous intégrons aussi des CMS headless comme Strapi ou Sanity pour une gestion de contenu facile tout en préservant la liberté créative.',
    },
  },
  {
    id: 9,
    question: {
      en: 'How do you ensure our website performs well and is accessible?',
      fr: "Comment garantissez-vous les performances et l'accessibilité de notre site ?",
    },
    answer: {
      en: 'We design fast, optimized, and accessible websites, even with a high level of creativity. Our projects respect web standards (SEO, responsive, accessibility) and are tested with reference tools like Lighthouse.',
      fr: 'Nous concevons des sites rapides, optimisés et accessibles, même avec un haut niveau de créativité. Nos projets respectent les standards web (SEO, responsive, accessibilité) et sont testés avec des outils de référence comme Lighthouse.',
    },
  },
];

export const fetchQuestions = async () => {
  return questions;
};
