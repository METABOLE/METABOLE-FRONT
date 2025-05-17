import { OPTIONS } from '@/constants/websiteBuilder.constant';
import { Option } from '@/types';
import { useEffect, useState } from 'react';
import Checkbox from '../atoms/Checkbox';
import { useLanguage } from '@/providers/language.provider';

const StepOptions = ({
  onOptionsChange,
}: {
  onOptionsChange?: (options: Option[], isValid: boolean) => void;
}) => {
  const { isFrench } = useLanguage();

  const [options, setOptions] = useState<Option[]>(
    OPTIONS.map((option) => ({
      ...option,
      id: crypto.randomUUID(),
      selected: false,
    })),
  );

  const validateOptions = (): boolean => {
    return true;
  };

  useEffect(() => {
    if (onOptionsChange) {
      const isValid = validateOptions();
      onOptionsChange(options, isValid);
    }
  }, []);

  const handleToggleOption = (id: string) => {
    const newOptions = options.map((option) =>
      option.id === id ? { ...option, selected: !option.selected } : option,
    );
    setOptions(newOptions);
    if (onOptionsChange) {
      const isValid = validateOptions();
      onOptionsChange(newOptions, isValid);
    }
  };

  return (
    <div className="grid w-full grid-cols-2 gap-6">
      {options.map((option) => (
        <Checkbox
          key={option.id}
          checked={option.selected}
          label={isFrench ? option.title.fr : option.title.en}
          onChange={() => handleToggleOption(option.id)}
        />
      ))}
    </div>
  );
};

export default StepOptions;
