import FloatingHalo from '@/components/shared/FloatingHalo';
import ScrollingContainer from '@/components/ui/ScrollingContainer';
import Image from 'next/image';

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

const ImageCard = ({ src }: { src: string }) => (
  <div
    className="px-x-default py-y-double-default flex h-full shrink-0 items-center justify-center"
    style={{ width: '40vw', height: '100%' }}
  >
    <div className="h-full w-full overflow-hidden rounded-2xl">
      <Image
        alt="inspiration"
        className="h-full w-full object-cover"
        height={1080}
        src={src}
        width={1920}
      />
    </div>
  </div>
);

const Inspiration = () => {
  return (
    <section className="px-x-default py-y-double-default relative flex h-screen flex-col items-center justify-center overflow-hidden bg-black text-center">
      <FloatingHalo
        className="absolute bottom-0 -left-1/2 z-30 h-[200vw] w-[200vw] translate-1/3 opacity-30"
        from="#1b17ee"
        to="#14141800"
      />
      <div className="absolute inset-0 flex h-full w-full items-center overflow-hidden">
        <ScrollingContainer className="h-full" scrollSpeed={100}>
          <div className="flex h-full w-full">
            {images.map((src, i) => (
              <ImageCard key={i} src={src} />
            ))}
          </div>
        </ScrollingContainer>
      </div>
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
