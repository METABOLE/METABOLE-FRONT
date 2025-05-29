import { useLanguage } from '@/providers/language.provider';
import { Page } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import PageCard from './PageCard';
import SafeNumberFlow from '../SafeNumberFlow';

const PageViewer = ({
  pages,
  handleDeletePage,
}: {
  pages: Page[];
  handleDeletePage: (id: string) => void;
}) => {
  const { isFrench } = useLanguage();

  const CARDS_PER_ROW = 4;
  const VERTICAL_SPACING = 150;
  const DIAGONAL_OFFSET_X = 50;
  const DIAGONAL_OFFSET_Y = 50;
  const ROW_OFFSET = 200;
  const MAX_CARDS = 8;

  const hasMoreCards = pages.length > MAX_CARDS;
  const visiblePages = hasMoreCards ? pages.slice(0, MAX_CARDS - 1) : pages;
  const remainingCount = pages.length - (MAX_CARDS - 1);
  const totalCards = hasMoreCards ? MAX_CARDS : pages.length;
  const totalRows = Math.ceil(totalCards / CARDS_PER_ROW);

  const totalRowOffset = (totalRows - 1) * ROW_OFFSET;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <AnimatePresence>
        {visiblePages.map((page, index) => {
          const row = Math.floor(index / CARDS_PER_ROW);
          const col = index % CARDS_PER_ROW;
          const cardsInCurrentRow = Math.min(CARDS_PER_ROW, totalCards - row * CARDS_PER_ROW);

          const rowWidth = (cardsInCurrentRow - 1) * DIAGONAL_OFFSET_X;
          const totalHeight = (totalRows - 1) * VERTICAL_SPACING;

          return (
            <motion.div
              key={page.id}
              className="absolute flex h-full"
              exit={{ y: 300, opacity: 0 }}
              initial={{ y: 300, opacity: 0 }}
              animate={{
                x: -col * DIAGONAL_OFFSET_X + rowWidth / 2 + row * ROW_OFFSET - totalRowOffset / 2,
                y: row * VERTICAL_SPACING - totalHeight / 2 + col * DIAGONAL_OFFSET_Y,
                opacity: 1,
              }}
              style={{
                top: '30%',
              }}
              transition={{
                duration: 0.3,
                ease: [0.76, 0, 0.24, 1],
                delay: index * 0.02,
              }}
              layout
            >
              <PageCard
                title={isFrench ? page.title.fr : page.title.en}
                onDelete={() => handleDeletePage(page.id)}
              />
            </motion.div>
          );
        })}

        {hasMoreCards && (
          <motion.div
            key="counter"
            className="absolute flex h-full"
            exit={{ y: 300, opacity: 0 }}
            initial={{ y: 300, opacity: 0 }}
            animate={{
              x:
                -((MAX_CARDS - 1) % CARDS_PER_ROW) * DIAGONAL_OFFSET_X +
                ((Math.min(
                  CARDS_PER_ROW,
                  totalCards - Math.floor((MAX_CARDS - 1) / CARDS_PER_ROW) * CARDS_PER_ROW,
                ) -
                  1) *
                  DIAGONAL_OFFSET_X) /
                  2 +
                Math.floor((MAX_CARDS - 1) / CARDS_PER_ROW) * ROW_OFFSET -
                totalRowOffset / 2,
              y:
                Math.floor((MAX_CARDS - 1) / CARDS_PER_ROW) * VERTICAL_SPACING -
                ((totalRows - 1) * VERTICAL_SPACING) / 2 +
                ((MAX_CARDS - 1) % CARDS_PER_ROW) * DIAGONAL_OFFSET_Y,
              opacity: 1,
            }}
            style={{
              top: '30%',
            }}
            transition={{
              duration: 0.3,
              ease: [0.76, 0, 0.24, 1],
              delay: (MAX_CARDS - 1) * 0.02,
            }}
            layout
          >
            <div className="border-gradient-white-to-b h-[451px] w-[263px] rounded-3xl bg-[#e9e9fd] bg-linear-to-b from-[#c3c2ff4d] to-[#C5C4FF00] px-4 py-3 backdrop-blur-xl">
              <p className="border-blue-10 h2 text-blue flex h-full grow justify-center rounded-md border-[1px] px-2 pt-10">
                <SafeNumberFlow prefix="+ " value={remainingCount} />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageViewer;
