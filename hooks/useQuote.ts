import { ANIMATIONS, OPTIONS, PAGES, STEPS } from '@/constants/quote.constant';
import { useLanguage } from '@/providers/language.provider';
import { postQuoteForm } from '@/services/quote.service';
import { Animation, Option, Page, QUOTE_STEPS } from '@/types';
import { QuoteFormData, StepFormData, StepState } from '@/types/quote.type';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useAudio } from './useAudio';
import { isEmail, isPhone } from '@/utils/validation.utils';

export const useQuote = () => {
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

  const [formData, setFormData] = useState<StepFormData>({
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
      isEmail(formData.email) &&
      (formData.phone ? isPhone(formData.phone) : true)
    );
  }, [formData]);

  useEffect(() => {
    const storedPages = localStorage.getItem('metabole-quote-builder-pages');
    if (storedPages) {
      const parsedPages: Page[] = JSON.parse(storedPages);
      setPages(parsedPages);
    }

    const storedAnimation = localStorage.getItem('metabole-quote-builder-animation');
    if (storedAnimation) {
      const parsedAnimation: Animation = JSON.parse(storedAnimation);
      setSelectedAnimation(parsedAnimation);
    }

    const storedOptions = localStorage.getItem('metabole-quote-builder-options');
    if (storedOptions) {
      const parsedOptions: Option[] = JSON.parse(storedOptions);
      setOptions(parsedOptions);
    }

    const storedForm = localStorage.getItem('metabole-quote-builder-form');
    if (storedForm) {
      const parsedForm: StepFormData = JSON.parse(storedForm);
      setFormData(parsedForm);
    }

    const storedStepsState = localStorage.getItem('metabole-quote-builder-steps');
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
        localStorage.removeItem('metabole-quote-builder-steps');
      }
    }
  }, []);

  useEffect(() => {
    setSteps((currentSteps) =>
      currentSteps.map((step) => {
        if (step.isCompleted && !isStepValid(step.type)) {
          return { ...step, isCompleted: false };
        }
        return step;
      }),
    );
  }, [isPagesValid, isAnimationValid, isOptionsValid, isFormValid]);

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
      localStorage.setItem('metabole-quote-builder-pages', JSON.stringify(updatedPages));
      setPages(updatedPages);
    } else {
      const updatedPages = pages.map((page) =>
        page.id === pageIdOrTitle ? { ...page, selected: !page.selected } : page,
      );

      localStorage.setItem('metabole-quote-builder-pages', JSON.stringify(updatedPages));
      setPages(updatedPages);
    }
  };

  const handleDeletePage = (pageId: string) => {
    const updatedPages = pages.filter((page) => page.id !== pageId);
    localStorage.setItem('metabole-quote-builder-pages', JSON.stringify(updatedPages));
    setPages(updatedPages);
  };

  const handleUnselectPage = (pageId: string) => {
    const updatedPages = pages.map((page) =>
      page.id === pageId ? { ...page, selected: false } : page,
    );
    localStorage.setItem('metabole-quote-builder-pages', JSON.stringify(updatedPages));
    setPages(updatedPages);
  };

  const handleResetPages = () => {
    localStorage.removeItem('metabole-quote-builder-pages');
    setPages(PAGES.map((page) => ({ ...page, selected: false })));
  };

  // ANIMATIONS
  const handleAnimationChange = (newAnimation: Animation) => {
    localStorage.setItem('metabole-quote-builder-animation', JSON.stringify(newAnimation));
    setSelectedAnimation(newAnimation);
  };

  const handleResetAnimations = () => {
    localStorage.removeItem('metabole-quote-builder-animation');
    setSelectedAnimation(ANIMATIONS.IMMERSIVES);
  };

  // OPTIONS
  const handleOptionsChange = (optionId: string) => {
    const updatedOptions = options.map((option) =>
      option.id === optionId ? { ...option, selected: !option.selected } : option,
    );

    localStorage.setItem('metabole-quote-builder-options', JSON.stringify(updatedOptions));
    setOptions(updatedOptions);
  };

  const handleResetOptions = () => {
    localStorage.removeItem('metabole-quote-builder-options');
    setOptions(OPTIONS.map((option) => ({ ...option, id: uuidv4(), selected: false })));
  };

  // FORM
  const handleFormChange = (updatedFormData: StepFormData) => {
    localStorage.setItem('metabole-quote-builder-form', JSON.stringify(updatedFormData));
    setFormData(updatedFormData);
  };

  const handleResetForm = () => {
    localStorage.removeItem('metabole-quote-builder-form');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  // VALIDATORS
  const isStepValid = (stepType: QUOTE_STEPS) => {
    switch (stepType) {
      case QUOTE_STEPS.PAGES:
        return isPagesValid;
      case QUOTE_STEPS.ANIMATIONS:
        return isAnimationValid;
      case QUOTE_STEPS.OPTIONS:
        return isOptionsValid;
      case QUOTE_STEPS.FINAL:
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
      localStorage.setItem('metabole-quote-builder-steps', JSON.stringify(updatedSteps));
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
      localStorage.setItem('metabole-quote-builder-steps', JSON.stringify(updatedSteps));
      return updatedSteps;
    });
  };

  const resetForm = () => {
    localStorage.removeItem('metabole-quote-builder-pages');
    localStorage.removeItem('metabole-quote-builder-animation');
    localStorage.removeItem('metabole-quote-builder-options');
    localStorage.removeItem('metabole-quote-builder-form');
    localStorage.removeItem('metabole-quote-builder-steps');

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
    mutationFn: ({ name, email, phone, message, quote, lang }: QuoteFormData) =>
      postQuoteForm({ name, email, phone, message, quote, lang }),
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
      quote: {
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
      loading: isFrench ? 'Envoi de la demande en cours...' : 'Sending request...',
      success: isFrench ? 'Demande envoyée avec succès !' : 'Request sent successfully!',
      error: isFrench ? "Erreur d'envoi de la demande" : 'Error sending request',
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
