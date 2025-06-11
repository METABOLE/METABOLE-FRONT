import { CONTACT, LINKS, SOCIALS } from '@/constants';
import { useShortcut } from '@/hooks/useShortcut';
import { useLanguage } from '@/providers/language.provider';
import { ProjectType, TAG_TYPE } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import Button, { AnimatedButtonRef } from './atoms/Button';
import Tag, { AnimatedTagRef } from './atoms/Tag';
import CutoutWrapper, { AnimatedCutoutWrapperRef } from './CutoutWrapper';
import { LogoFull } from './Icons';
import Language from './Language';
import NewsletterForm, { AnimatedNewsletterFormRef } from './NewsletterForm';
import Sound from './Sound';
import Time from './Time';

const Menu = ({ projects }: { projects: ProjectType[] }) => {
  const SLICED_PROJECTS = projects.slice(0, 6);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const headerRef = useRef<HTMLElement>(null);
  const wrapperButtonRef = useRef(null);
  const cutoutRef = useRef<AnimatedCutoutWrapperRef>(null);
  const contactMenuRef = useRef<AnimatedButtonRef>(null);
  const buttonMenuRef = useRef<AnimatedButtonRef>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const titleProjectsRef = useRef(null);
  const projectTagsRefs = useRef<AnimatedTagRef[]>([]);
  const newsletterFormRef = useRef<AnimatedNewsletterFormRef>(null);
  const socialsRef = useRef<HTMLUListElement>(null);
  const infosRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline>(gsap.timeline());

  const pathname = usePathname();
  const { isFrench, getInternalPath } = useLanguage();
  const { contextSafe } = useGSAP();

  const openMenu = contextSafe(() => {
    if (
      !cutoutRef.current ||
      !linksRef.current ||
      !socialsRef.current ||
      !headerRef.current ||
      !infosRef.current
    )
      return;

    timelineRef.current = gsap
      .timeline()
      .set([linksRef.current.children, titleProjectsRef.current], {
        scaleY: 0,
        y: 40,
        xPercent: 0,
      })
      .set(socialsRef.current.children, {
        width: '0px',
      })
      .set(linksRef.current, {
        overflow: 'visible',
      })
      .set(socialsRef.current, {
        overflow: 'hidden',
      })
      .set(infosRef.current.children, {
        y: 40,
      })
      .set(menuRef.current, { opacity: 1 })
      .addLabel('hide-button')
      .to(
        wrapperButtonRef.current,
        { width: 44, gap: 0, duration: 0.4, ease: 'power2.inOut' },
        'hide-button',
      )
      .add(() => contactMenuRef.current?.reverse(), 'hide-button')
      .add(() => buttonMenuRef.current?.reverse(), 'hide-button+=0.15')
      .addLabel('show-mask')
      .to(
        menuRef.current,
        { backdropFilter: 'blur(10px)', backgroundColor: '#E3E3FF', duration: 0.8 },
        'show-mask',
      )
      .add(() => cutoutRef.current?.openCutoutWrapper(), 'show-mask')
      .to(
        headerRef.current,
        {
          top: 32,
          paddingBlock: gsap.utils.clamp(20, 8 * window.innerHeight * 0.01, 100),
          duration: 0.8,
          ease: 'power2.inOut',
        },
        'show-mask',
      )
      .to(
        headerRef.current.children,
        {
          paddingInline: gsap.utils.clamp(20, 8 * window.innerWidth * 0.01, 100),
          paddingBlock: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        'show-mask',
      )
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
      .add(() => setIsMenuOpen(true))
      .to(
        wrapperButtonRef.current,
        { width: 'auto', gap: 16, duration: 0.3, ease: 'power2.inOut' },
        '-=0.4',
      )
      .add(() => buttonMenuRef.current?.play())
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
      .add(() => {
        projectTagsRefs.current.map((ref, index) => {
          gsap.delayedCall(index * 0.1, () => ref.play());
        });
      }, '-=1')
      // .addLabel('show-form')
      .add(() => {
        newsletterFormRef.current?.play();
      }, '-=0.6')
      .to(
        socialsRef.current.children,
        {
          width: 'auto',
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '-=0.6',
      )
      .to(
        infosRef.current.children,
        {
          y: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '-=1',
      );
  });

  const closeMenu = contextSafe(() => {
    if (
      !cutoutRef.current ||
      !linksRef.current ||
      !headerRef.current ||
      !socialsRef.current ||
      !infosRef.current
    )
      return;

    timelineRef.current = gsap
      .timeline()
      .set([linksRef.current, socialsRef.current], {
        overflow: 'hidden',
      })
      .addLabel('hide-button')
      .add(() => {
        buttonMenuRef.current?.reverse();
        contactMenuRef.current?.reverse();
      }, 'hide-button')
      .to(wrapperButtonRef.current, { width: 44, duration: 0.4 }, 'hide-button')
      .to(
        linksRef.current.children,
        {
          xPercent: -100,
          duration: 1,
          ease: 'power2.inOut',
          stagger: 0.05,
        },
        '<',
      )
      .to(
        socialsRef.current.children,
        {
          width: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '<',
      )
      .add(() => {
        projectTagsRefs.current.map((ref, index) => {
          gsap.delayedCall(index * 0.05, () => ref.reverse());
        });
      }, '<')
      .add(() => {
        newsletterFormRef.current?.reverse();
      }, '<')
      .to(
        infosRef.current.children,
        {
          y: 40,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '<',
      )
      .to(
        titleProjectsRef.current,
        {
          xPercent: -100,
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=1',
      )
      .add(() => cutoutRef.current?.closeCutoutWrapper(), '+=0.2')
      .to(
        headerRef.current.children,
        {
          paddingInline: 0,
          paddingBlock: 32,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      )
      .to(
        headerRef.current,
        {
          top: 0,
          paddingBlock: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      )
      .to(
        menuRef.current,
        { backdropFilter: 'blur(0px)', backgroundColor: '#E3E3FF00', duration: 0.8 },
        '<',
      )
      .to(wrapperButtonRef.current, { width: 'auto', gap: 16, duration: 0.6 }, '<')
      .addLabel('show-button')
      .add(() => {
        buttonMenuRef.current?.play();
      }, 'show-button')
      .add(() => {
        contactMenuRef.current?.play();
      }, 'show-button')
      .add(() => setIsMenuOpen(false), '<');
  });

  useShortcut('Escape', () => isMenuOpen && closeMenu());

  useGSAP(() => {
    buttonMenuRef.current?.play();
    contactMenuRef.current?.play();
  }, []);

  return (
    <>
      <header ref={headerRef} className="px-x-default fixed z-[900] w-full">
        <div className="flex items-center justify-between py-8">
          <Link href={getInternalPath('/')} scroll={false}>
            <LogoFull />
          </Link>
          <div ref={wrapperButtonRef} className="flex gap-4">
            <Sound className="shrink-0" />
            <Button ref={contactMenuRef} href={getInternalPath('/contact')} transformOrigin="right">
              CONTACT
            </Button>
            <Button
              ref={buttonMenuRef}
              transformOrigin="right"
              onClick={isMenuOpen ? closeMenu : openMenu}
            >
              {isMenuOpen ? 'CLOSE' : 'MENU'}
            </Button>
          </div>
        </div>
      </header>
      <CutoutWrapper ref={cutoutRef}>
        <div
          ref={menuRef}
          className="px-x-default py-y-default gap-y-default flex h-full w-full flex-col justify-between bg-[#E3E3FF00]"
        >
          <div />
          <div className="grid grid-cols-10 gap-5">
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
            <nav className="col-span-3">
              {SLICED_PROJECTS.length > 0 && (
                <ul className="flex flex-col gap-2.5">
                  <li className="overflow-hidden">
                    <Link
                      ref={titleProjectsRef}
                      className="h3 text-black-70 inline-block"
                      href={getInternalPath('/projects')}
                      scroll={false}
                    >
                      {isFrench ? 'Projets' : 'Projects'}
                    </Link>
                  </li>
                  {SLICED_PROJECTS.map((link, index) => (
                    <li key={link.title + index}>
                      <Tag
                        ref={(el) => {
                          if (el) projectTagsRefs.current[index] = el;
                        }}
                        href={link.title}
                        type={TAG_TYPE.WHTIE}
                      >
                        {link.title}
                      </Tag>
                    </li>
                  ))}
                  <li>
                    <Tag
                      ref={(el) => {
                        if (el) projectTagsRefs.current[SLICED_PROJECTS.length + 1] = el;
                      }}
                      href="/projects"
                      type={TAG_TYPE.WHTIE}
                    >
                      {isFrench ? 'Et plus' : 'And more'} ...
                    </Tag>
                  </li>
                </ul>
              )}
            </nav>
            <div className="col-span-3">
              <NewsletterForm ref={newsletterFormRef} isDark={true} />
              <nav className="pt-y-default text-right">
                <ul ref={socialsRef} className="flex flex-col items-end gap-4 overflow-hidden">
                  <li className="p3 text-black">Socials</li>
                  {SOCIALS.map((link, index) => (
                    <li key={link.href + index}>
                      <Link
                        className="p3 text-black-30 inline-block transition-[translate,color] hover:-translate-x-2 hover:text-black"
                        href={link.href}
                        target="_blank"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div
            ref={infosRef}
            className="grid w-full grid-cols-6 items-center gap-5 overflow-y-hidden whitespace-nowrap"
          >
            <p>Metabole® 2025</p>
            <p>{CONTACT.ADDRESS}</p>
            <Time isDark={false} />
            <a className="col-span-2" href={'mailto:' + CONTACT.EMAIL}>
              {CONTACT.EMAIL}
            </a>
            <div className="flex w-full justify-end">
              <Language />
            </div>
          </div>
        </div>
      </CutoutWrapper>
    </>
  );
};

export default Menu;
