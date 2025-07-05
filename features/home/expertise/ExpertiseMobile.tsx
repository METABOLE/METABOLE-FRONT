import { useLanguage } from '@/providers/language.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';
import { EXPERTISES } from '../../../constants/expertise.constant';

gsap.registerPlugin(ScrollTrigger);

const ALL_ELEMENTS = EXPERTISES.flatMap((expertise, catIdx) => {
  const elements = [];
  if (catIdx > 0) {
    elements.push({ type: 'title', category: catIdx, item: -1 });
  }
  expertise.items.forEach((_item, itemIdx) => {
    elements.push({ type: 'item', category: catIdx, item: itemIdx });
  });
  return elements;
});

const ExpertiseMobile = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const { isFrench } = useLanguage();

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 40%',
        scrub: true,
        onUpdate: (self) => {
          const { progress } = self;
          const totalElements = ALL_ELEMENTS.length;
          const currentIndex = Math.floor(progress * totalElements);
          const clampedIndex = Math.min(Math.max(currentIndex, 0), totalElements - 1);
          setActiveIndex(clampedIndex);
        },
      },
    });
  }, []);

  return (
    <div ref={sectionRef} className="relative flex flex-col gap-y-24">
      {EXPERTISES.map((expertise, catIdx) => (
        <div key={expertise.category.fr} className="relative">
          <h3 className="pb-8 text-white">{expertise.category[isFrench ? 'fr' : 'en']}</h3>
          <ul className="px-x-default flex flex-col gap-y-6">
            {expertise.items.map((item, itemIdx) => {
              const elementIndex = ALL_ELEMENTS.findIndex(
                (element) =>
                  element.type === 'item' &&
                  element.category === catIdx &&
                  element.item === itemIdx,
              );
              return (
                <li
                  key={item.fr}
                  className={
                    'p3 ease-power4-in-out transition-[colors,translate] duration-150 ' +
                    (elementIndex === activeIndex
                      ? 'text-yellow translate-y-0'
                      : 'text-white-30 -translate-x-4')
                  }
                >
                  {item[isFrench ? 'fr' : 'en']}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExpertiseMobile;
