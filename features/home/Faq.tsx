import CardFaq from '@/components/shared/CardFaq';
import { QuestionType } from '@/types';
import { useState } from 'react';

const Faq = ({ questions }: { questions: QuestionType[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="px-x-default py-y-default relative">
      <h1 className="text-blue sticky top-1/2 mb-8 text-center">FAQ</h1>
      <div className="columns-1 gap-5 space-y-5 md:columns-2 lg:columns-3">
        {questions.map((question, index) => (
          <CardFaq
            key={index}
            className="mb-5 break-inside-avoid"
            index={index + 1}
            isActive={activeIndex === index}
            question={question}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Faq;
