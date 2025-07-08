import { CONTACT, LINKS, SOCIALS } from '@/constants';
import { useShortcut } from '@/hooks/useShortcut';
import { useLanguage } from '@/providers/language.provider';
import { COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { LogoSmall } from '../ui/Icons';
import Sound from '../shared/Sound';
import Time from '../shared/Time';
import Language from '../shared/Language';

const Burger = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const menuRef = useRef(null);
  const soundRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const titleProjectsRef = useRef(null);
  const socialsRef = useRef<HTMLUListElement>(null);
  const infosRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>(gsap.timeline());

  const pathname = usePathname();
  const { isFrench, getInternalPath } = useLanguage();
  const { contextSafe } = useGSAP();

  useGSAP(() => {
    if (!socialsRef.current || !infosRef.current) return;
    gsap.set([infosRef.current.children, socialsRef.current.children], {
      xPercent: -100,
    });
    gsap.set(menuRef.current, { display: 'none' });
    gsap.set(languageRef.current, {
      y: 40,
    });
  }, []);

  const openMenu = contextSafe(() => {
    if (!linksRef.current || !socialsRef.current || !infosRef.current) return;

    setIsBurgerActive(true);

    timelineRef.current = gsap
      .timeline()
      .set(menuRef.current, { display: 'flex' })
      .set([linksRef.current.children, titleProjectsRef.current], {
        scaleY: 0,
        y: 40,
        xPercent: 0,
      })
      .set(linksRef.current, {
        overflow: 'visible',
      })
      .set([infosRef.current.children, socialsRef.current.children], {
        xPercent: -100,
      })
      .set(socialsRef.current, {
        overflow: 'hidden',
      })
      .set(menuRef.current, { opacity: 1 })
      .addLabel('hide-button')
      .addLabel('show-mask')
      .to(
        menuRef.current,
        { backdropFilter: 'blur(10px)', backgroundColor: COLORS.MENU, duration: 0.8 },
        'hide-button',
      )
      .to(soundRef.current, { backgroundColor: COLORS.WHITE }, 'hide-button')
      // .addLabel('show-menu')
      .to(
        linksRef.current.children,
        {
          scaleY: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.08,
        },
        '-=0.3',
      )
      .to(languageRef.current, { y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.6')
      .add(() => setIsMenuOpen(true))
      // .addLabel('show-projects')
      .to(
        titleProjectsRef.current,
        {
          scaleY: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=1.3',
      )
      .to(
        socialsRef.current.children,
        {
          xPercent: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '-=0.8',
      )
      .to(
        infosRef.current.children,
        {
          xPercent: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '-=1',
      );
  });

  const closeMenu = contextSafe(() => {
    if (!linksRef.current || !socialsRef.current || !infosRef.current) return;

    setIsBurgerActive(false);

    timelineRef.current = gsap
      .timeline()
      .set([linksRef.current, socialsRef.current], {
        overflow: 'hidden',
      })
      .addLabel('hide-button')
      .to(languageRef.current, { y: 40, duration: 0.6, ease: 'power2.in' }, '<')
      .to(
        linksRef.current.children,
        {
          xPercent: -100,
          duration: 0.8,
          ease: 'power2.in',
          stagger: 0.05,
        },
        '<',
      )
      .to(
        socialsRef.current.children,
        {
          xPercent: -100,
          duration: 0.6,
          ease: 'power2.in',
          stagger: -0.1,
        },
        '<',
      )
      .to(
        infosRef.current.children,
        {
          xPercent: -100,
          duration: 0.8,
          ease: 'power2.in',
          stagger: -0.1,
        },
        '<',
      )
      .to(
        titleProjectsRef.current,
        {
          xPercent: -100,
          duration: 0.8,
          ease: 'power2.in',
        },
        '<',
      )
      .to(soundRef.current, { backgroundColor: COLORS.MENU }, '<')
      .to(
        menuRef.current,
        { backdropFilter: 'blur(0px)', backgroundColor: COLORS.MENU_00, duration: 0.8 },
        '-=0.2',
      )
      .set(menuRef.current, { display: 'none' })
      .addLabel('show-button')
      .add(() => setIsMenuOpen(false), '<');
  });

  useShortcut('Escape', () => isMenuOpen && closeMenu());

  return (
    <>
      <header className="px-x-default fixed z-[900] w-full">
        <div className="flex w-full items-center justify-between py-8">
          <Link className="shrink-0" href={getInternalPath('/')} scroll={false}>
            <LogoSmall className="h-10 w-10" />
          </Link>
          <div className="flex gap-4">
            <Sound ref={soundRef} />
            <button
              className="bg-blue flex h-11 w-11 cursor-pointer flex-col items-end justify-center gap-2 rounded-full p-3"
              onClick={isMenuOpen ? closeMenu : openMenu}
            >
              <div
                className={clsx(
                  'h-[1.7px] w-full bg-white transition-transform duration-300 ease-in-out',
                  isBurgerActive ? 'translate-y-[4.7px] rotate-45' : 'translate-y-0',
                )}
              />
              <div
                className={clsx(
                  'h-[1.7px] w-full bg-white transition-transform duration-300 ease-in-out',
                  isBurgerActive
                    ? 'translate-x-0 -translate-y-[4.7px] scale-100 -rotate-45'
                    : 'translate-x-0.5 translate-y-0 scale-x-75',
                )}
              />
            </button>
          </div>
        </div>
      </header>
      <div
        ref={menuRef}
        className="px-x-default gap-y-default bg-menu/0 fixed z-[800] flex h-full w-full flex-col justify-between pt-[140px] pb-[calc(32px+var(--y-double-default))]"
      >
        <nav className="col-span-4">
          <ul ref={linksRef} className="flex flex-col gap-5">
            {LINKS.map((link, index) => (
              <li key={link.href + index} className="translate-y-10 scale-y-0">
                <Link
                  href={getInternalPath(link.href)}
                  scroll={false}
                  className={clsx(
                    'h2 link inline-block',
                    pathname === getInternalPath(link.href) ? 'text-blue' : 'text-black-70',
                  )}
                  onClick={closeMenu}
                >
                  {isFrench ? link.text.fr : link.text.en}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="text-left">
          <ul ref={socialsRef} className="flex flex-col gap-4 overflow-hidden">
            <li className="p3 text-black">Socials</li>
            {SOCIALS.map((link, index) => (
              <li key={link.href + index}>
                <Link
                  className="p3 text-black-30 inline-block transition-[translate,color] hover:-translate-x-2 hover:text-black"
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

        <div className="flex w-full items-end whitespace-nowrap">
          <div ref={infosRef} className="flex w-full flex-col gap-5 overflow-hidden">
            <a className="text-blue" href={'mailto:' + CONTACT.EMAIL}>
              {CONTACT.EMAIL}
            </a>
            <p>Metabole® 2025</p>
            <Time isDark={false} />
          </div>
          <div className="flex w-fit shrink-0 justify-end overflow-hidden">
            <Language ref={languageRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Burger;
