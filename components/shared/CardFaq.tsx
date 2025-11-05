import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { useLanguage } from '@/providers/language.provider';
import { usePerformance } from '@/providers/performance.provider';
import { COLORS, QuestionType } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import Button from '../ui/Button';
import { IconArrow } from '../ui/Icons';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const { question: questionText, answer, id, link } = question;

  const answerRef = useRef(null);
  const textAnswerRef = useRef(null);
  const arrowRef = useRef(null);
  const cardRef = useRef(null);
  const buttonWrapperRef = useRef(null);
  const timelineRef = useRef(gsap.timeline({ paused: true }));

  const { contextSafe } = useGSAP();
  const { isFrench, getInternalPath } = useLanguage();
  const { isAtLeast } = usePerformance();
  const pathname = usePathname();

  const setUpTimeline = contextSafe(() => {
    if (!answerRef.current || !textAnswerRef.current || !arrowRef.current) return;

    // No need for refresh here, it will be called globally after page transitions

    const splitText = new SplitText(textAnswerRef.current, {
      type: 'words',
      mask: 'lines',
    });

    const tl = gsap.timeline({ paused: true });

    gsap.set(answerRef.current, { height: 0 });
    gsap.set(splitText.words, {
      y: 20,
      opacity: 0,
      ...(isAtLeast(PERFORMANCE_LEVEL.MEDIUM) && {
        filter: 'blur(10px)',
      }),
    });
    gsap.set(arrowRef.current, { rotation: 135 });
    if (buttonWrapperRef.current) {
      gsap.set(buttonWrapperRef.current, { scale: 0 });
    }

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
          ...(isAtLeast(PERFORMANCE_LEVEL.MEDIUM) && {
            filter: 'blur(0px)',
          }),
          stagger: 0.008,
          duration: 0.8,
          ease: 'power4.out',
        },
        '-=0.5',
      )
      .to(
        buttonWrapperRef.current,
        {
          scale: 1,
          duration: 0.8,
          ease: 'power4.out',
        },
        '-=0.8',
      );

    timelineRef.current = tl;
  });

  useGSAP(() => {
    setUpTimeline();
  }, [isFrench]);

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
          <div ref={textAnswerRef} className="p3 text-black-70">
            {isFrench ? answer.fr : answer.en}
          </div>
          {link && !pathname.includes(link.url) && (
            <div ref={buttonWrapperRef} className="mt-6 origin-left">
              <Button href={getInternalPath(link.url)} scroll={false}>
                {link.text[isFrench ? 'fr' : 'en']}
              </Button>
            </div>
          )}
        </div>
        <div ref={arrowRef} className="ml-auto">
          <IconArrow color={COLORS.BLUE} />
        </div>
      </div>
    </div>
  );
};

export default CardFaq;
