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
      en: 'Our pricing varies based on complexity, features, and timeline. A basic creative website starts around €8,000, while complex interactive experiences can range from €15,000 to €30,000+. We provide detailed quotes after understanding your specific needs and vision.',
      fr: 'Nos tarifs varient selon la complexité, les fonctionnalités et le délai. Un site créatif basique démarre autour de 8 000€, tandis que des expériences interactives complexes peuvent aller de 15 000€ à 30 000€+. Nous fournissons des devis détaillés après avoir compris vos besoins spécifiques.',
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
      en: 'What is your design and development process?',
      fr: 'Quel est votre processus de design et développement ?',
    },
    answer: {
      en: 'We follow a collaborative 4-phase process: Discovery (understanding your brand and goals), Design (creating visual concepts and user experience), Development (bringing designs to life with code), and Launch (testing and optimization). Each phase includes client feedback and iterations.',
      fr: 'Nous suivons un processus collaboratif en 4 phases : Découverte (comprendre votre marque et objectifs), Design (créer concepts visuels et expérience utilisateur), Développement (donner vie aux designs avec le code), et Lancement (tests et optimisation). Chaque phase inclut feedback client et itérations.',
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
      en: 'How long does it take to create a creative website?',
      fr: 'Combien de temps faut-il pour créer un site web créatif ?',
    },
    answer: {
      en: 'Timeline depends on complexity: simple creative sites take 4-6 weeks, while complex interactive experiences can take 8-12 weeks. We work efficiently as a designer-developer duo, ensuring quality while meeting deadlines. Rush projects are possible with additional fees.',
      fr: 'Le délai dépend de la complexité : les sites créatifs simples prennent 4-6 semaines, tandis que les expériences interactives complexes peuvent prendre 8-12 semaines. Nous travaillons efficacement en duo designer-développeur, garantissant qualité et respect des délais. Les projets urgents sont possibles avec frais supplémentaires.',
    },
  },
  {
    id: 5,
    question: {
      en: 'What makes our studio different from other agencies?',
      fr: "Qu'est-ce qui différencie notre studio des autres agences ?",
    },
    answer: {
      en: 'As a specialized designer-developer duo, we offer direct communication, faster decision-making, and deep technical expertise in creative coding. We focus exclusively on creative websites, ensuring every project pushes creative boundaries while maintaining performance and accessibility.',
      fr: 'En tant que duo designer-développeur spécialisé, nous offrons communication directe, prise de décision rapide et expertise technique approfondie en creative coding. Nous nous concentrons exclusivement sur les sites créatifs, garantissant que chaque projet repousse les limites créatives tout en maintenant performance et accessibilité.',
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
      fr: 'Proposez-vous un support et maintenance continus ?',
    },
    answer: {
      en: 'Yes, we offer maintenance packages starting at €200/month, including updates, security patches, and technical support. We also provide training for your team to manage content updates. For creative coding projects, we recommend regular maintenance to ensure optimal performance.',
      fr: 'Oui, nous proposons des forfaits maintenance à partir de 200€/mois, incluant mises à jour, correctifs de sécurité et support technique. Nous fournissons aussi une formation pour votre équipe. Pour les projets creative coding, nous recommandons une maintenance régulière pour garantir les performances optimales.',
    },
  },
  {
    id: 7,
    question: {
      en: 'Can you work with our existing brand guidelines?',
      fr: 'Pouvez-vous travailler avec nos chartes graphiques existantes ?',
    },
    answer: {
      en: 'Absolutely! We respect and enhance your existing brand identity while adding creative coding elements that complement your visual language. We can work within your brand guidelines or help evolve them to include interactive elements that strengthen your brand presence.',
      fr: 'Absolument ! Nous respectons et améliorons votre identité de marque existante tout en ajoutant des éléments de creative coding qui complètent votre langage visuel. Nous pouvons travailler dans vos chartes graphiques ou vous aider à les faire évoluer avec des éléments interactifs qui renforcent votre présence de marque.',
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
      en: 'Performance and accessibility are built into our creative coding approach. We optimize 3D assets, implement lazy loading, use efficient animation techniques, and ensure WCAG compliance. We test across devices and browsers, and provide performance monitoring tools to maintain optimal user experience.',
      fr: "Performance et accessibilité sont intégrées dans notre approche creative coding. Nous optimisons les assets 3D, implémentons le lazy loading, utilisons des techniques d'animation efficaces et assurons la conformité WCAG. Nous testons sur tous appareils et navigateurs, et fournissons des outils de monitoring pour maintenir l'expérience utilisateur optimale.",
    },
  },
];

export const fetchQuestions = async () => {
  return questions;
};
