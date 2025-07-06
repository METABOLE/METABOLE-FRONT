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

  const columns: Array<Array<{ question: QuestionType; originalIndex: number }>> = [[], [], []];
  questions.forEach((question, index) => {
    columns[index % 3].push({ question, originalIndex: index });
  });

  return (
    <section className="px-x-default pt-y-default relative overflow-hidden">
      <div className="py-y-double-default relative">
        <div
          ref={titleRef}
          className="absolute top-0 flex h-full w-full items-center justify-center"
        >
          <h1 className="text-blue h-full text-center !text-[70px]">F.A.Q</h1>
        </div>
        <div ref={sectionRef} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-5">
              {column.map(({ question, originalIndex }) => (
                <CardFaq
                  key={originalIndex}
                  isActive={hoveredIndex === undefined || hoveredIndex === originalIndex}
                  isOpen={activeIndex === originalIndex}
                  question={question}
                  onMouseEnter={() => handleMouseEnter(originalIndex)}
                  onMouseLeave={handleMouseLeave}
                  onToggle={() => handleToggle(originalIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
