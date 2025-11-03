import { EXPERTISES } from '@/constants/expertise.constant';
import { Expertise } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const ExpertiseItem = ({ expertise, index }: { expertise: Expertise; index: number }) => {
  const expertiseRef = useRef(null);
  const expertiseItemRefs = useRef<HTMLUListElement>(null);

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
          markers: true,
        },
      })
      .fromTo(
        expertiseRef.current,
        {
          xPercent: 100,
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
          xPercent: 100,
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
  }, []);

  return (
    <div key={expertise.category.fr} ref={expertiseRef} className="flex flex-col gap-y-6">
      <div className="flex items-end gap-2">
        {index + 1}/{EXPERTISES.length}.<h2 className="h2 text-blue">{expertise.category.fr}</h2>
      </div>
      <p className="p3 text-black-30 max-w-[400px]">{expertise.description.fr}</p>
      <ul ref={expertiseItemRefs}>
        {expertise.items.map((item) => (
          <li key={item.fr} className="p2 w-1/2 uppercase">
            {item.fr}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpertiseItem;
