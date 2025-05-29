import { v4 as uuidv4 } from 'uuid';
import { ANIMATIONS, OPTIONS, PAGES, STEPS } from '@/constants/websiteBuilder.constant';
import { Animation, FormWebsiteBuilderData, Option, Page, WEBSITE_BUILDER_STEPS } from '@/types';
import { useEffect, useState, useMemo } from 'react';

export const useWebsiteBuilder = () => {
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

  const basePrice = useMemo(
    () =>
      selectedPages.reduce((acc, page) => acc + page.pricing, 0) +
      selectedOptions.reduce((acc, option) => acc + option.pricing, 0),
    [selectedPages, selectedOptions],
  );

  const totalPrice = useMemo(
    () => (selectedAnimation ? basePrice + basePrice * selectedAnimation.percent : basePrice),
    [basePrice, selectedAnimation],
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
        pricing: 700,
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

  // ANIMATIONS
  const handleAnimationChange = (newAnimation: Animation) => {
    localStorage.setItem('metabole-website-builder-animation', JSON.stringify(newAnimation));
    setSelectedAnimation(newAnimation);
  };

  // OPTIONS
  const handleOptionsChange = (optionId: string) => {
    const updatedOptions = options.map((option) =>
      option.id === optionId ? { ...option, selected: !option.selected } : option,
    );

    localStorage.setItem('metabole-website-builder-options', JSON.stringify(updatedOptions));
    setOptions(updatedOptions);
  };

  // FORM
  const handleFormChange = (updatedFormData: FormWebsiteBuilderData) => {
    setFormData(updatedFormData);
  };

  const goToStep = (stepIndex: number) => {
    setSteps((currentSteps) =>
      currentSteps.map((step, index) => ({
        ...step,
        isActive: index === stepIndex,
      })),
    );
  };

  // Fonction utilitaire pour vérifier la validité d'une étape
  const isStepValid = (stepType: WEBSITE_BUILDER_STEPS) => {
    switch (stepType) {
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

  const isCurrentStepValid = () => {
    const currentStep = steps.find((s) => s.isActive);
    if (!currentStep) return false;
    return isStepValid(currentStep.type);
  };

  // STEPS
  const nextStep = () => {
    const currentStepIndex = steps.findIndex((step) => step.isActive);

    // Vérification de la validité avant de passer à l'étape suivante
    if (!isCurrentStepValid()) {
      let errorMessage = '';
      const currentStep = steps[currentStepIndex];

      switch (currentStep.type) {
        case WEBSITE_BUILDER_STEPS.PAGES:
          errorMessage = 'Veuillez sélectionner au moins une page.';
          break;
        case WEBSITE_BUILDER_STEPS.ANIMATIONS:
          errorMessage = "Veuillez sélectionner un type d'animation.";
          break;
        case WEBSITE_BUILDER_STEPS.FINAL:
          errorMessage = 'Veuillez remplir tous les champs obligatoires.';
          break;
        default:
          errorMessage = 'Veuillez remplir les informations requises.';
      }

      alert(errorMessage);
      return;
    }

    if (currentStepIndex === steps.length - 1) {
      submitForm();
      setSteps(
        STEPS.map((step) => ({
          ...step,
          isActive: false,
          isCompleted: true,
        })),
      );

      // Reset après soumission
      setTimeout(() => {
        localStorage.removeItem('metabole-website-builder-pages');
        localStorage.removeItem('metabole-website-builder-animation');
        localStorage.removeItem('metabole-website-builder-options');
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
      }, 1000);
      return;
    }

    // Passage à l'étape suivante
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

  return {
    // États
    steps,
    pages,
    animations: Object.values(ANIMATIONS),
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
    handleUnselectPage,
    handleDeletePage,
    handleAnimationChange,
    handleOptionsChange,
    handleFormChange,
    goToStep,
    nextStep,
    submitForm,
  };
};
