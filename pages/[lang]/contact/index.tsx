import CopyButton from '@/components/ui/CopyButton';
import { CONTACT } from '@/constants';
import { TIMELINE } from '@/constants/timeline.constant';
import ContactForm from '@/features/contact/ContactForm';
import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { useLanguage } from '@/providers/language.provider';
import { usePerformance } from '@/providers/performance.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

gsap.registerPlugin(SplitText);

const ContactPage = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const { isFrench } = useLanguage();
  const { contextSafe } = useGSAP();
  const { isLoading, isAtLeast } = usePerformance();

  const revealAnimation = contextSafe(() => {
    const splitTitle = new SplitText(titleRef.current, {
      type: 'words',
      mask: 'words',
    });
    const splitDescription = new SplitText(descriptionRef.current, {
      type: 'words',
    });

    gsap.set(splitTitle.words, {
      yPercent: 100,
    });
    gsap.set(splitDescription.words, {
      yPercent: 100,
      ...(isAtLeast(PERFORMANCE_LEVEL.MEDIUM) && {
        filter: 'blur(10px)',
      }),
      opacity: 0,
    });

    gsap
      .timeline({
        delay: TIMELINE.DELAY_AFTER_PAGE_TRANSITION,
      })
      .to(splitTitle.words, {
        yPercent: 0,
        duration: 1,
        stagger: 0.02,
        ease: 'power4.out',
      })
      .to(
        splitDescription.words,
        {
          yPercent: 0,
          duration: 1,
          opacity: 1,
          ...(isAtLeast(PERFORMANCE_LEVEL.MEDIUM) && {
            filter: 'blur(0px)',
          }),
          stagger: 0.02,
          ease: 'power4.out',
        },
        '-=1',
      );
  });

  useGSAP(() => {
    if (isLoading) return;
    revealAnimation();
  }, [isFrench, isLoading]);

  return (
    <div className="px-x-default py-y-double-default gap-x-x-default gap-y-default grid md:grid-cols-2 md:grid-rows-2 md:gap-y-0">
      <div>
        <h1 ref={titleRef} className="uppercase">
          {isFrench ? (
            <>
              Un <span className="text-blue">projet</span> ou une{' '}
              <span className="text-blue">question</span> ?
            </>
          ) : (
            <>
              A <span className="text-blue">project</span> or a{' '}
              <span className="text-blue">question</span>?
            </>
          )}
        </h1>
        <h3 ref={descriptionRef} className="p2 pt-6">
          {isFrench ? (
            <>
              Partagez-nous les grandes lignes via le formulaire ci-dessous.{' '}
              <span className="text-blue">On revient vers vous sous 48h</span> pour faire avancer
              les choses ensemble.
            </>
          ) : (
            <>
              Share the key details with us using the form below.{' '}
              <span className="text-blue">We’ll get back to you within 48 hours</span> to move
              forward together.
            </>
          )}
        </h3>
      </div>
      <ContactForm className="row-span-2" />
      <div className="mt-auto">
        <h3 className="block md:hidden">
          {isFrench ? 'Ou sinon, directement ici :' : 'Or directly here :'}
        </h3>
        <CopyButton className="flex w-fit flex-col" value={CONTACT.EMAIL}>
          <p className="text-black-30 pt-12 uppercase">MAIL : </p>
          <a className="pt-2" href={'mailto:' + CONTACT.EMAIL}>
            {CONTACT.EMAIL}
          </a>
        </CopyButton>
        <CopyButton className="flex w-fit flex-col" value={CONTACT.PHONE}>
          <p className="text-black-30 pt-6 uppercase">TELEPHONE : </p>
          <a className="pt-2" href={'tel:' + CONTACT.PHONE}>
            {CONTACT.PHONE}
          </a>
        </CopyButton>
      </div>
    </div>
  );
};

export default ContactPage;
