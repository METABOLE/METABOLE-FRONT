import Div3D from '@/components/Text3D';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Page() {
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.set(textRef.current, {
      scale: 20,
      opacity: 0,
    });
    gsap.to(textRef.current, {
      delay: 3.1,
      scale: 1,
      opacity: 1,
      duration: 2.2,
      ease: 'power4.out',
    });
  }, []);

  return (
    <section className="fixed inset-0 flex h-screen flex-col items-center justify-center text-center">
      <Div3D className="text-left whitespace-pre-wrap md:text-center" intensity={3}>
        <h1 ref={textRef} className="text-blue !text-[clamp(10rem,40vw,50rem)] opacity-0">
          404
        </h1>
      </Div3D>
    </section>
  );
}
