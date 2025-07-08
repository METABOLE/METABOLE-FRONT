import Div3D from '@/components/shared/Div3D';
import Button from '@/components/ui/Button';
import { OFFERS } from '@/constants/offer.constant';
import { TIMELINE } from '@/constants/timeline.constant';
import CardPricing from '@/features/pricing/CardPricing';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS, OFFER_TYPE } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useRef, useState } from 'react';

gsap.registerPlugin(SplitText);

const Pricing = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const { isFrench, getInternalPath } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isTablet = useMatchMedia(BREAKPOINTS.LG);

  const { contextSafe } = useGSAP();

  const revealAnimation = contextSafe(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    const splitTitle = new SplitText(titleRef.current, {
      type: 'chars',
      mask: 'chars',
    });
    const splitSubtitle = new SplitText(subtitleRef.current, {
      type: 'words',
    });

    gsap.set(splitTitle.chars, {
      yPercent: 100,
    });

    gsap.set(splitSubtitle.words, {
      yPercent: 100,
      opacity: 0,
      filter: 'blur(10px)',
    });

    const timeline = gsap
      .timeline({
        delay: TIMELINE.DELAY_AFTER_PAGE_TRANSITION,
      })
      .to(splitTitle.chars, {
        yPercent: 0,
        duration: 1,
        stagger: 0.01,
        ease: 'power4.out',
      })
      .to(
        splitSubtitle.words,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          filter: 'blur(0px)',
          stagger: 0.01,
          ease: 'power4.out',
        },
        '<',
      );

    if (isTablet) {
      timeline.to(
        [
          `#offer-card-${OFFERS[0].type}`,
          `#offer-card-${OFFERS[1].type}`,
          `#offer-card-${OFFERS[2].type}`,
        ],
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out',
        },
      );
      return;
    }

    gsap.set(`#offer-card-${OFFER_TYPE.CUSTOM}`, {
      transformOrigin: 'left center',
    });
    gsap.set(`#offer-card-${OFFER_TYPE.LANDING}`, {
      transformOrigin: 'right center',
    });

    timeline
      .to(
        [`#offer-card-${OFFERS[0].type}`, `#offer-card-${OFFERS[2].type}`],
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: 'power4.inOut',
        },
        '<',
      )
      .to(
        [`#offer-card-${OFFER_TYPE.CUSTOM}`, `#offer-card-${OFFER_TYPE.LANDING}`],
        {
          rotationY: (index) => (index % 2 === 0 ? -5 : 5),
          rotationZ: (index) => (index % 2 === 0 ? 2 : -2),
          z: 20,
          transformPerspective: 1000,
          duration: 2,
          ease: 'power4.out',
        },
        '<',
      );
  });

  const scrollAnimation = contextSafe(() => {
    ScrollTrigger.getById('pricing-parallax')?.kill();

    if (isTablet) return;

    gsap
      .timeline({
        scrollTrigger: {
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
      })
      .to(
        `#wrapper-offer-card-${OFFER_TYPE.LANDING}`,
        {
          x: -100,
          rotationZ: -3,
          duration: 1.2,
          ease: 'power4.out',
        },
        '<',
      )
      .to(
        `#wrapper-offer-card-${OFFER_TYPE.CUSTOM}`,
        {
          x: 100,
          rotationZ: 3,
          duration: 1.2,
          ease: 'power4.out',
        },
        '<',
      );
  });

  useGSAP(() => {
    revealAnimation();
    scrollAnimation();
  }, [isTablet, isFrench]);

  const renderCard = (offer: (typeof OFFERS)[0]) => {
    const cardElement = (
      <CardPricing
        hoveredIndex={hoveredIndex}
        id={`offer-card-${offer.type}`}
        offer={offer}
        setHoveredIndex={setHoveredIndex}
        className={clsx(
          offer.type === OFFER_TYPE.SIMPLE ? 'scale-100 lg:scale-110' : 'scale-100 lg:!scale-95',
          !isTablet && offer.type === OFFER_TYPE.LANDING && 'translate-x-full opacity-0',
          !isTablet && offer.type === OFFER_TYPE.CUSTOM && '-translate-x-full opacity-0',
        )}
      />
    );

    if (isTablet) {
      return (
        <div key={offer.type} id={`wrapper-offer-card-${offer.type}`}>
          {cardElement}
        </div>
      );
    }

    return (
      <Div3D
        key={offer.type}
        className={clsx(offer.type === OFFER_TYPE.SIMPLE && 'z-10')}
        followMouse={true}
        id={`wrapper-offer-card-${offer.type}`}
        intensity={2}
      >
        {cardElement}
      </Div3D>
    );
  };

  return (
    <section className="py-y-default flex flex-col text-center">
      <div className="pt-y-default px-x-default mx-auto md:w-2/3">
        <h1 ref={titleRef} className="text-blue h1 pb-2.5 uppercase">
          {isFrench ? 'Tarification' : 'Pricing'}
        </h1>
        <p ref={subtitleRef} className="p1">
          {isFrench
            ? 'Nous mettrons toutes nos compétences en oeuvre pour la réalisation de vos projets.'
            : 'We will put all our skills to work for the realization of your projects.'}
        </p>
      </div>
      <div
        className={clsx(
          'px-x-default py-y-default lg:py-y-double-default flex w-full flex-col items-center gap-5 overflow-scroll sm:flex-row lg:justify-center lg:gap-0 lg:overflow-hidden xl:gap-5',
        )}
      >
        {OFFERS.map(renderCard)}
      </div>
      <div className="px-x-default mx-auto md:w-2/3">
        <p className="p1 pb-9">
          {isFrench
            ? 'Si vous avez une idée précise de votre besoin, utilisez notre project studio pour nous orienter dans la réflexion :'
            : 'If you have a clear idea of your needs, use our project studio to guide us in our thinking:'}
        </p>
        <Button color="secondary" href={getInternalPath('/pricing/project-studio')} scroll={false}>
          <span>PROJECT STUDIO</span>
        </Button>
      </div>
    </section>
  );
};

export default Pricing;
