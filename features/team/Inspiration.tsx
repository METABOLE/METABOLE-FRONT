import FloatingHalo from '@/components/shared/FloatingHalo';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';

const images = [
  '/images/matteo.jpg',
  '/images/jerome.jpg',
  '/images/matteo.jpg',
  '/images/jerome.jpg',
  '/images/matteo.jpg',
  '/images/jerome.jpg',
  '/images/matteo.jpg',
  '/images/jerome.jpg',
];

const InfiniteSliderFixed = ({ images }: { images: string[] }) => {
  const slider1Ref = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useGSAP(() => {
    gsap.to(slider1Ref.current, {
      x: '-50%',
      duration: 100,
      repeat: -1,
      ease: 'none',
    });
  }, []);

  return (
    <div className="absolute inset-0 flex h-full w-full items-center overflow-hidden">
      <div ref={slider1Ref} className="flex h-full">
        {Array.from({ length: 3 }).map((_, wrapperIndex) =>
          images.map((src, i) => (
            <div
              key={`${wrapperIndex}-${i}`}
              className="px-x-default py-y-double-default flex h-full flex-shrink-0 items-center justify-center"
              style={{ width: '40vw', height: '100%' }}
            >
              <div className="h-full w-full overflow-hidden rounded-2xl">
                <img
                  ref={(el) => {
                    imageRefs.current[wrapperIndex * images.length + i] = el;
                  }}
                  alt="inspiration"
                  className="h-full w-full object-cover"
                  src={src}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectPosition: 'center',
                  }}
                />
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  );
};

const Inspiration = () => {
  return (
    <section className="px-x-default py-y-double-default relative flex h-screen flex-col items-center justify-center overflow-hidden bg-black text-center">
      <FloatingHalo
        className="absolute bottom-0 -left-1/2 z-30 h-[200vw] w-[200vw] translate-1/3 opacity-30"
        from="#1b17ee"
        to="#14141800"
      />
      <InfiniteSliderFixed images={images} />
      <p className="p3 text-white-70 top-y-default absolute z-20">
        Metabole est né d'une envie simple :
      </p>
      <h1 className="relative z-20 text-white">
        Créer des choses qui marquent, qui inspirent et qui ont du sens.
      </h1>
    </section>
  );
};

export default Inspiration;
