import { PAGES } from '@/constants/websiteBuilder.constant';
import { COLORS, Page } from '@/types';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { IconCross } from '../Icons';
import ButtonCheckbox from '../atoms/ButtonCheckbox';

export const StepPages = ({ onPagesChange }: { onPagesChange?: (pages: Page[]) => void }) => {
  const newPageRef = useRef<HTMLInputElement>(null);
  const widthInputRef = useRef<HTMLParagraphElement>(null);

  const [newPageValue, setNewPageValue] = useState('');
  const [inputWidth, setInputWidth] = useState('155px');
  const [inputFocused, setInputFocused] = useState(false);
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

  useEffect(() => {
    if (widthInputRef.current) {
      const width = newPageValue ? `${widthInputRef.current.offsetWidth}px` : '155px';
      setInputWidth(width);
    }
  }, [newPageValue]);

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
        <ButtonCheckbox
          key={page.id}
          id={page.id}
          selected={page.selected}
          title={page.title.en}
          onDelete={handleDeletePage}
          onToggle={handleTogglePage}
        />
      ))}
      <button
        className={clsx(
          'flex h-11 w-fit cursor-pointer items-center gap-2.5 overflow-hidden rounded-full border-[1px] px-6 text-black transition-colors duration-150',
          newPageValue ? 'border-solid border-white' : 'border-blue-30 border-dashed',
        )}
        onClick={() => newPageRef.current?.focus()}
      >
        <div className="relative flex items-center justify-center">
          <div
            className={clsx(
              'absolute -z-10 h-4 w-4 rounded-full bg-white transition-transform duration-300',
              newPageValue ? 'scale-[50]' : 'scale-0',
            )}
          />
          <IconCross
            className="transition-colors"
            color={newPageValue ? COLORS.BLACK : COLORS.BLUE}
          />
        </div>
        <div className="relative">
          <input
            ref={newPageRef}
            className="p3 placeholder:text-blue-30 w-full bg-transparent outline-none"
            placeholder="Nommez votre page"
            style={{ width: inputWidth }}
            type="text"
            value={newPageValue}
            onFocus={() => setInputFocused(true)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              setInputFocused(false);
              handleAddPage();
            }}
            onChange={(e) => {
              setNewPageValue(e.target.value);
            }}
          />
          <p
            ref={widthInputRef}
            className={clsx(
              'p3 blinker absolute top-0 left-0 -z-10 h-0 whitespace-pre opacity-0',
              inputFocused ? 'active' : 'inactive',
            )}
          >
            {newPageValue || 'Nommez votre page'}
          </p>
        </div>
      </button>
    </div>
  );
};
