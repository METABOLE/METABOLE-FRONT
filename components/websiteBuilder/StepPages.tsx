import { useLanguage } from '@/providers/language.provider';
import { COLORS, Page } from '@/types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { IconCross } from '../Icons';
import ButtonCheckbox from '../atoms/ButtonCheckbox';

interface StepPagesProps {
  pages: Page[];
  onToggle: (pageId: string) => void;
  onDelete: (pageId: string) => void;
  onAdd: (pageTitle: string) => void;
}

const StepPages = ({ pages, onToggle, onDelete, onAdd }: StepPagesProps) => {
  const { isFrench } = useLanguage();

  const newPageRef = useRef<HTMLInputElement>(null);
  const widthInputRef = useRef<HTMLParagraphElement>(null);

  const [newPageValue, setNewPageValue] = useState('');
  const [inputWidth, setInputWidth] = useState('155px');
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    if (widthInputRef.current) {
      const width = newPageValue ? `${widthInputRef.current.offsetWidth}px` : '155px';
      setInputWidth(width);
    }
  }, [newPageValue]);

  const handleAddPage = () => {
    if (!newPageValue.trim()) return;
    onAdd(newPageValue);
    setNewPageValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPage();
    }
  };

  return (
    <div className="flex w-full flex-wrap gap-1.5 overflow-scroll">
      <AnimatePresence>
        {pages.map((page, index) => (
          <motion.div
            key={page.id}
            animate={{ scale: 1, transformOrigin: 'left' }}
            className="h-fit"
            exit={{ scale: 0, transformOrigin: 'left' }}
            initial={{ scale: 0, transformOrigin: 'left' }}
            transition={{
              duration: 0.3,
              ease: [0.76, 0, 0.24, 1],
              delay: index * 0.02,
            }}
            layout
          >
            <ButtonCheckbox
              key={page.id}
              id={page.id}
              selected={page.selected}
              title={isFrench ? page.title.fr : page.title.en}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          </motion.div>
        ))}

        <motion.div
          key="button-add-page"
          animate={{ scale: 1, transformOrigin: 'left' }}
          exit={{ scale: 0, transformOrigin: 'left' }}
          initial={{ scale: 0, transformOrigin: 'left' }}
          transition={{
            duration: 0.3,
            ease: [0.76, 0, 0.24, 1],
            delay: 0,
          }}
          layout
        >
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
                {newPageValue || isFrench ? 'Nommez votre page' : 'Name your page'}
              </p>
            </div>
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StepPages;
