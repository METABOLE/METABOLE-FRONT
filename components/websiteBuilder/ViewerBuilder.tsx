import { useLanguage } from '@/providers/language.provider';
import { Animation, COLORS, Option, Page } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import Hint from '../Hint';
import { IconQuestionMark } from '../Icons';
import SafeNumberFlow from '../SafeNumberFlow';
import PageViewer from './PageViewer';

const ViewerBuilder = ({
  selectedPages,
  selectedAnimation,
  selectedOptions,
  totalPrice,
  handleUnselectPage,
  handleDeletePage,
}: {
  selectedPages: Page[];
  selectedAnimation: Animation;
  selectedOptions: Option[];
  totalPrice: number;
  handleDeletePage: (id: string) => void;
  handleUnselectPage: (id: string) => void;
}) => {
  const { isFrench } = useLanguage();

  return (
    <div className="grid h-full w-full grid-rows-[1fr_243px_123px] lg:grid-rows-[1fr_123px_123px]">
      <div className="border-blue-30 relative h-full w-full overflow-hidden border-b-[1px]">
        <PageViewer
          handleDeletePage={handleDeletePage}
          handleUnselectPage={handleUnselectPage}
          pages={selectedPages}
        />
        <div className="absolute bottom-0 left-0 flex w-full gap-4 overflow-scroll p-4">
          <AnimatePresence>
            {selectedOptions.map((option, index) => (
              <motion.div
                key={option.id}
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
      <div className="border-blue-30 grid h-full w-full grid-cols-2 border-b-[1px] lg:grid-cols-[1fr_2fr_1fr]">
        <div className="border-blue-30 flex items-center justify-center gap-2 lg:border-r-[1px]">
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
        <div className="border-blue-30 col-span-2 row-start-2 flex flex-col items-center justify-center gap-2 border-t-[1px] text-center lg:col-span-1 lg:row-start-auto lg:border-t-0">
          <p className="h3">Animations</p>
          <p className="h3 text-blue">
            {isFrench ? selectedAnimation.title.fr : selectedAnimation.title.en}
          </p>
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
      <div className="flex h-full w-full items-end px-6 pt-6 pb-2">
        <div className="flex gap-2.5 pb-4">
          <button className="cursor-help" id="hint-website-builder">
            <IconQuestionMark color={COLORS.BLUE} />
            <Hint containerId="hint-website-builder" isLeft={true}>
              {isFrench ? (
                <p>
                  Estimation basée sur votre sélection. Le prix final peut varier selon les détails
                  de votre projet. <strong>Contactez-nous</strong> pour un devis précis !
                </p>
              ) : (
                <p>
                  Estimate based on your selection. Final price may vary depending on project
                  details. <strong>Contact us</strong> for an accurate quote!
                </p>
              )}
            </Hint>
          </button>
          <p>{isFrench ? 'Notre estimation' : 'Our estimation'}</p>
        </div>
        <p className="h2 text-blue pl-2">
          <SafeNumberFlow suffix=" €" value={totalPrice} />
        </p>
      </div>
    </div>
  );
};

export default ViewerBuilder;
