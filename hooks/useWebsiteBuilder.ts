import { ANIMATIONS, OPTIONS, PAGES, STEPS } from '@/constants/websiteBuilder.constant';
import { Animation, FormWebsiteBuilderData, Option, Page, WEBSITE_BUILDER_STEPS } from '@/types';
import { useEffect, useState } from 'react';

export const useWebsiteBuilder = () => {
  const [steps, setSteps] = useState(
    STEPS.map((step, index) => ({
      ...step,
      isActive: index === 0,
      isCompleted: false,
    })),
  );

  const [pages, setPages] = useState<Page[]>(PAGES.map((page) => ({ ...page, selected: false })));

  const animations = Object.values(ANIMATIONS);
  const [selectedAnimation, setSelectedAnimation] = useState<Animation>(ANIMATIONS.IMMERSIVES);

  const [options, setOptions] = useState<Option[]>(
    OPTIONS.map((option) => ({ ...option, id: crypto.randomUUID(), selected: false })),
  );

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
  }, []);

  const [formData, setFormData] = useState<FormWebsiteBuilderData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isPagesValid, setIsPagesValid] = useState(false);
  const [isAnimationValid, setIsAnimationValid] = useState(true);
  const [isOptionsValid, setIsOptionsValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const selectedPages = pages.filter((page) => page.selected);
  const selectedOptions = options.filter((option) => option.selected);
  const basePrice =
    selectedPages.reduce((acc, page) => acc + page.pricing, 0) +
    selectedOptions.reduce((acc, option) => acc + option.pricing, 0);

  const totalPrice = selectedAnimation
    ? basePrice + basePrice * selectedAnimation.percent
    : basePrice;

  // PAGES
  const handlePagesChange = (pageIdOrTitle: string) => {
    if (!pages.some((page) => page.id === pageIdOrTitle)) {
      const newPage: Page = {
        id: crypto.randomUUID(),
        title: {
          en: pageIdOrTitle.trim(),
          fr: pageIdOrTitle.trim(),
        },
        pricing: 700,
        selected: true,
      };

      const updatedPages = [...pages, newPage];
      localStorage.setItem('metabole-website-builder-pages', JSON.stringify(updatedPages));
      setPages(updatedPages);
      setIsPagesValid(true);
    } else {
      const updatedPages = pages.map((page) =>
        page.id === pageIdOrTitle ? { ...page, selected: !page.selected } : page,
      );

      localStorage.setItem('metabole-website-builder-pages', JSON.stringify(updatedPages));
      setPages(updatedPages);
      const isValid = updatedPages.some((page) => page.selected);
      setIsPagesValid(isValid);
    }
  };

  const handleDeletePage = (pageId: string) => {
    const updatedPages = pages.filter((page) => page.id !== pageId);
    const isValid = updatedPages.some((page) => page.selected);

    localStorage.setItem('metabole-website-builder-pages', JSON.stringify(updatedPages));
    setPages(updatedPages);
    setIsPagesValid(isValid);
  };

  // ANIMATIONS
  const handleAnimationChange = (newAnimation: Animation) => {
    localStorage.setItem('metabole-website-builder-animation', JSON.stringify(newAnimation));
    setSelectedAnimation(newAnimation);
    setIsAnimationValid(true);
  };

  // OPTIONS
  const handleOptionsChange = (optionId: string) => {
    const updatedOptions = options.map((option) =>
      option.id === optionId ? { ...option, selected: !option.selected } : option,
    );

    localStorage.setItem('metabole-website-builder-options', JSON.stringify(updatedOptions));
    setOptions(updatedOptions);
    setIsOptionsValid(true);
  };

  // FORM
  const handleFormChange = (updatedFormData: FormWebsiteBuilderData, isValid: boolean) => {
    setFormData(updatedFormData);
    setIsFormValid(isValid);
  };

  const goToStep = (stepIndex: number) => {
    setSteps((currentSteps) =>
      currentSteps.map((step, index) => ({
        ...step,
        isActive: index === stepIndex,
      })),
    );
  };

  // STEPS
  const nextStep = () => {
    const currentStepIndex = steps.findIndex((step) => step.isActive);

    if (currentStepIndex === steps.length - 1) {
      if (selectedPages.length === 0) {
        alert('Veuillez sélectionner au moins une page.');
        return;
      }
      if (!isCurrentStepValid()) {
        alert('Veuillez remplir les informations requises.');
        return;
      }
      submitForm();
      setTimeout(() => {
        setSteps(
          STEPS.map((step, index) => ({
            ...step,
            isActive: index === 0,
            isCompleted: false,
          })),
        );
        localStorage.removeItem('metabole-website-builder-pages');
        localStorage.removeItem('metabole-website-builder-animation');
        localStorage.removeItem('metabole-website-builder-options');
        setPages(PAGES.map((page) => ({ ...page, selected: false })));
        setSelectedAnimation(ANIMATIONS.IMMERSIVES);
        setOptions(
          OPTIONS.map((option) => ({ ...option, id: crypto.randomUUID(), selected: false })),
        );
        setSteps((currentSteps) =>
          currentSteps.map((step) => ({ ...step, isActive: false, isCompleted: true })),
        );
      }, 1000);
      return;
    }

    setSteps((currentSteps) =>
      currentSteps.map((step, index) => {
        if (index === currentStepIndex) {
          return { ...step, isActive: false, isCompleted: true };
        } else if (index === currentStepIndex + 1) {
          return { ...step, isActive: true };
        } else {
          return step;
        }
      }),
    );
  };

  const submitForm = () => {
    console.log('Envoi du devis :', {
      ...formData,
      devis: {
        pages: selectedPages,
        animation: selectedAnimation,
        options: selectedOptions,
        totalPrice,
      },
    });

    alert('Votre devis a été envoyé ! Nous vous contacterons rapidement.');
  };

  const isCurrentStepValid = () => {
    const currentStep = steps.find((s) => s.isActive);
    if (!currentStep) return false;

    switch (currentStep.type) {
      case WEBSITE_BUILDER_STEPS.PAGES:
        return isPagesValid;
      case WEBSITE_BUILDER_STEPS.ANIMATIONS:
        return isAnimationValid;
      case WEBSITE_BUILDER_STEPS.OPTIONS:
        return isOptionsValid;
      case WEBSITE_BUILDER_STEPS.FINAL:
        return isFormValid;
      default:
        return false;
    }
  };

  return {
    // États
    steps,
    pages,
    animations,
    selectedAnimation,
    options,
    formData,
    selectedPages,
    selectedOptions,
    totalPrice,

    // Validations
    isPagesValid,
    isAnimationValid,
    isOptionsValid,
    isFormValid,
    isCurrentStepValid,

    // Actions
    handlePagesChange,
    handleDeletePage,
    handleAnimationChange,
    handleOptionsChange,
    handleFormChange,
    goToStep,
    nextStep,
    submitForm,
  };
};
