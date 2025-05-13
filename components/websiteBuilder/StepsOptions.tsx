import { OPTIONS } from '@/constants/websiteBuilder.constant';
import { Option } from '@/types';
import { useState } from 'react';
import Checkbox from '../atoms/Checkbox';

export const StepOptions = ({
  onOptionsChange,
}: {
  onOptionsChange?: (options: Option[]) => void;
}) => {
  const [options, setOptions] = useState<Option[]>(
    OPTIONS.map((option) => ({
      ...option,
      id: crypto.randomUUID(),
      selected: false,
    })),
  );

  const handleToggleOption = (id: string) => {
    const newOptions = options.map((option) =>
      option.id === id ? { ...option, selected: !option.selected } : option,
    );
    setOptions(newOptions);
    if (onOptionsChange) {
      onOptionsChange(newOptions);
    }
  };

  return (
    <div className="grid w-full grid-cols-2 gap-6">
      {options.map((option) => (
        <Checkbox
          key={option.id}
          checked={option.selected}
          label={option.title.en}
          onChange={() => handleToggleOption(option.id)}
        />
      ))}
    </div>
  );
};
