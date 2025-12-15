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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const displayedIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  const scrollAnimation = contextSafe(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center bottom-=200px',
          end: 'center top+=200px',
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
    <section
      ref={sectionRef}
      className="px-x-default py-y-default gap-y-y-default gap-x-x-default grid lg:grid-cols-3"
    >
      <div ref={wrapperTitleRef} className="col-span-2 h-full grow lg:col-span-1">
        <h2 ref={titleRef} className="text-black">
          Ils nous font confiance
        </h2>
      </div>
      <div className="flex flex-col">
        {CLIENTS.map((client, index) => (
          <p
            key={client.name}
            className={clsx(
              'p2 cursor-pointer py-3 uppercase transition-opacity duration-300',
              index === displayedIndex ? 'text-blue' : 'text-black',
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {client.name}
          </p>
        ))}
      </div>
      <div
        ref={wrapperImageRef}
        className="ml-auto hidden h-60 w-60 flex-col items-end gap-6 overflow-hidden rounded-3xl sm:flex"
      >
        <div ref={imageRef}>
          <div
            className="relative h-fit transition-all"
            style={{
              transform: `translateY(-${(displayedIndex / CLIENTS.length) * 100}%)`,
              backgroundColor: CLIENTS[displayedIndex].backgroundColor,
            }}
          >
            {CLIENTS.map((client) => (
              <div key={client.name} className={clsx('flex h-60 w-60 items-center justify-center')}>
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
