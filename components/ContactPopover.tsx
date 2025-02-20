import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import Button from './Button';

const ContactPopover = () => {
  const wrapperRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

  const playAnim = contextSafe(() => {
    if (!containerRef.current) return;

    const { children } = containerRef.current;

    gsap
      .timeline()
      .to(wrapperRef.current, {
        width: 430,
        height: 500,
        duration: 0.3,
        ease: 'power2.inOut',
      })
      .to(containerRef.current, {
        width: '100%',
        height: 'auto',
        duration: 0.3,
        ease: 'power2.inOut',
      })
      .from(children, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.1,
      });
  });

  const closeAnim = contextSafe(() => {
    if (!containerRef.current) return;

    const { children } = containerRef.current;

    gsap
      .timeline()
      .to(children, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.1,
      })
      .to(containerRef.current, {
        width: '0',
        height: '0',
        duration: 0.3,
        ease: 'power2.inOut',
      })
      .to(wrapperRef.current, {
        width: 'auto',
        height: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      });
  });

  return (
    <div
      ref={wrapperRef}
      className="border-red relative h-11 w-fit rounded-3xl bg-[#C5C4FF]/30 text-black backdrop-blur-xl"
      onMouseEnter={playAnim}
      onMouseLeave={closeAnim}
    >
      <button className="label h-11 w-full px-6">CONTACT</button>
      <div ref={containerRef} className="h-0 w-0 overflow-hidden">
        <p>Lorem ipsum dolor sit amet</p>
        <p>Lorem ipsum dolor sit amet</p>
        <p>Lorem ipsum dolor sit amet</p>
        <p>Lorem ipsum dolor sit amet</p>
        <Button>Contact</Button>
      </div>
    </div>
  );
};

export default ContactPopover;
