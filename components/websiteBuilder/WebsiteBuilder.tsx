import { ANIMATIONS, STEPS } from '@/constants/websiteBuilder.constant';
import { Animation, Option, Page, WEBSITE_BUILDER_STEPS } from '@/types';
import NumberFlow from '@number-flow/react';
import clsx from 'clsx';
import { useState } from 'react';
import Button from '../atoms/Button';
import { StepPages } from './StepPages';
import { StepAnimations } from './StepsAnimations';
import { StepOptions } from './StepsOptions';

const WebsiteBuilder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const [selectedPages, setSelectedPages] = useState<Page[]>([]);
  const [selectedAnimation, setSelectedAnimation] = useState<Animation>(ANIMATIONS.IMMERSIVES);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const isCurrentStepCompleted = (): boolean => {
    switch (STEPS[activeStep].type) {
      case WEBSITE_BUILDER_STEPS.PAGES:
        return selectedPages.length > 0;
      case WEBSITE_BUILDER_STEPS.ANIMATIONS:
        return !!selectedAnimation;
      case WEBSITE_BUILDER_STEPS.OPTIONS:
        return true;
      default:
        return false;
    }
  };

  const isStepCompleted = (stepIndex: number): boolean => {
    return completedSteps.includes(stepIndex);
  };

  const handlePagesChange = (pages: Page[]) => {
    const selected = pages.filter((page) => page.selected);
    setSelectedPages(selected);
  };

  const handleAnimationChange = (animation: Animation) => {
    setSelectedAnimation(animation);
  };

  const handleOptionsChange = (options: Option[]) => {
    setSelectedOptions(options.filter((option) => option.selected));
  };

  const basePrice =
    selectedPages.reduce((acc, page) => acc + page.pricing, 0) +
    selectedOptions.reduce((acc, option) => acc + option.pricing, 0);

  const totalPrice = selectedAnimation
    ? basePrice + basePrice * selectedAnimation.percent
    : basePrice;

  const renderActiveStep = (type: WEBSITE_BUILDER_STEPS) => {
    switch (type) {
      case WEBSITE_BUILDER_STEPS.PAGES:
        return <StepPages onPagesChange={handlePagesChange} />;
      case WEBSITE_BUILDER_STEPS.ANIMATIONS:
        return (
          <StepAnimations
            initialAnimation={selectedAnimation}
            onAnimationChange={handleAnimationChange}
          />
        );
      case WEBSITE_BUILDER_STEPS.OPTIONS:
        return <StepOptions onOptionsChange={handleOptionsChange} />;
    }
  };

  const handleNextStep = () => {
    if (!isStepCompleted(activeStep) && isCurrentStepCompleted()) {
      setCompletedSteps((prev) => [...prev, activeStep]);
    }

    if (activeStep < STEPS.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      console.log('Données du devis:', {
        pages: selectedPages,
        animation: selectedAnimation,
        options: selectedOptions,
        totalPrice,
      });

      const allStepsIndices = Array.from({ length: STEPS.length }, (_, i) => i);
      setCompletedSteps(allStepsIndices);
    }
  };

  const handleStepClick = (index: number) => {
    if (isStepCompleted(index)) {
      setActiveStep(index);
    }
  };

  const isNextButtonEnabled = isCurrentStepCompleted();

  return (
    <div className="grid h-[80vh] w-full grid-cols-2 gap-5 lg:grid-cols-3">
      <div className="col-span-1 flex h-full w-full flex-col gap-5">
        {STEPS.map((step, index) => {
          const isCompleted = isStepCompleted(index);
          const isActive = activeStep === index;

          return (
            <div
              key={index}
              className={clsx(
                'ease-power4-in-out flex h-[78px] flex-col overflow-hidden rounded-3xl border-[1px] bg-[#e9e9fd] backdrop-blur-xl transition-all duration-500',
                isCompleted && !isActive ? 'border-blue' : 'border-blue-30',
                isActive ? 'grow' : 'shrink',
              )}
              onClick={() => setActiveStep(index)}
            >
              <h3
                className={clsx(
                  'ease-power4-in-out flex items-center gap-2.5 whitespace-nowrap transition-[padding] duration-500',
                  isActive ? 'p-6' : 'p-2.5',
                )}
              >
                <span className="p1 bg-blue flex h-14 w-14 shrink-0 items-center justify-center rounded-[19px] text-white">
                  {isCompleted ? (
                    <svg
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    index + 1
                  )}
                  <div
                    className={clsx(
                      'bg-blue absolute -z-10 h-4 w-4 rounded-full transition-transform duration-300',
                      isCompleted && !isActive ? 'scale-[60]' : 'scale-0',
                    )}
                  />
                </span>
                <span
                  className={clsx(
                    'overflow-hidden leading-14 text-ellipsis',
                    isCompleted && !isActive ? 'text-white' : 'text-black',
                  )}
                >
                  {step.title}
                </span>
              </h3>
              <div className="px-6">{step.description}</div>
              <div className="smoother-y-blue-menu-background shrink grow-0 overflow-hidden px-6">
                <div
                  className="no-scrollbar h-full shrink-0 overflow-scroll py-6"
                  data-lenis-prevent
                >
                  {renderActiveStep(step.type)}
                </div>
              </div>
              <div className="mt-auto ml-auto p-6">
                <Button
                  className={clsx('shrink-0', !isNextButtonEnabled && 'opacity-50')}
                  color="secondary"
                  disabled={!isNextButtonEnabled}
                  onClick={handleNextStep}
                >
                  {index === STEPS.length - 1 ? 'Finaliser' : 'Suivant'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-blue-30 col-span-1 h-full w-full shrink-0 rounded-3xl border-[1px] bg-[#e9e9fd] p-6 backdrop-blur-xl lg:col-span-2">
        <h2 className="mb-6 text-2xl font-bold">Récapitulatif du devis</h2>

        <div className="mb-6 flex w-full">
          {STEPS.map((step, index) => (
            <div key={index} className="flex-1">
              <div className="relative mx-auto h-2 w-full bg-gray-200">
                <div
                  className={clsx(
                    'absolute top-0 left-0 h-full transition-all duration-500',
                    isStepCompleted(index) ? 'w-full bg-green-600' : 'bg-blue w-0',
                  )}
                />
              </div>
              <div className="mt-2 text-center text-xs">{step.title}</div>
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
              <span>{selectedAnimation.percent} %</span>
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
      </div>
    </div>
  );
};

export default WebsiteBuilder;
