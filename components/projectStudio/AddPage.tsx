import { useGSAP } from '@gsap/react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { IconChevron } from '../Icons';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

export interface AddPageRef {
  play: () => void;
  reverse: () => void;
}

const AddPage = forwardRef<AddPageRef>((_, ref) => {
  const addPageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);
  const splitText = useRef<SplitText | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const bounceTimeline = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP();

  useGSAP(() => {
    splitText.current = new SplitText(textRef.current, {
      type: 'words',
      mask: 'words',
    });
    gsap.set(splitText.current.words, { opacity: 0, y: -40 });
    gsap.set(arrowRef.current, { width: 0 });
    gsap.set(chevronRef.current, { scale: 0 });
    gsap.set(addPageRef.current, { opacity: 0 });
  });

  const animBounce = contextSafe(() => {
    if (bounceTimeline.current) {
      bounceTimeline.current.kill();
    }

    bounceTimeline.current = gsap
      .timeline({ repeat: -1, yoyo: true, repeatDelay: 0 })
      .to(arrowRef.current, {
        width: '100%',
        ease: 'power2.inOut',
        duration: 0.6,
      })
      .to(arrowRef.current, {
        width: '90%',
        ease: 'power2.inOut',
        duration: 0.6,
      });
  });

  const showAddPage = contextSafe(() => {
    if (timeline.current) timeline.current.kill();
    if (bounceTimeline.current) bounceTimeline.current.kill();

    if (!splitText.current) return;

    timeline.current = gsap
      .timeline({ delay: 0.4, onComplete: animBounce })
      .set(addPageRef.current, { opacity: 1 })
      .to(splitText.current.words, {
        duration: 0.8,
        y: 0,
        opacity: 1,
        stagger: 0.02,
        ease: 'power2.out',
      })
      .to(
        arrowRef.current,
        {
          duration: 0.8,
          width: '100%',
          ease: 'power4.out',
        },
        '<',
      )
      .to(
        chevronRef.current,
        {
          scale: 1,
          ease: 'power2.out',
        },
        '<',
      );
  });

  const hideAddPage = contextSafe(() => {
    if (timeline.current) timeline.current.kill();
    if (bounceTimeline.current) bounceTimeline.current.kill();

    if (!splitText.current) return;

    timeline.current = gsap
      .timeline()
      .to(splitText.current.words, {
        duration: 0.6,
        y: -40,
        opacity: 0,
        stagger: 0.02,
        ease: 'power2.out',
      })
      .to(
        arrowRef.current,
        {
          duration: 0.6,
          width: 0,
          ease: 'power4.out',
        },
        '<',
      )
      .to(
        chevronRef.current,
        {
          scale: 0,
          ease: 'power2.out',
        },
        '<',
      )
      .set(addPageRef.current, { opacity: 0 });
  });

  useImperativeHandle(ref, () => ({
    play: showAddPage,
    reverse: hideAddPage,
  }));

  return (
    <div
      ref={addPageRef}
      className="absolute top-1/3 left-0 flex w-full items-center gap-6 px-6 opacity-0"
    >
      <div className="relative flex w-full max-w-3xs items-end">
        <div ref={arrowRef} className="absolute right-0">
          <IconChevron
            ref={chevronRef}
            className="absolute top-1/2 left-0 -translate-x-0.5 -translate-y-1/2 stroke-[#A19FF9]"
          />
          <div className="h-0.5 w-full rounded-l-full bg-[#A19FF9]" />
        </div>
      </div>
      <p
        ref={textRef}
        className="h3 text-blue-30 w-full max-w-96 min-w-56 text-center !leading-7 md:w-2/3"
      >
        Cliquez pour ajouter les premières pages de votre site web !
      </p>
    </div>
  );
});

export default AddPage;
