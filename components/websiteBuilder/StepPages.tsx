import { PAGES } from '@/constants/websiteBuilder.constant';
import { COLORS, Page } from '@/types';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { IconCross } from '../Icons';

export const StepPages = ({ onPagesChange }: { onPagesChange?: (pages: Page[]) => void }) => {
  const newPageRef = useRef<HTMLInputElement>(null);
  const [newPageValue, setNewPageValue] = useState('');
  const [pages, setPages] = useState<Page[]>(
    PAGES.map((page) => ({
      ...page,
      selected: false,
    })),
  );

  const updatePages = (newPages: Page[]) => {
    setPages(newPages);
    if (onPagesChange) {
      onPagesChange(newPages);
    }
  };

  const handleAddPage = () => {
    if (!newPageValue.trim()) return;
    const newPages = [
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
    ];
    updatePages(newPages);
    setNewPageValue('');
  };

  const handleTogglePage = (id: string) => {
    const newPages = pages.map((page) =>
      page.id === id ? { ...page, selected: !page.selected } : page,
    );
    updatePages(newPages);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPage();
    }
  };

  const handleDeletePage = (id: string) => {
    const newPages = pages.filter((page) => page.id !== id);
    updatePages(newPages);
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
