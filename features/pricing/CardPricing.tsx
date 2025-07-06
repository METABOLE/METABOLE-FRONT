import Button from '@/components/ui/Button';
import { IconCheck } from '@/components/ui/Icons';
import { useLanguage } from '@/providers/language.provider';
import { Offer, OFFER_TYPE } from '@/types';
import clsx from 'clsx';
import Link from 'next/link';

const CardPricing = ({
  offer,
  id,
  className,
  hoveredIndex,
  setHoveredIndex,
}: {
  offer: Offer;
  id: string;
  className?: string;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) => {
  const { type, title, startingPrice, options, delivery, href } = offer;
  const { isFrench } = useLanguage();
  const { getInternalPath } = useLanguage();
  return (
    <div
      id={id}
      className={clsx(
        'flex h-fit w-full max-w-[400px] min-w-[350px] shrink-0 flex-col items-center gap-12 rounded-3xl border-[1px] px-6 py-8 text-center backdrop-blur-lg md:min-w-[320px]',
        type === OFFER_TYPE.SIMPLE ? 'border-blue-70 bg-menu/50' : 'border-blue-30 bg-white',
        className,
      )}
      style={{
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      }}
    >
      <h2 className="p2 uppercase">{title[isFrench ? 'fr' : 'en']}</h2>
      <div className="flex flex-col">
        <p className="p3 inline-block pb-2">
          {type !== OFFER_TYPE.CUSTOM && (isFrench ? 'À partir de' : 'Starting from')}
        </p>
        <span className="text-blue h1 font-bold">
          {startingPrice}
          {type !== OFFER_TYPE.CUSTOM && ' €'}
        </span>
      </div>
      <div>
        <ul className="flex flex-col">
          {options.map((option, index) => (
            <li
              key={index}
              className={clsx(
                'p3 flex items-center gap-4 py-2.5 text-left transition-colors xl:gap-7',
                hoveredIndex === index ? 'text-black' : 'text-black-30',
                hoveredIndex === null && 'text-black-70',
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <IconCheck className="shrink-0" />
              <span>{option.title[isFrench ? 'fr' : 'en']}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="p3 uppercase">{delivery.title[isFrench ? 'fr' : 'en']}</h3>
        <p className="p3 text-blue">{delivery.description[isFrench ? 'fr' : 'en']}</p>
      </div>
      <Button
        color={type === OFFER_TYPE.SIMPLE ? 'secondary' : 'primary'}
        href={getInternalPath(href)}
        scroll={false}
      >
        {isFrench ? <span>Contactez-nous</span> : <span>Contact us</span>}
      </Button>
      {type === OFFER_TYPE.CUSTOM && (
        <p className="text-black-70 p3">
          ou configurez votre site avec notre{' '}
          <Link
            className="underline"
            href={getInternalPath('/pricing/project-studio')}
            scroll={false}
          >
            project studio
          </Link>
        </p>
      )}
    </div>
  );
};

export default CardPricing;
