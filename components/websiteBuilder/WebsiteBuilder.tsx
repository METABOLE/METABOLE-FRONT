import { useMatchMedia } from '@/hooks/useCheckScreenSize';
import { useWebsiteBuilder } from '@/hooks/useWebsiteBuilder';
import { useLanguage } from '@/providers/language.provider';
import { BREAKPOINTS, WEBSITE_BUILDER_STEPS } from '@/types';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useRef, useState } from 'react';
import { Toaster } from 'sonner';
import Button from '../atoms/Button';
import StepAnimations from './StepAnimations';
import StepFinalisation from './StepFinalisation';
import StepOptions from './StepOptions';
import StepPages from './StepPages';
import ViewerBuilder from './ViewerBuilder';

const WebsiteBuilder = () => {
  const { isFrench } = useLanguage();
  const {
    // STATES
    steps,
    pages,
    animations,
    selectedAnimation,
    formData,
    options,
    selectedPages,
    selectedOptions,

    // VALIDATORS
    isCurrentStepValid,
    isStepValid,

    // FUNCTIONS
    handlePagesChange,
    handleUnselectPage,
    handleDeletePage,
    handleResetPages,
    handleAnimationChange,
    handleResetAnimations,
    handleOptionsChange,
    handleResetOptions,
    handleFormChange,
    handleResetForm,
    setSteps,
    goToStep,
    nextStep,
  } = useWebsiteBuilder();
  const isMobile = useMatchMedia(BREAKPOINTS.MD);

  const [shouldRenderContent, setShouldRenderContent] = useState(true);
  const [activeStepType, setActiveStepType] = useState<WEBSITE_BUILDER_STEPS | null>(
    WEBSITE_BUILDER_STEPS.PAGES,
  );
  const previousActiveStepId = useRef<string | null>(null);

  useEffect(() => {
    const activeStep = steps.find((step) => step.isActive);
    if (activeStep && previousActiveStepId.current === null) {
      setActiveStepType(activeStep.type);
      setShouldRenderContent(true);
      previousActiveStepId.current = activeStep.id;
    }
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const activeStep = steps.find((step) => step.isActive);
    const currentActiveStepId = activeStep?.id || null;

    if (currentActiveStepId !== previousActiveStepId.current) {
      if (activeStep) {
        setShouldRenderContent(false);
        setActiveStepType(activeStep.type);

        const timeout = setTimeout(() => {
          setShouldRenderContent(true);
        }, 300);

        previousActiveStepId.current = currentActiveStepId;
        return () => clearTimeout(timeout);
      } else {
        setShouldRenderContent(false);
        setActiveStepType(null);
        previousActiveStepId.current = null;
      }
    }
  }, [steps.map((step) => `${step.id}-${step.isActive}`).join(',')]);

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
        return <StepFinalisation formData={formData} onFormChange={handleFormChange} />;
    }
  };

  useGSAP(() => {
    if (isMobile) return;

    const activeStep = steps.find((step) => step.isActive);
    const descriptionElement = document.getElementById(`step-description-${activeStep?.id}`);
    const split = SplitText.create(descriptionElement, { type: 'words, lines', mask: 'words' });

    gsap
      .timeline({
        delay: 0.4,
      })
      .from(split.words, {
        duration: 0.6,
        yPercent: 130,
        stagger: 0.01,
      });
  }, [steps.map((step) => `${step.id}-${step.isActive}`).join(',')]);

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            toast:
              '!bg-[#e9e9fd] !border-blue-30 !backdrop-blur-2xl !rounded-3xl !border-[1px] !shadow-lg',
            title: 'font-safiro-medium',
            description: '!text-black/70',
            actionButton:
              '!bg-blue !text-white !rounded-[19px] !px-4 !py-2 hover:!bg-blue/90 !transition-colors',
            cancelButton:
              '!bg-blue-30 !text-black !rounded-[19px] !px-4 !py-2 hover:!bg-blue-30/80 !transition-colors',
            closeButton:
              '!bg-blue-30 !border-blue-30 !text-black hover:!bg-blue hover:!text-white !transition-colors !rounded-[19px]',
          },
        }}
      />

      <div className="mx-auto grid w-full max-w-[1600px] gap-5 md:h-[80vh] md:min-h-[800px] md:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-1 flex h-full w-full flex-col gap-5">
          {steps.map((step, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  'ease-power4-in-out flex flex-col overflow-hidden rounded-3xl border-[1px] bg-[#e9e9fd] backdrop-blur-2xl transition-all duration-700 md:h-[78px]',
                  step.isCompleted && !step.isActive
                    ? 'md:border-blue border-blue-30'
                    : 'border-blue-30',
                  !isMobile && step.isActive ? 'grow' : 'md:shrink',
                  isMobile && 'grow!',
                )}
              >
                <h3
                  className={clsx(
                    'ease-power4-in-out flex items-center gap-2.5 whitespace-nowrap transition-[padding] duration-700',
                    step.isActive ? 'p-6' : 'p-6 md:p-2.5',
                  )}
                  onClick={() => {
                    const currentActiveIndex = steps.findIndex((s) => s.isActive);
                    if (isCurrentStepValid()) {
                      setSteps((currentSteps) =>
                        currentSteps.map((s, i) => {
                          if (i === currentActiveIndex) {
                            return { ...s, isActive: false, isCompleted: true };
                          } else if (i === index) {
                            return { ...s, isActive: true };
                          }
                          return s;
                        }),
                      );
                    } else {
                      goToStep(index);
                    }
                  }}
                >
                  <span
                    className={clsx(
                      'p1 bg-blue z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-[19px] text-white',
                      'after:bg-blue after:absolute after:-z-10 after:h-4 after:w-4 after:rounded-full after:transition-transform after:duration-700 after:content-[""]',
                      step.isCompleted && !step.isActive ? 'md:after:scale-[65]' : 'after:scale-0',
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
                      'z-20 overflow-hidden leading-14 text-ellipsis transition-colors duration-300',
                      step.isCompleted && !step.isActive
                        ? 'text-black md:text-white'
                        : 'text-black',
                    )}
                  >
                    {isFrench ? step.title.fr : step.title.en}
                  </span>
                </h3>
                <div className="px-6" id={'step-description-' + step.id}>
                  {isFrench ? step.description.fr : step.description.en}
                </div>
                <div className="smoother-y-website-builder-steps z-0 md:grow md:overflow-hidden">
                  <div className="no-scrollbar h-fit overflow-scroll md:h-full md:shrink-0">
                    <AnimatePresence>
                      {isMobile
                        ? renderActiveStep(step.type)
                        : step.isActive &&
                          shouldRenderContent &&
                          activeStepType &&
                          renderActiveStep(activeStepType)}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="mt-auto ml-auto space-x-2 p-6">
                  <Button
                    className="shrink-0"
                    color="primary"
                    onClick={() => {
                      if (step.type === WEBSITE_BUILDER_STEPS.PAGES) {
                        handleResetPages();
                      } else if (step.type === WEBSITE_BUILDER_STEPS.ANIMATIONS) {
                        handleResetAnimations();
                      } else if (step.type === WEBSITE_BUILDER_STEPS.OPTIONS) {
                        handleResetOptions();
                      } else if (step.type === WEBSITE_BUILDER_STEPS.FINAL) {
                        handleResetForm();
                      }
                    }}
                  >
                    {step.button.reset[isFrench ? 'fr' : 'en']}
                  </Button>
                  <Button
                    className="shrink-0"
                    color="secondary"
                    disabled={!isStepValid(step.type)}
                    onClick={nextStep}
                  >
                    {step.button.next[isFrench ? 'fr' : 'en']}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        {!isMobile && (
          <div className="border-blue-30 col-span-1 h-full w-full shrink-0 rounded-3xl border-[1px] bg-[#e9e9fd] xl:col-span-2">
            <ViewerBuilder
              handleDeletePage={handleDeletePage}
              handleSelectPage={handlePagesChange}
              handleUnselectPage={handleUnselectPage}
              selectedAnimation={selectedAnimation}
              selectedOptions={selectedOptions}
              selectedPages={selectedPages}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default WebsiteBuilder;
