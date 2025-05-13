import { STEPS } from '@/constants/websiteBuilder.constant';
import { Animation, Option, Page, WEBSITE_BUILDER_STEPS } from '@/types';
import clsx from 'clsx';
import { useState } from 'react';
import Button from '../atoms/Button';
import { StepPages } from './StepPages';
import { StepAnimations } from './StepsAnimations';
import { StepOptions } from './StepsOptions';

const WebsiteBuilder = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [selectedPages, setSelectedPages] = useState<Page[]>([]);
  const [selectedAnimation, setSelectedAnimation] = useState<Animation | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handlePagesChange = (pages: Page[]) => {
    setSelectedPages(pages.filter((page) => page.selected));
  };

  const handleAnimationChange = (animation: Animation) => {
    setSelectedAnimation(animation);
  };

  const handleOptionsChange = (options: Option[]) => {
    setSelectedOptions(options.filter((option) => option.selected));
  };

  const totalPrice =
    selectedPages.reduce((acc, page) => acc + page.pricing, 0) +
    (selectedAnimation?.pricing || 0) +
    selectedOptions.reduce((acc, option) => acc + option.pricing, 0);

  const renderActiveStep = (type: WEBSITE_BUILDER_STEPS) => {
    switch (type) {
      case WEBSITE_BUILDER_STEPS.PAGES:
        return <StepPages onPagesChange={handlePagesChange} />;
      case WEBSITE_BUILDER_STEPS.ANIMATIONS:
        return <StepAnimations onAnimationChange={handleAnimationChange} />;
      case WEBSITE_BUILDER_STEPS.OPTIONS:
        return <StepOptions onOptionsChange={handleOptionsChange} />;
    }
  };

  const handleNextStep = () => {
    if (activeStep < STEPS.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      console.log('Données du devis:', {
        pages: selectedPages,
        animation: selectedAnimation,
        options: selectedOptions,
        totalPrice,
      });
    }
  };

  return (
    <div className="grid h-[80vh] w-full grid-cols-2 gap-5 lg:grid-cols-3">
      <div className="col-span-1 flex h-full w-full flex-col gap-5">
        {STEPS.map((step, index) => (
          <div
            key={index}
            className={clsx(
              'border-blue-30 ease-power4-in-out flex h-[78px] flex-col overflow-hidden rounded-3xl border-[1px] bg-[#e9e9fd] p-2.5 backdrop-blur-xl transition-all duration-500',
              activeStep === index ? 'flex-grow p-6' : 'bg-blue-10',
            )}
            onMouseEnter={() => setActiveStep(index)}
          >
            <h3 className="flex items-center gap-2.5">
              <span className="bg-blue p1 flex h-14 w-14 items-center justify-center rounded-[19px] text-white">
                {index + 1}
              </span>
              <span>{step.title}</span>
            </h3>
            <div className="pt-6">{step.description}</div>
            <div className="smoother-y-blue-menu-background shrink overflow-hidden">
              <div className="no-scrollbar h-full shrink-0 overflow-scroll py-6" data-lenis-prevent>
                {renderActiveStep(step.type)}
              </div>
            </div>
            <div className="mt-auto ml-auto pt-6">
              <Button className="shrink-0" color="secondary" onClick={handleNextStep}>
                {index === STEPS.length - 1 ? 'Finaliser' : 'Suivant'}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-blue-30 col-span-1 h-full w-full shrink-0 rounded-3xl border-[1px] bg-[#e9e9fd] p-6 backdrop-blur-xl lg:col-span-2">
        <h2 className="mb-6 text-2xl font-bold">Récapitulatif du devis</h2>

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
              <span>{selectedAnimation.pricing} €</span>
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
            <span>{totalPrice} €</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;
