import { useWebsiteBuilder } from '@/hooks/useWebsiteBuilder';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS, WEBSITE_BUILDER_STEPS } from '@/types';
import clsx from 'clsx';
import Button from '../atoms/Button';
import StepPages from './StepPages';
import StepAnimations from './StepsAnimations';
import StepFinalisation from './StepsFinalisation';
import StepOptions from './StepsOptions';
import ViewerBuilder from './ViewerBuilder';
import { useMatchMedia } from '@/hooks/useCheckScreenSize';

const WebsiteBuilder = () => {
  const { isFrench } = useLanguage();
  const {
    steps,
    pages,
    animations,
    selectedAnimation,
    options,
    selectedPages,
    selectedOptions,
    totalPrice,
    isCurrentStepValid,
    handlePagesChange,
    handleUnselectPage,
    handleDeletePage,
    handleAnimationChange,
    handleOptionsChange,
    handleFormChange,
    goToStep,
    nextStep,
  } = useWebsiteBuilder();
  const isMobile = useMatchMedia(BREAKPOINTS.SM);

  const renderActiveStep = (type: WEBSITE_BUILDER_STEPS) => {
    switch (type) {
      case WEBSITE_BUILDER_STEPS.PAGES:
        return (
          <StepPages
            pages={pages}
            onAdd={handlePagesChange}
            onDelete={handleDeletePage}
            onToggle={handlePagesChange}
          />
        );
      case WEBSITE_BUILDER_STEPS.ANIMATIONS:
        return (
          <StepAnimations
            animations={animations}
            selectedAnimation={selectedAnimation}
            onAnimationChange={handleAnimationChange}
          />
        );
      case WEBSITE_BUILDER_STEPS.OPTIONS:
        return <StepOptions options={options} onToggle={handleOptionsChange} />;
      case WEBSITE_BUILDER_STEPS.FINAL:
        return <StepFinalisation onFormChange={handleFormChange} />;
    }
  };

  return (
    <>
      <div className="grid h-[80vh] min-h-[800px] w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 flex h-full w-full flex-col gap-5">
          {steps.map((step, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  'ease-power4-in-out flex h-[78px] flex-col overflow-hidden rounded-3xl border-[1px] bg-[#e9e9fd] backdrop-blur-2xl transition-all duration-700',
                  step.isCompleted && !step.isActive ? 'border-blue' : 'border-blue-30',
                  step.isActive ? 'grow' : 'shrink',
                )}
              >
                <h3
                  className={clsx(
                    'ease-power4-in-out flex items-center gap-2.5 whitespace-nowrap transition-[padding] duration-700',
                    step.isActive ? 'p-6' : 'p-2.5',
                  )}
                  onClick={() => goToStep(index)}
                >
                  <span
                    className={clsx(
                      'p1 bg-blue flex h-14 w-14 shrink-0 items-center justify-center rounded-[19px] text-white',
                      'after:bg-blue after:absolute after:-z-10 after:h-4 after:w-4 after:rounded-full after:transition-transform after:duration-700 after:content-[""]',
                      step.isCompleted && !step.isActive ? 'after:scale-[60]' : 'after:scale-0',
                    )}
                  >
                    <svg
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      className={clsx(
                        'ease-power4-in-out absolute transition-[scale,opacity] duration-700',
                        step.isCompleted ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
                      )}
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span
                      className={clsx(
                        'ease-power4-in-out absolute transition-[scale,opacity] duration-700',
                        step.isCompleted ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
                      )}
                    >
                      {index + 1}
                    </span>
                  </span>
                  <span
                    className={clsx(
                      'overflow-hidden leading-14 text-ellipsis transition-colors duration-300',
                      step.isCompleted && !step.isActive ? 'text-white' : 'text-black',
                    )}
                  >
                    {isFrench ? step.title.fr : step.title.en}
                  </span>
                </h3>
                <div className="px-6">{isFrench ? step.description.fr : step.description.en}</div>
                <div
                  className={clsx(
                    'grow overflow-hidden',
                    step.isActive && 'smoother-y-website-builder-steps',
                  )}
                >
                  <div className="no-scrollbar h-full shrink-0 overflow-scroll" data-lenis-prevent>
                    {renderActiveStep(step.type)}
                  </div>
                </div>
                <div className="mt-auto ml-auto p-6">
                  {step.isActive && (
                    <Button
                      className="shrink-0"
                      color="secondary"
                      disabled={!isCurrentStepValid()}
                      onClick={nextStep}
                    >
                      {index === steps.length - 1 ? 'Finaliser' : 'Suivant'}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {!isMobile && (
          <div className="border-blue-30 col-span-1 h-full w-full shrink-0 rounded-3xl border-[1px] bg-[#e9e9fd] lg:col-span-2">
            <ViewerBuilder
              handleDeletePage={handleDeletePage}
              handleUnselectPage={handleUnselectPage}
              selectedAnimation={selectedAnimation}
              selectedOptions={selectedOptions}
              selectedPages={selectedPages}
              totalPrice={totalPrice}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default WebsiteBuilder;
