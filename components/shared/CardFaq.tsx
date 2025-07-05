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
  question,
  className,
  isActive,
  isOpen,
  onToggle,
  onMouseEnter,
  onMouseLeave,
}: {
  question: QuestionType;
  className?: string;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) => {
  const { isFrench } = useLanguage();
  const { question: questionText, answer, id } = question;

  const answerRef = useRef(null);
  const textAnswerRef = useRef(null);
  const arrowRef = useRef(null);
  const cardRef = useRef(null);
  const timelineRef = useRef(gsap.timeline({ paused: true }));

  useGSAP(() => {
    if (!answerRef.current || !textAnswerRef.current || !arrowRef.current) return;

    const splitText = new SplitText(textAnswerRef.current, {
      type: 'words',
      mask: 'lines',
    });

    const tl = gsap.timeline({ paused: true });

    gsap.set(answerRef.current, { height: 0 });
    gsap.set(splitText.words, { y: 20, opacity: 0, filter: 'blur(10px)' });
    gsap.set(arrowRef.current, { rotation: 135 });

    tl.to(answerRef.current, {
      height: 'auto',
      duration: 1,
      ease: 'power4.inOut',
    })
      .to(
        arrowRef.current,
        {
          rotation: -45,
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
          filter: 'blur(0px)',
          stagger: 0.008,
          duration: 0.8,
          ease: 'power4.out',
        },
        '-=0.5',
      );

    timelineRef.current = tl;
  }, []);

  useGSAP(() => {
    if (!timelineRef.current) return;

    if (isOpen) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isOpen]);

  const handleMouseEnter = () => {
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    onMouseLeave?.();
  };

  return (
    <div
      ref={cardRef}
      className={clsx(
        'flex cursor-pointer flex-col gap-6 rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 hover:scale-95 hover:bg-[#C5C4FF]/40',
        isActive ? 'bg-[#C5C4FF]/30' : 'bg-[#C5C4FF]/15',
        className,
      )}
      onClick={onToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={clsx(
          'flex flex-col gap-6 transition-opacity duration-300',
          isActive ? 'opacity-100' : 'opacity-50',
        )}
      >
        <h2 className="text-blue mb-4">{id}.</h2>
        <p className="p2">{isFrench ? questionText.fr : questionText.en}</p>
        <div ref={answerRef}>
          <p ref={textAnswerRef} className="p3 text-blue-70">
            {isFrench ? answer.fr : answer.en}
          </p>
        </div>
        <div ref={arrowRef} className="ml-auto">
          <IconArrow color={COLORS.BLUE} />
        </div>
      </div>
    </div>
  );
};

export default CardFaq;
