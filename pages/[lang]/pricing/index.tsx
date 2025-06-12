import Button from '@/components/atoms/Button';
import Div3D from '@/components/Div3D';
import CardOffer from '@/components/offer/CardOffer';
import { OFFERS } from '@/constants/offer.constant';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS, OFFER_TYPE } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useState } from 'react';

const Pricing = () => {
  const { isFrench, getInternalPath } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isTablet = useMatchMedia(BREAKPOINTS.LG);

  useGSAP(() => {
    if (isTablet) {
      gsap
        .timeline()
        .to(
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
    gsap
      .timeline()
      .to([`#offer-card-${OFFERS[0].type}`, `#offer-card-${OFFERS[2].type}`], {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.inOut',
      })
      .to(
        `#offer-card-${OFFER_TYPE.CUSTOM}`,
        {
          rotationY: -5,
          rotationZ: 2,
          z: 20,
          transformPerspective: 1000,
          duration: 1.2,
          ease: 'power3.out',
        },
        '<',
      )
      .to(
        `#offer-card-${OFFER_TYPE.LANDING}`,
        {
          rotationY: 5,
          rotationZ: -2,
          z: 20,
          transformPerspective: 1000,
          duration: 1.2,
          ease: 'power3.out',
        },
        '<',
      );
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
          opacity: 1,
          duration: 1,
          ease: 'none',
        },
        '<',
      )
      .to(
        `#wrapper-offer-card-${OFFER_TYPE.CUSTOM}`,
        {
          x: 100,
          rotationZ: 3,
          opacity: 1,
          duration: 1,
          ease: 'none',
        },
        '<',
      );
  }, [isTablet]);

  const renderCard = (offer: (typeof OFFERS)[0]) => {
    const cardElement = (
      <CardOffer
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
      <div className="pt-y-default mx-auto md:w-2/3">
        <h1 className="text-blue h1 pb-2.5">{isFrench ? 'Tarification' : 'Pricing'}</h1>
        <p className="p1">
          {isFrench
            ? 'Nous mettrons toutes nos compétences en oeuvre pour la réalisation de nos projets.'
            : 'We will put all our skills to work for the realization of our projects.'}
        </p>
      </div>
      <div
        className={clsx(
          'px-x-default py-y-default lg:py-y-double-default flex w-full flex-col items-center gap-5 overflow-scroll sm:flex-row lg:justify-center lg:gap-0 lg:overflow-hidden xl:gap-5',
        )}
      >
        {OFFERS.map(renderCard)}
      </div>
      <div className="mx-auto md:w-2/3">
        <p className="p1 pb-9">
          Si vous avez une idée précise de votre besoin, utilisez notre website builder pour nous
          orienter dans la réflexion :{' '}
        </p>
        <Button color="secondary" href={getInternalPath('/pricing/project-studio')}>
          PROJECT STUDIO
        </Button>
      </div>
    </section>
  );
};

export default Pricing;
