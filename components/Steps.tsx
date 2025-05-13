import { ANIMATIONS, OPTIONS, PAGES } from '@/constants/websiteBuilder.constant';
import { COLORS } from '@/types';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { IconCross } from './Icons';
import Checkbox from './Checkbox';

export const StepPages = () => {
  const newPageRef = useRef<HTMLInputElement>(null);

  const [newPageValue, setNewPageValue] = useState('');
  const [pages, setPages] = useState([
    ...PAGES.map((page) => ({
      ...page,
      selected: false,
    })),
  ]);

  const handleAddPage = () => {
    if (!newPageValue.trim()) return;
    setPages([
      ...pages,
      {
        id: crypto.randomUUID(),
        title: {
          en: newPageValue.trim(),
          fr: newPageValue.trim(),
        },
        pricing: 700,
        selected: true,
      },
    ]);
    setNewPageValue('');
  };

  const handleTogglePage = (id: string) => {
    setPages(pages.map((page) => (page.id === id ? { ...page, selected: !page.selected } : page)));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPage();
    }
  };

  const handleDeletePage = (id: string) => {
    setPages(pages.filter((page) => page.id !== id));
  };

  return (
    <div className="flex w-full flex-wrap gap-1.5 overflow-scroll">
      {pages.map((page) => (
        <button
          key={page.id}
          className={clsx(
            'flex h-11 w-fit cursor-pointer items-center gap-2.5 rounded-full px-6',
            page.selected ? 'bg-blue text-white' : 'bg-white text-black',
          )}
          onClick={() => handleTogglePage(page.id)}
        >
          <IconCross
            className={clsx('cursor-pointer transition-colors', page.selected ? 'rotate-45' : '')}
            color={page.selected ? COLORS.WHITE : COLORS.BLACK}
            onClick={(e) => {
              e.stopPropagation();
              handleDeletePage(page.id);
            }}
          />
          <span className="max-w-20 overflow-hidden text-ellipsis whitespace-nowrap">
            {page.title.en}
          </span>
        </button>
      ))}
      <button
        className={clsx(
          'flex h-11 w-fit cursor-pointer items-center gap-2.5 rounded-full border-[1px] border-dashed px-6 text-black',
          newPageValue ? 'border-white bg-white' : 'border-blue-30 bg-transparent',
        )}
        onClick={() => newPageRef.current?.focus()}
      >
        <IconCross
          className="transition-colors"
          color={newPageValue ? COLORS.BLACK : COLORS.BLUE}
          onClick={(e) => {
            e.stopPropagation();
            handleAddPage();
          }}
        />
        <input
          ref={newPageRef}
          className="placeholder:text-blue-30 w-[155px] bg-transparent outline-none"
          placeholder="Nommez votre page"
          type="text"
          value={newPageValue}
          onBlur={handleAddPage}
          onChange={(e) => setNewPageValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </button>
    </div>
  );
};

export const StepAnimations = () => {
  const [selectedAnimation, setSelectedAnimation] = useState(ANIMATIONS[1]);

  const handleSelectAnimation = (animation: (typeof ANIMATIONS)[0]) => {
    setSelectedAnimation(animation);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {ANIMATIONS.map((animation) => (
        <button
          key={animation.title.en}
          className={clsx(
            'group flex h-11 w-fit cursor-pointer items-center gap-2.5 overflow-hidden rounded-full bg-white px-6 text-black transition-colors duration-150 hover:text-white',
            selectedAnimation.title.en === animation.title.en
              ? 'bg-blue text-white'
              : 'bg-white text-black',
          )}
          onClick={() => handleSelectAnimation(animation)}
        >
          <div className="relative z-0">
            <div
              className={clsx(
                'ease-power2-in-out top-0 z-10 h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:bg-white',
                selectedAnimation.title.en === animation.title.en ? 'bg-white' : 'bg-blue',
              )}
            />
            <div
              className={clsx(
                'bg-blue ease-power2-in-out absolute top-0 -z-10 h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-[50]',
                selectedAnimation.title.en === animation.title.en ? 'scale-[50]' : 'scale-0',
              )}
            />
          </div>
          <span className="z-10">{animation.title.en}</span>
        </button>
      ))}
    </div>
  );
};

export const StepOptions = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-6">
      {OPTIONS.map((option) => (
        <Checkbox key={option.title.en} label={option.title.en} />
      ))}
    </div>
  );
};
