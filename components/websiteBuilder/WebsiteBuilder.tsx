import { useWebsiteBuilder } from '@/hooks/useWebsiteBuilder';
import { useLanguage } from '@/providers/language.provider';
import { WEBSITE_BUILDER_STEPS } from '@/types';
import clsx from 'clsx';
import Button from '../atoms/Button';
import StepPages from './StepPages';
import StepAnimations from './StepsAnimations';
import StepFinalisation from './StepsFinalisation';
import StepOptions from './StepsOptions';
import ViewerBuilder from './ViewerBuilder';

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
    handleDeletePage,
    handleAnimationChange,
    handleOptionsChange,
    handleFormChange,
    goToStep,
    nextStep,
  } = useWebsiteBuilder();

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
      <div className="grid h-[80vh] min-h-[800px] w-full grid-cols-2 gap-5 lg:grid-cols-3">
        <div className="col-span-1 flex h-full w-full flex-col gap-5">
          {steps.map((step, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  'ease-power4-in-out flex h-[78px] flex-col overflow-hidden rounded-3xl border-[1px] bg-[#e9e9fd] backdrop-blur-xl transition-all duration-500',
                  step.isCompleted && !step.isActive ? 'border-blue' : 'border-blue-30',
                  step.isActive ? 'grow' : 'shrink',
                )}
              >
                <h3
                  className={clsx(
                    'ease-power4-in-out flex items-center gap-2.5 whitespace-nowrap transition-[padding] duration-500',
                    step.isActive ? 'p-6' : 'p-2.5',
                  )}
                  onClick={() => goToStep(index)}
                >
                  <span className="p1 bg-blue flex h-14 w-14 shrink-0 items-center justify-center rounded-[19px] text-white">
                    {step.isCompleted ? (
                      <svg
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      index + 1
                    )}
                    <div
                      className={clsx(
                        'bg-blue absolute -z-10 h-4 w-4 rounded-full transition-transform duration-300',
                        step.isCompleted && !step.isActive ? 'scale-[60]' : 'scale-0',
                      )}
                    />
                  </span>
                  <span
                    className={clsx(
                      'overflow-hidden leading-14 text-ellipsis',
                      step.isCompleted && !step.isActive ? 'text-white' : 'text-black',
                    )}
                  >
                    {isFrench ? step.title.fr : step.title.en}
                  </span>
                </h3>
                <div className="px-6">{isFrench ? step.description.fr : step.description.en}</div>
                <div
                  className={clsx(
                    'shrink grow-0 overflow-hidden px-6',
                    step.isActive && 'smoother-y-blue-menu-background',
                  )}
                >
                  <div
                    className="no-scrollbar h-full shrink-0 overflow-scroll py-6"
                    data-lenis-prevent
                  >
                    {step.isActive && renderActiveStep(step.type)}
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
        <div className="border-blue-30 col-span-1 h-full w-full shrink-0 rounded-3xl border-[1px] bg-[#e9e9fd] backdrop-blur-xl lg:col-span-2">
          <ViewerBuilder
            handleDeletePage={handleDeletePage}
            selectedAnimation={selectedAnimation}
            selectedOptions={selectedOptions}
            selectedPages={selectedPages}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </>
  );
};

export default WebsiteBuilder;
