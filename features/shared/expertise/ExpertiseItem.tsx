import { EXPERTISES } from '@/constants/expertise.constant';
import { useLanguage } from '@/providers/language.provider';
import { Expertise } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const ExpertiseItem = ({ expertise, index }: { expertise: Expertise; index: number }) => {
  const expertiseRef = useRef(null);
  const expertiseItemRefs = useRef<HTMLUListElement>(null);

  const { isFrench } = useLanguage();
  const { contextSafe } = useGSAP();

  const scrubAnimation = contextSafe(() => {
    if (!expertiseRef.current) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: expertiseRef.current,
          start: 'top-=100px bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
      .fromTo(
        expertiseRef.current,
        {
          xPercent: 50,
        },
        {
          xPercent: 0,
          duration: 1,
          stagger: 0.01,
          ease: 'power4.out',
        },
      )
      .fromTo(
        expertiseItemRefs.current?.children || [],
        {
          xPercent: 50,
        },
        {
          xPercent: 0,
          stagger: 0.04,
          ease: 'power4.out',
        },
        '<',
      );
  });

  useGSAP(() => {
    scrubAnimation();
  }, [isFrench]);

  return (
    <div
      key={expertise.category.fr + isFrench}
      ref={expertiseRef}
      className="flex flex-col gap-y-6"
    >
      <div className="flex items-end gap-2">
        <p className="p2">
          {index + 1}/{EXPERTISES.length}
        </p>
        <h2 className="h2 text-blue">{expertise.category[isFrench ? 'fr' : 'en']}</h2>
      </div>
      <p className="p3 text-black-30 max-w-[400px]">
        {expertise.description[isFrench ? 'fr' : 'en']}
      </p>
      <ul ref={expertiseItemRefs}>
        {expertise.items.map((item) => (
          <li key={item.fr} className="p2 w-1/2">
            {item[isFrench ? 'fr' : 'en']}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpertiseItem;
