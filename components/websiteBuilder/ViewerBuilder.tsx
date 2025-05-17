import { useLanguage } from '@/providers/language.provider';
import { Animation, COLORS, Option, Page } from '@/types';
import NumberFlow from '@number-flow/react';
import { useRef } from 'react';
import Hint from '../Hint';
import { IconQuestionMark } from '../Icons';
import PageViewer from './PageViewer';

const ViewerBuilder = ({
  selectedPages,
  selectedAnimation,
  selectedOptions,
  totalPrice,
  handleDeletePage,
}: {
  selectedPages: Page[];
  selectedAnimation: Animation;
  selectedOptions: Option[];
  totalPrice: number;
  handleDeletePage: (id: string) => void;
}) => {
  const { isFrench } = useLanguage();
  const containerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="grid h-full w-full grid-rows-[1fr_123px_123px]">
      <div className="border-blue-30 relative h-full w-full overflow-hidden border-b-[1px]">
        <PageViewer handleDeletePage={handleDeletePage} pages={selectedPages} />
        <div className="absolute bottom-4 left-4 flex gap-4">
          {selectedOptions.map((option) => (
            <p key={option.id} className="p3 bg-blue rounded-md px-3 py-1.5 text-white">
              {isFrench ? option.title.fr : option.title.en}
            </p>
          ))}
        </div>
      </div>
      <div className="border-blue-30 grid h-full w-full grid-cols-[1fr_2fr_1fr] border-b-[1px]">
        <div className="border-blue-30 grid grid-cols-2 items-center gap-2 border-r-[1px]">
          <NumberFlow className="h1 text-blue ml-auto" value={selectedPages.length} />
          <p className="h3 pt-7">page{selectedPages.length > 1 ? 's' : ''}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="h3">Animations</p>
          <p className="h3 text-blue">
            {isFrench ? selectedAnimation.title.fr : selectedAnimation.title.en}
          </p>
        </div>
        <div className="border-blue-30 grid grid-cols-2 items-center gap-2 border-l-[1px]">
          <NumberFlow className="h1 text-blue ml-auto" value={selectedOptions.length} />
          <p className="h3 pt-7">option{selectedOptions.length > 1 ? 's' : ''}</p>
        </div>
      </div>
      <div className="flex h-full w-full items-end px-6 pt-6 pb-2">
        <div className="flex gap-2.5 pb-4">
          <button ref={containerRef} className="cursor-help">
            <IconQuestionMark color={COLORS.BLUE} />
            <Hint container={containerRef} isLeft={true}>
              {isFrench ? (
                <p>
                  On ne spamme pas : <strong>1 mail tous les 3 mois</strong>, avec des news et du
                  contenu utile !
                </p>
              ) : (
                <p>
                  We don’t spam: <strong>1 email every 3 months</strong>, with news and useful
                  content!
                </p>
              )}
            </Hint>
          </button>
          <p>Notre estimation</p>
        </div>
        <p className="h2 text-blue pl-2">
          {/* <NumberFlow format={{}} prefix="~" suffix=" €" value={totalPrice} /> */}
          <NumberFlow format={{}} suffix=" €" value={totalPrice} />
        </p>
      </div>
    </div>
  );
};

export default ViewerBuilder;
