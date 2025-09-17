import { ClientType } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';

const TrustedBy = ({ clients }: { clients: ClientType[] }) => {
  const sectionRef = useRef(null);
  const wrapperImageRef = useRef(null);
  const imageRef = useRef(null);
  const wrapperTitleRef = useRef(null);
  const titleRef = useRef(null);

  const { contextSafe } = useGSAP();

  const scrollAnimation = contextSafe(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
      .to([wrapperImageRef.current, wrapperTitleRef.current], {
        yPercent: 100,
        ease: 'none',
      })
      .to(
        [imageRef.current, titleRef.current],
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
        {clients.map((client) => (
          <p key={client.id} className="p2 text-black uppercase">
            {client.name}
          </p>
        ))}
      </div>
      <div ref={wrapperImageRef} className="flex h-full grow flex-col items-end gap-6">
        <div ref={imageRef} className="relative h-60 w-60">
          {clients.map((client) => (
            <Image
              key={client.id}
              alt={client.name}
              className="absolute h-full w-full object-cover"
              height={100}
              src={client.image}
              width={100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
