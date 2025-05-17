import { Option } from '@/types';
import Checkbox from '../atoms/Checkbox';
import { useLanguage } from '@/providers/language.provider';

interface StepOptionsProps {
  options: Option[];
  onToggle: (optionId: string) => void;
}

const StepOptions = ({ options, onToggle }: StepOptionsProps) => {
  const { isFrench } = useLanguage();

  return (
    <div className="grid w-full grid-cols-2 gap-6">
      {options.map((option) => (
        <Checkbox
          key={option.id}
          checked={option.selected}
          label={isFrench ? option.title.fr : option.title.en}
          onChange={() => onToggle(option.id)}
        />
      ))}
    </div>
  );
};

export default StepOptions;
