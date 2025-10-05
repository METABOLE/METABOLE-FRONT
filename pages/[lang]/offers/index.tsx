import Button from '@/components/ui/Button';
import { IconCrossSmall } from '@/components/ui/Icons';
import { OFFERS } from '@/constants/offer.constant';
import { useLanguage } from '@/providers/language.provider';
import { OFFER_TYPE } from '@/types';
import clsx from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

gsap.registerPlugin(SplitText);

const Offers = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const { isFrench, getInternalPath } = useLanguage();

  return (
    <section className="py-y-default px-x-default flex flex-col">
      <div className="pt-y-default">
        <h1 ref={titleRef} className="text-blue h1 pb-2.5 uppercase">
          {isFrench ? 'Offres' : 'Offers'}
        </h1>
        <p ref={subtitleRef} className="p1 max-w-4xl">
          {isFrench
            ? 'Nous mettrons toutes nos compétences en oeuvre pour la réalisation de vos projets.'
            : 'We will put all our skills to work for the realization of your projects.'}
        </p>
      </div>
      <div className="py-y-default gap-y-y-default grid gap-x-5 lg:grid-cols-3">
        {OFFERS.map((offer) => (
          <div key={offer.type} className="flex flex-col gap-y-6">
            <div>
              <h2 className="p1 text-blue pb-5">{offer.title[isFrench ? 'fr' : 'en']}</h2>
              <p className="p3">{offer.description[isFrench ? 'fr' : 'en']}</p>
            </div>
            <div className="flex items-center">
              <div className="bg-black-30 h-px w-2.5 shrink-0" />
              <span className="p2 text-blue px-2.5">SCOPE</span>
              <div className="bg-black-30 h-px w-full" />
            </div>
            <div className="space-y-2 px-5">
              {offer.scope.map((scope) => (
                <p key={scope.title[isFrench ? 'fr' : 'en']} className="p3 text-black-70">
                  {scope.title[isFrench ? 'fr' : 'en']}
                </p>
              ))}
            </div>
            <div className="flex items-center">
              <div className="bg-black-30 h-px w-2.5 shrink-0" />
              <span className="p2 text-blue px-2.5">SERVICES</span>
              <div className="bg-black-30 h-px w-full" />
            </div>
            <div className="space-y-2 px-5">
              {offer.services.map((service) => (
                <p
                  key={service.title[isFrench ? 'fr' : 'en']}
                  className={clsx(
                    'p3 text-black-70 flex items-center gap-5',
                    service.isIncluded ? 'opacity-100' : 'opacity-40',
                  )}
                >
                  <IconCrossSmall className="fill-blue" />
                  {service.title[isFrench ? 'fr' : 'en']}
                </p>
              ))}
            </div>
            <div className="flex items-center">
              <div className="bg-black-30 h-px w-2.5 shrink-0" />
              <span className="p2 text-blue px-2.5">TIMING</span>
              <div className="bg-black-30 h-px w-full" />
            </div>
            <div className="px-5">
              <p className="p2 text-black">
                {offer.timing} {isFrench ? 'semaines' : 'weeks'}
              </p>
            </div>
            <div>
              <Button
                color={offer.type === OFFER_TYPE.WEB_EXPERIENCE ? 'secondary' : 'primary'}
                href={getInternalPath(offer.href)}
              >
                Contact
              </Button>
            </div>
            <div>
              <video
                className="h-full w-full rounded-3xl object-cover object-top"
                src={offer.videoUrl}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <p className="p1 max-w-4xl pb-9">
          {isFrench
            ? 'Si vous avez une idée précise de votre besoin, utilisez notre project studio pour nous orienter dans la réflexion :'
            : 'If you have a clear idea of your needs, use our project studio to guide us in our thinking:'}
        </p>
        <Button color="secondary" href={getInternalPath('/offers/project-studio')} scroll={false}>
          <span>PROJECT STUDIO</span>
        </Button>
      </div>
    </section>
  );
};

export default Offers;
