import { useLanguage } from '@/providers/language.provider';
import { COLORS, QuestionType } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';
import { IconArrow } from '../ui/Icons';

gsap.registerPlugin(SplitText);

const CardFaq = ({
  index,
  question,
  className,
  isActive,
  onToggle,
}: {
  index: number;
  question: QuestionType;
  className?: string;
  isActive: boolean;
  onToggle: () => void;
}) => {
  const { isFrench } = useLanguage();
  const { question: questionText, answer } = question;

  const answerRef = useRef(null);
  const textAnswerRef = useRef(null);
  const arrowRef = useRef(null);
  const timelineRef = useRef(gsap.timeline({ paused: true }));

  useGSAP(() => {
    if (!answerRef.current || !textAnswerRef.current || !arrowRef.current) return;

    const splitText = new SplitText(textAnswerRef.current, {
      type: 'words',
      mask: 'lines',
    });

    const tl = gsap.timeline({ paused: true });

    gsap.set(answerRef.current, { height: 0 });
    gsap.set(splitText.words, { y: 20, opacity: 0 });
    gsap.set(arrowRef.current, { rotation: 135 });

    tl.to(answerRef.current, {
      height: 'auto',
      duration: 1,
      ease: 'power4.inOut',
    })
      .to(
        arrowRef.current,
        {
          rotation: 45,
          duration: 1,
          ease: 'power4.inOut',
        },
        0,
      )
      .to(
        splitText.words,
        {
          y: 0,
          opacity: 1,
          stagger: 0.01,
          duration: 0.6,
          ease: 'power4.out',
        },
        '-=0.5',
      );

    timelineRef.current = tl;
  }, []);

  useGSAP(() => {
    if (!timelineRef.current) return;

    if (isActive) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isActive]);

  return (
    <div
      className={clsx(
        'flex cursor-pointer flex-col gap-6 rounded-3xl bg-[#C5C4FF]/30 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-[#C5C4FF]/40',
        className,
      )}
      onClick={onToggle}
    >
      <h2 className="text-blue mb-4">{index}.</h2>
      <p className="text-sm font-medium">{isFrench ? questionText.fr : questionText.en}</p>
      <div ref={answerRef} className="">
        <p ref={textAnswerRef} className="text-sm text-gray-700">
          {isFrench ? answer.fr : answer.en}
        </p>
      </div>
      <div ref={arrowRef} className="ml-auto">
        <IconArrow color={COLORS.BLUE} />
      </div>
    </div>
  );
};

export default CardFaq;
