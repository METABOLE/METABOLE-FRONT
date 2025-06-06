import Button from '@/components/atoms/Button';
import Div3D from '@/components/Div3D';
import CardOffer from '@/components/offer/CardOffer';
import { OFFERS } from '@/constants/offer.constant';
import { useLanguage } from '@/providers/language.provider';
import { OFFER_TYPE } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useState } from 'react';

const Pricing = () => {
  const { isFrench, getInternalPath } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(() => {
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
  }, []);

  return (
    <section className="px-x-default py-y-default gap-y-y-default flex flex-col text-center">
      <div className="pt-y-default mx-auto md:w-2/3">
        <h1 className="text-blue h1 pb-2.5">{isFrench ? 'Tarification' : 'Pricing'}</h1>
        <p className="p1">
          {isFrench
            ? 'Nous mettrons toutes nos compétences en oeuvre pour la réalisation de nos projets.'
            : 'We will put all our skills to work for the realization of our projects.'}
        </p>
      </div>
      <div className="mx-auto grid grid-cols-3 items-center gap-5">
        {OFFERS.map((offer) => (
          <Div3D
            key={offer.type}
            className={clsx(offer.type === OFFER_TYPE.SIMPLE && 'z-10')}
            followMouse={true}
            id={`wrapper-offer-card-${offer.type}`}
            intensity={2}
          >
            <CardOffer
              hoveredIndex={hoveredIndex}
              id={`offer-card-${offer.type}`}
              offer={offer}
              setHoveredIndex={setHoveredIndex}
              className={clsx(
                offer.type === OFFER_TYPE.SIMPLE ? 'scale-110' : '!scale-95',
                offer.type === OFFER_TYPE.LANDING && 'translate-x-full opacity-0',
                offer.type === OFFER_TYPE.CUSTOM && '-translate-x-full opacity-0',
              )}
            />
          </Div3D>
        ))}
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
