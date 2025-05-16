import { useLanguage } from '@/providers/language.provider';
import { Animation, Option, Page, Step } from '@/types';
import NumberFlow from '@number-flow/react';
import clsx from 'clsx';

const ViewerBuilder = ({
  steps,
  selectedPages,
  selectedAnimation,
  selectedOptions,
  totalPrice,
}: {
  steps: Step[];
  selectedPages: Page[];
  selectedAnimation: Animation;
  selectedOptions: Option[];
  totalPrice: number;
}) => {
  const { isFrench } = useLanguage();

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Récapitulatif du devis</h2>
      <div className="mb-6 flex w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <div className="relative mx-auto h-2 w-full bg-gray-200">
              <div
                className={clsx(
                  'absolute top-0 left-0 h-full transition-all duration-500',
                  step.isCompleted ? 'w-full bg-green-600' : 'bg-blue w-0',
                )}
              />
            </div>
            <div className="mt-2 text-center text-xs">
              {isFrench ? step.title.fr : step.title.en}
            </div>
          </div>
        ))}
      </div>
      {selectedPages.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-xl">Pages sélectionnées</h3>
          <ul className="ml-4">
            {selectedPages.map((page) => (
              <li key={page.id} className="flex justify-between">
                <span>{page.title.fr}</span>
                <span>{page.pricing} €</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedAnimation && (
        <div className="mb-4">
          <h3 className="mb-2 text-xl">Animation</h3>
          <div className="ml-4 flex justify-between">
            <span>{selectedAnimation.title.fr}</span>
            <span>{selectedAnimation.percent * 100} %</span>
          </div>
        </div>
      )}
      {selectedOptions.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-xl">Options</h3>
          <ul className="ml-4">
            {selectedOptions.map((option, index) => (
              <li key={index} className="flex justify-between">
                <span>{option.title.fr}</span>
                <span>{option.pricing} €</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="border-blue-30 mt-8 border-t pt-4">
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>
            <NumberFlow value={totalPrice} /> €
          </span>
        </div>
      </div>
    </>
  );
};

export default ViewerBuilder;
