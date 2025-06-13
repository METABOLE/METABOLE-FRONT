import { ANIMATIONS } from '@/constants';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useLanguage } from '@/providers/language.provider';
import { Animation, Option, Page } from '@/types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import SafeNumberFlow from '../SafeNumberFlow';
import PageViewer from './PageViewer';
import AddPage, { AddPageRef } from './AddPage';

const Viewer = ({
  selectedPages,
  selectedAnimation,
  selectedOptions,
  handleUnselectPage,
  handleDeletePage,
  handleSelectPage,
}: {
  selectedPages: Page[];
  selectedAnimation: Animation;
  selectedOptions: Option[];
  handleDeletePage: (id: string) => void;
  handleUnselectPage: (id: string) => void;
  handleSelectPage?: (pageId: string) => void;
}) => {
  const { isFrench } = useLanguage();
  const [isDragOver, setIsDragOver] = useState(false);
  const addPageRef = useRef<AddPageRef>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragOver(false);
    }
  };

  const dragRef = useClickOutside<HTMLDivElement>(() => {
    setIsDragOver(false);
  });

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const pageId = e.dataTransfer.getData('text/plain');
    if (pageId && handleSelectPage) {
      handleSelectPage(pageId);
    }
  };

  useEffect(() => {
    if (selectedPages.length > 0) {
      addPageRef.current?.reverse();
    } else {
      addPageRef.current?.play();
    }
  }, [selectedPages.length]);

  return (
    <div className="grid h-full w-full grid-rows-[1fr_243px] xl:grid-rows-[1fr_123px]">
      <div className="border-blue-30 relative h-full w-full overflow-hidden border-b-[1px]">
        <div
          ref={dragRef}
          className="relative h-full w-full overflow-hidden rounded-t-3xl"
          onDragEnter={handleDragEnter}
          onDragExit={handleDragLeave}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p className="h3 absolute top-6 left-6">{isFrench ? 'Votre site :' : 'Your site :'}</p>
          <AddPage ref={addPageRef} />
          <PageViewer
            handleDeletePage={handleDeletePage}
            handleUnselectPage={handleUnselectPage}
            pages={selectedPages}
          />

          <div
            className={clsx(
              'bg-blue/10 pointer-events-none absolute inset-0 z-50 transition-opacity',
              isDragOver ? 'opacity-100' : 'opacity-0',
            )}
          />
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 flex w-full justify-end gap-4 overflow-scroll p-4">
          <AnimatePresence>
            {selectedOptions.map((option, index) => (
              <motion.div
                key={option.id}
                animate={{ scale: 1, transformOrigin: 'right' }}
                className="h-fit"
                exit={{ scale: 0, transformOrigin: 'right' }}
                initial={{ scale: 0, transformOrigin: 'right' }}
                transition={{
                  duration: 0.3,
                  ease: [0.76, 0, 0.24, 1],
                  delay: index * 0.02,
                }}
                layout
              >
                <p
                  key={option.id}
                  className="p3 bg-blue rounded-md px-3 py-1.5 whitespace-nowrap text-white"
                >
                  {isFrench ? option.title.fr : option.title.en}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-2 xl:grid-cols-[1fr_2fr_1fr]">
        <div className="border-blue-30 flex items-center justify-center gap-2 xl:border-r-[1px]">
          <AnimatePresence>
            <SafeNumberFlow
              key="selected-pages"
              className="h1 text-blue"
              value={selectedPages.length}
            />
            <motion.p key="selected-pages-text" className="h3 pt-7" layout>
              page{selectedPages.length > 1 ? 's' : ''}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="border-blue-30 col-span-2 row-start-2 flex flex-col items-center justify-center gap-2 border-t-[1px] text-center xl:col-span-1 xl:row-start-auto xl:border-t-0">
          <p className="h3">Animations</p>
          <div className="h-7 overflow-hidden">
            <p
              className={clsx(
                'h3 text-blue ease-power4-in-out space-y-1 transition-transform duration-500',
                selectedAnimation.type === ANIMATIONS.LIGHT.type && 'translate-y-0',
                selectedAnimation.type === ANIMATIONS.IMMERSIVES.type && 'translate-y-[-1.7rem]',
                selectedAnimation.type === ANIMATIONS.ADVANCED.type && 'translate-y-[-3.4rem]',
              )}
            >
              <span className="block">{ANIMATIONS.LIGHT.title[isFrench ? 'fr' : 'en']}</span>
              <span className="block">{ANIMATIONS.IMMERSIVES.title[isFrench ? 'fr' : 'en']}</span>
              <span className="block">{ANIMATIONS.ADVANCED.title[isFrench ? 'fr' : 'en']}</span>
            </p>
          </div>
        </div>
        <div className="border-blue-30 flex items-center justify-center gap-2 border-l-[1px]">
          <AnimatePresence>
            <SafeNumberFlow
              key="selected-options"
              className="h1 text-blue"
              value={selectedOptions.length}
            />
            <motion.p key="selected-options-text" className="h3 pt-7" layout>
              option{selectedOptions.length > 1 ? 's' : ''}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
