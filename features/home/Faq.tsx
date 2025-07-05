import CardFaq from '@/components/shared/CardFaq';
import { QuestionType } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Faq = ({ questions }: { questions: QuestionType[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>(undefined);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(undefined);
  };

  useGSAP(() => {
    gsap.set(titleRef.current, { yPercent: 0 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 30%',
          scrub: true,
        },
      })
      .to(titleRef.current, {
        yPercent: 90,
        ease: 'none',
      });
  }, []);

  return (
    <section className="px-x-default pt-y-default relative overflow-hidden">
      <div className="py-y-double-default relative">
        <div
          ref={titleRef}
          className="absolute top-0 flex h-full w-full items-center justify-center"
        >
          <h1 className="text-blue h-full text-center !text-[70px]">FAQ</h1>
        </div>
        <div ref={sectionRef} className="columns-1 gap-5 space-y-5 md:columns-2 lg:columns-3">
          {questions.map((question, index) => (
            <CardFaq
              key={index}
              className="mb-5 break-inside-avoid"
              isActive={hoveredIndex === undefined || hoveredIndex === index}
              isOpen={activeIndex === index}
              question={question}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
