import { ANIMATIONS, OPTIONS, PAGES, STEPS } from '@/constants/websiteBuilder.constant';
import { useLanguage } from '@/providers/language.provider';
import { postQuoteForm } from '@/services/quote.service';
import { Animation, FormWebsiteBuilderData, Option, Page, WEBSITE_BUILDER_STEPS } from '@/types';
import { QuoteFormData, StepState } from '@/types/quote.type';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useAudio } from './useAudio';

export const useWebsiteBuilder = () => {
  const { isFrench } = useLanguage();
  const { play: playError } = useAudio('/sounds/error.mp3');
  const { play: playSuccess } = useAudio('/sounds/sent.mp3');

  const [steps, setSteps] = useState(
    STEPS.map((step, index) => ({
      ...step,
      isActive: index === 0,
      isCompleted: false,
    })),
  );

  const [pages, setPages] = useState<Page[]>(PAGES.map((page) => ({ ...page, selected: false })));
  const [selectedAnimation, setSelectedAnimation] = useState<Animation>(ANIMATIONS.IMMERSIVES);
  const [options, setOptions] = useState<Option[]>(
    OPTIONS.map((option) => ({ ...option, id: uuidv4(), selected: false })),
  );

  const [formData, setFormData] = useState<FormWebsiteBuilderData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const selectedPages = useMemo(() => pages.filter((page) => page.selected), [pages]);
  const selectedOptions = useMemo(() => options.filter((option) => option.selected), [options]);

  const isPagesValid = useMemo(() => selectedPages.length > 0, [selectedPages]);
  const isAnimationValid = useMemo(() => selectedAnimation !== null, [selectedAnimation]);
  const isOptionsValid = useMemo(() => true, [options]);
  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      /^\S+@\S+\.\S+$/.test(formData.email) &&
      formData.phone.trim() !== ''
    );
  }, [formData]);

  useEffect(() => {
    const storedPages = localStorage.getItem('metabole-website-builder-pages');
    if (storedPages) {
      const parsedPages: Page[] = JSON.parse(storedPages);
      setPages(parsedPages);
    }

    const storedAnimation = localStorage.getItem('metabole-website-builder-animation');
    if (storedAnimation) {
      const parsedAnimation: Animation = JSON.parse(storedAnimation);
      setSelectedAnimation(parsedAnimation);
    }

    const storedOptions = localStorage.getItem('metabole-website-builder-options');
    if (storedOptions) {
      const parsedOptions: Option[] = JSON.parse(storedOptions);
      setOptions(parsedOptions);
    }

    const storedForm = localStorage.getItem('metabole-website-builder-form');
    if (storedForm) {
      const parsedForm: FormWebsiteBuilderData = JSON.parse(storedForm);
      setFormData(parsedForm);
    }

    const storedStepsState = localStorage.getItem('metabole-website-builder-steps');
    if (storedStepsState) {
      try {
        const parsedStepsState: StepState[] = JSON.parse(storedStepsState);
        setSteps((currentSteps) =>
          currentSteps.map((step) => {
            const storedStep = parsedStepsState.find((s) => s.id === step.id);
            if (storedStep) {
              return {
                ...step,
                isActive: storedStep.isActive,
                isCompleted: storedStep.isCompleted,
              };
            }
            return step;
          }),
        );
      } catch (error) {
        console.error('Erreur lors de la reconstruction des steps:', error);
        localStorage.removeItem('metabole-website-builder-steps');
      }
    }
  }, []);

  // useEffect(() => {
  //   setSteps((currentSteps) =>
  //     currentSteps.map((step) => {
  //       if (step.isCompleted && !isStepValid(step.type)) {
  //         return { ...step, isCompleted: false };
  //       }
  //       return step;
  //     }),
  //   );
  // }, [isPagesValid, isAnimationValid, isOptionsValid, isFormValid]);

  // PAGES
  const handlePagesChange = (pageIdOrTitle: string) => {
    if (!pages.some((page) => page.id === pageIdOrTitle)) {
      const newPage: Page = {
        id: uuidv4(),
        title: {
          en: pageIdOrTitle.trim(),
          fr: pageIdOrTitle.trim(),
        },
        selected: true,
      };

      const updatedPages = [...pages, newPage];
      localStorage.setItem('metabole-website-builder-pages', JSON.stringify(updatedPages));
      setPages(updatedPages);
    } else {
      const updatedPages = pages.map((page) =>
        page.id === pageIdOrTitle ? { ...page, selected: !page.selected } : page,
      );

      localStorage.setItem('metabole-website-builder-pages', JSON.stringify(updatedPages));
      setPages(updatedPages);
    }
  };

  const handleDeletePage = (pageId: string) => {
    const updatedPages = pages.filter((page) => page.id !== pageId);
    localStorage.setItem('metabole-website-builder-pages', JSON.stringify(updatedPages));
    setPages(updatedPages);
  };

  const handleUnselectPage = (pageId: string) => {
    const updatedPages = pages.map((page) =>
      page.id === pageId ? { ...page, selected: false } : page,
    );
    localStorage.setItem('metabole-website-builder-pages', JSON.stringify(updatedPages));
    setPages(updatedPages);
  };

  const handleResetPages = () => {
    localStorage.removeItem('metabole-website-builder-pages');
    setPages(PAGES.map((page) => ({ ...page, selected: false })));
  };

  // ANIMATIONS
  const handleAnimationChange = (newAnimation: Animation) => {
    localStorage.setItem('metabole-website-builder-animation', JSON.stringify(newAnimation));
    setSelectedAnimation(newAnimation);
  };

  const handleResetAnimations = () => {
    localStorage.removeItem('metabole-website-builder-animation');
    setSelectedAnimation(ANIMATIONS.IMMERSIVES);
  };

  // OPTIONS
  const handleOptionsChange = (optionId: string) => {
    const updatedOptions = options.map((option) =>
      option.id === optionId ? { ...option, selected: !option.selected } : option,
    );

    localStorage.setItem('metabole-website-builder-options', JSON.stringify(updatedOptions));
    setOptions(updatedOptions);
  };

  const handleResetOptions = () => {
    localStorage.removeItem('metabole-website-builder-options');
    setOptions(OPTIONS.map((option) => ({ ...option, id: uuidv4(), selected: false })));
  };

  // FORM
  const handleFormChange = (updatedFormData: FormWebsiteBuilderData) => {
    localStorage.setItem('metabole-website-builder-form', JSON.stringify(updatedFormData));
    setFormData(updatedFormData);
  };

  const handleResetForm = () => {
    localStorage.removeItem('metabole-website-builder-form');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  // VALIDATORS
  const isStepValid = (stepType: WEBSITE_BUILDER_STEPS) => {
    switch (stepType) {
      case WEBSITE_BUILDER_STEPS.PAGES:
        return isPagesValid;
      case WEBSITE_BUILDER_STEPS.ANIMATIONS:
        return isAnimationValid;
      case WEBSITE_BUILDER_STEPS.OPTIONS:
        return isOptionsValid;
      case WEBSITE_BUILDER_STEPS.FINAL:
        return isFormValid && isPagesValid && isAnimationValid && isOptionsValid;
      default:
        return false;
    }
  };

  const isCurrentStepValid = () => {
    const currentStep = steps.find((s) => s.isActive);
    if (!currentStep) return false;
    return isStepValid(currentStep.type);
  };

  // STEPS
  const goToStep = (stepIndex: number) => {
    setSteps((currentSteps) => {
      const updatedSteps = currentSteps.map((step, index) => ({
        ...step,
        isActive: index === stepIndex,
      }));
      localStorage.setItem('metabole-website-builder-steps', JSON.stringify(updatedSteps));
      return updatedSteps;
    });
  };

  const nextStep = () => {
    const currentStepIndex = steps.findIndex((step) => step.isActive);

    if (
      currentStepIndex === steps.length - 1 &&
      isPagesValid &&
      isAnimationValid &&
      isOptionsValid &&
      isFormValid
    ) {
      submitForm();
      return;
    }

    if (!isStepValid(steps[currentStepIndex].type)) return;

    setSteps((currentSteps) => {
      const updatedSteps = currentSteps.map((step, index) => {
        if (index === currentStepIndex) {
          return { ...step, isActive: false, isCompleted: true };
        } else if (index === currentStepIndex + 1) {
          return { ...step, isActive: true };
        } else {
          return step;
        }
      });
      localStorage.setItem('metabole-website-builder-steps', JSON.stringify(updatedSteps));
      return updatedSteps;
    });
  };

  const resetForm = () => {
    localStorage.removeItem('metabole-website-builder-pages');
    localStorage.removeItem('metabole-website-builder-animation');
    localStorage.removeItem('metabole-website-builder-options');
    localStorage.removeItem('metabole-website-builder-form');
    localStorage.removeItem('metabole-website-builder-steps');

    setPages(PAGES.map((page) => ({ ...page, selected: false })));
    setSelectedAnimation(ANIMATIONS.IMMERSIVES);
    setOptions(OPTIONS.map((option) => ({ ...option, id: uuidv4(), selected: false })));
    setFormData({ name: '', email: '', phone: '', message: '' });
    setSteps(
      STEPS.map((step, index) => ({
        ...step,
        isActive: index === 0,
        isCompleted: false,
      })),
    );
  };

  const sendQuote = useMutation({
    mutationFn: ({ name, email, phone, message, devis, lang }: QuoteFormData) =>
      postQuoteForm({ name, email, phone, message, devis, lang }),
    onSuccess: () => {
      playSuccess();
      setTimeout(() => {
        resetForm();
      }, 100);
    },
    onMutate: () => {
      setSteps(
        STEPS.map((step) => ({
          ...step,
          isActive: false,
          isCompleted: true,
        })),
      );
    },
    onError: (error) => {
      playError();
      console.error("Erreur d'envoi du devis", error);
    },
  });

  const submitForm = () => {
    const quoteData: QuoteFormData = {
      ...formData,
      lang: isFrench ? 'fr' : 'en',
      devis: {
        pages: selectedPages.map((page) => page.title.fr),
        animation: selectedAnimation.type,
        options: selectedOptions.map((option) => option.title.fr),
      },
    };

    const mutationPromise = new Promise((resolve, reject) => {
      sendQuote.mutate(quoteData, {
        onSuccess: (data) => {
          resolve(data);
        },
        onError: (error) => {
          reject(error);
        },
      });
    });

    toast.promise(mutationPromise, {
      loading: isFrench ? 'Envoi du devis en cours...' : 'Sending quote in progress...',
      success: isFrench ? 'Devis envoyé avec succès !' : 'Quote sent successfully!',
      error: isFrench ? "Erreur d'envoi du devis" : 'Error sending quote',
    });
  };

  return {
    // STATES
    steps,
    pages,
    animations: Object.values(ANIMATIONS),
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
  };
};
