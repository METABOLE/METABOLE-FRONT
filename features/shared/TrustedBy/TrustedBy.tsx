import { CLIENTS } from '@/services/clients.service';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useRef, useState } from 'react';

const TrustedBy = () => {
  const sectionRef = useRef(null);
  const wrapperImageRef = useRef(null);
  const imageRef = useRef(null);
  const wrapperTitleRef = useRef(null);
  const titleRef = useRef(null);

  const { contextSafe } = useGSAP();
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollAnimation = contextSafe(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=200px',
          end: 'bottom top+=200px',
          scrub: true,
          onUpdate: (self) => {
            const newIndex = Math.floor(self.progress * CLIENTS.length);
            setActiveIndex(Math.min(newIndex, CLIENTS.length - 1));
          },
        },
      })
      .to([wrapperTitleRef.current], {
        yPercent: 100,
        ease: 'none',
      })
      .to(
        [titleRef.current],
        {
          yPercent: -100,
          ease: 'none',
        },
        '<',
      );
  });

  useGSAP(() => {
    scrollAnimation();
  });

  return (
    <section ref={sectionRef} className="px-x-default py-y-default grid grid-cols-3">
      <div ref={wrapperTitleRef} className="h-full grow">
        <h2 ref={titleRef} className="text-black">
          Ils nous font confiance
        </h2>
      </div>
      <div className="flex flex-col gap-6">
        {CLIENTS.map((client, index) => (
          <p
            key={client.id}
            className={clsx(
              'p2 uppercase transition-opacity duration-300',
              index === activeIndex ? 'text-blue' : 'text-black',
            )}
          >
            {client.name}
          </p>
        ))}
      </div>
      <div
        ref={wrapperImageRef}
        className="ml-auto flex h-60 w-60 flex-col items-end gap-6 overflow-hidden rounded-3xl"
      >
        <div ref={imageRef}>
          <div
            className="relative h-fit transition-all"
            style={{
              transform: `translateY(-${(activeIndex / CLIENTS.length) * 100}%)`,
              backgroundColor: CLIENTS[activeIndex].backgroundColor,
            }}
          >
            {CLIENTS.map((client) => (
              <div key={client.id} className={clsx('flex h-60 w-60 items-center justify-center')}>
                {client.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
