import { CONTACT, LINKS, SOCIALS } from '@/constants';
import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS, COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';
import FloatingHalo from '../shared/FloatingHalo';
import Language from '../shared/Language';
import NewsletterForm from '../shared/NewsletterForm';
import Time from '../shared/Time';
import Hint from '../ui/Hint';
import { IconArrow, LogoSmall } from '../ui/Icons';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Footer = () => {
  const animatedTitleRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef(null);
  const containerSectionRef = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const floatingHaloRef = useRef<HTMLDivElement>(null);

  const isMobile = useMatchMedia(BREAKPOINTS.MD);
  const { isFrench, getInternalPath } = useLanguage();
  const { x, y } = useMousePosition(wrapperRef);
  const { smoothScrollTo } = useSmoothScroll();
  const { contextSafe } = useGSAP();

  const trainAnimPlay = contextSafe(() => {
    if (!animatedTitleRef.current) return;
    const letters = animatedTitleRef.current.children;

    gsap.to([...letters].reverse(), {
      y: 10,
      duration: 0.6,
      ease: 'power2.inOut',
      stagger: 0.05,
    });
  });

  const trainAnimReverse = contextSafe(() => {
    if (!animatedTitleRef.current) return;
    const letters = animatedTitleRef.current.children;

    gsap.to([...letters].reverse(), {
      y: gsap.utils.clamp(20, 8 * window.innerHeight * 0.01, 100),
      duration: 0.6,
      ease: 'power2.inOut',
      stagger: 0.05,
    });
  });

  const resetHaloPosition = contextSafe(() => {
    gsap.to(floatingHaloRef.current, {
      x: 0,
      y: 0,
      duration: 3,
    });
  });

  const moveHalo = contextSafe(() => {
    gsap.to(floatingHaloRef.current, {
      x: x,
      y: y,
      duration: 2,
    });
  });

  useGSAP(() => {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === wrapperRef.current) {
        trigger.kill();
      }
    });

    if (isMobile) {
      gsap.set(containerSectionRef.current, { y: 0, borderRadius: '0px' });
      gsap.set(wrapperRef.current, { paddingInline: '', clearProps: 'paddingInline' });
      return;
    }

    if (isMobile) return;

    gsap.set(containerSectionRef.current, { y: -300 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top-=300 bottom',
          end: 'bottom bottom',
          scrub: true,
        },
        defaults: { ease: 'none' },
      })
      .to(containerSectionRef.current, {
        y: 0,
        borderRadius: '24 24 0 0',
      })
      .to(
        wrapperRef.current,
        {
          paddingInline: 20,
        },
        '<',
      );
  }, [isMobile]);

  return (
    <>
      <Hint containerId="hint-newsletter-footer" isDark={true} isLeft={true}>
        {isFrench ? (
          <p>
            On ne spamme pas : <strong>1 mail tous les 3 mois</strong>, avec des news et du contenu
            utile !
          </p>
        ) : (
          <p>
            We don’t spam: <strong>1 email every 3 months</strong>, with news and useful content!
          </p>
        )}
      </Hint>
      <footer ref={wrapperRef}>
        <div
          ref={containerSectionRef}
          className="h-fit w-full overflow-hidden bg-black text-white"
          id="wrapper-footer"
          onMouseLeave={resetHaloPosition}
          onMouseMove={moveHalo}
        >
          <FloatingHalo
            ref={floatingHaloRef}
            className="-z-10 h-[100vw] w-[100vw] opacity-30"
            from="#3449FF"
            to="#141418"
          />
          <div ref={sectionRef} className="pt-y-default h-full w-full" id="footer">
            <div className="gap-y-y-default mx-auto flex w-[calc(100vw-(var(--x-default)*2))] flex-col">
              <div className="gap-y-y-default grid h-full grid-cols-1 gap-x-5 sm:grid-cols-2 md:grid-cols-6">
                <Link
                  className="pb-y-half-default col-span-1 h-fit w-fit sm:col-span-2 md:col-span-1"
                  href={getInternalPath('/')}
                  scroll={false}
                  onMouseMove={(e) => useMagnet(e, 0.8)}
                  onMouseOut={(e) => useResetMagnet(e)}
                >
                  <LogoSmall className="w-12" color={COLORS.YELLOW} />
                </Link>
                <nav>
                  <ul className="flex flex-col gap-4">
                    <li>Pages</li>
                    {LINKS.map((link, index) => (
                      <li key={link.href + index}>
                        <Link
                          className="text-white-30 inline-block cursor-pointer transition-[translate,color] hover:translate-x-2 hover:text-white"
                          href={getInternalPath(link.href)}
                          scroll={false}
                        >
                          {isFrench ? link.text.fr : link.text.en}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <nav>
                  <ul className="flex flex-col gap-4">
                    <li>Socials</li>
                    {SOCIALS.map((link, index) => (
                      <li key={link.href + index}>
                        <Link
                          className="text-white-30 inline-block transition-[translate,color] hover:translate-x-2 hover:text-white"
                          href={link.href}
                          scroll={false}
                          target="_blank"
                        >
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="hidden md:block" />
                <div className="gap-y-default col-span-1 flex flex-col sm:col-span-2">
                  <NewsletterForm animate={false} hintId="hint-newsletter-footer" isDark={false} />
                  <Language className="md:ml-auto" isDark={true} />
                </div>
              </div>
              <div className="flex w-full flex-col justify-between gap-5 md:flex-row md:items-center lg:grid lg:grid-cols-6">
                <p>Metabole® 2025</p>
                <p className="whitespace-nowrap">{CONTACT.ADDRESS}</p>
                <Time className="block md:hidden lg:block" isDark={true} />
                <a href={'mailto:' + CONTACT.EMAIL}>{CONTACT.EMAIL}</a>
                <button
                  className="flex w-fit cursor-pointer items-center justify-end gap-2 text-right lg:col-span-2 lg:ml-auto"
                  onClick={() => smoothScrollTo(0, 1800)}
                >
                  <IconArrow />
                  <p>Back to top</p>
                </button>
              </div>
              <div className="h-px w-full bg-white/12" />
            </div>
            <Link href={getInternalPath('/contact')} scroll={false}>
              <svg
                ref={animatedTitleRef}
                className="mx-auto h-auto w-[calc(100vw-(var(--x-default)*2))]"
                fill="none"
                height="231"
                viewBox="0 0 1120 231"
                width="1120"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={trainAnimPlay}
                onMouseLeave={trainAnimReverse}
              >
                <path
                  className="inline-block translate-y-(--y-default)"
                  d="M1084.14 226C1058.89 226 1039.95 212.742 1039.95 182.121V91.5227H1011.54V63.7433H1040.58V27.125H1071.52V63.7433H1119.82V91.5227H1071.52V180.543C1071.52 193.17 1078.15 197.905 1087.93 197.905H1116.97V226H1084.14Z"
                  fill="white"
                />
                <path
                  className="inline-block translate-y-(--y-default)"
                  d="M930.71 230.104C881.465 230.104 846.109 193.801 846.109 144.872C846.109 95.9422 882.096 59.6396 930.71 59.6396C964.172 59.6396 992.898 76.0547 1005.84 107.938L978.693 122.143C973.011 104.465 955.017 88.6817 930.71 88.6817C900.405 88.6817 878.308 112.042 878.308 144.872C878.308 178.965 901.352 201.062 930.71 201.062C952.807 201.062 973.011 189.382 981.218 165.706L1008.05 178.333C995.423 213.689 965.119 230.104 930.71 230.104Z"
                  fill="white"
                />
                <path
                  className="inline-block translate-y-(--y-default)"
                  d="M746.16 230.104C713.646 230.104 690.602 208.954 690.602 178.649C690.602 148.344 713.014 130.666 744.266 127.51L799.509 121.828C799.194 102.571 785.304 87.419 760.997 87.419C738.584 87.419 727.851 101.624 725.01 114.567L696.915 106.36C704.176 77.9488 727.535 59.6396 760.997 59.6396C808.348 59.6396 830.445 91.2071 830.445 123.722V226H799.194V176.124C799.194 210.532 777.096 230.104 746.16 230.104ZM722.169 178.649C722.169 194.117 735.427 203.903 752.789 203.903C786.251 203.903 799.509 179.596 799.509 156.552V147.713L751.211 152.764C731.955 154.973 722.169 163.812 722.169 178.649Z"
                  fill="white"
                />
                <path
                  className="inline-block translate-y-(--y-default)"
                  d="M642.879 226C617.625 226 598.684 212.742 598.684 182.121V91.5227H570.273V63.7433H599.316V27.125H630.252V63.7433H678.55V91.5227H630.252V180.543C630.252 193.17 636.881 197.905 646.667 197.905H675.709V226H642.879Z"
                  fill="white"
                />
                <path
                  className="inline-block translate-y-(--y-default)"
                  d="M415.619 226V63.7434H447.187V115.514C447.187 86.1563 467.705 59.6396 500.536 59.6396C538.101 59.6396 557.357 87.7347 557.357 118.671V226H525.79V127.825C525.79 105.412 509.059 89.6288 487.909 89.6288C463.602 89.6288 447.187 107.307 447.187 131.298V226H415.619Z"
                  fill="white"
                />
                <path
                  className="inline-block translate-y-(--y-default)"
                  d="M311.651 230.104C262.09 230.104 226.104 194.748 226.104 144.872C226.104 95.3109 262.09 59.6396 311.651 59.6396C360.265 59.6396 397.199 95.3109 397.199 144.872C397.199 194.748 360.265 230.104 311.651 230.104ZM258.302 144.872C258.302 178.649 281.031 201.378 311.651 201.378C342.272 201.378 365 178.649 365 144.872C365 112.357 342.272 88.366 311.651 88.366C281.031 88.366 258.302 112.357 258.302 144.872Z"
                  fill="white"
                />
                <path
                  className="inline-block translate-y-(--y-default)"
                  d="M114.218 230.104C47.2948 230.104 0.890625 180.858 0.890625 115.514C0.890625 50.8005 48.2418 0.923828 114.218 0.923828C162.832 0.923828 197.556 27.1248 213.024 62.4804L184.613 77.6328C175.143 52.0632 148.942 31.86 114.218 31.86C68.1293 31.86 34.3521 66.8999 34.3521 115.514C34.3521 164.759 68.1293 199.168 114.218 199.168C147.995 199.168 178.3 178.964 188.086 144.556L217.128 159.077C203.238 200.115 164.41 230.104 114.218 230.104Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
