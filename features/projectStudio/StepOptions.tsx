import { Option } from '@/types';
import { useLanguage } from '@/providers/language.provider';
import { motion } from 'framer-motion';
import Checkbox from '@/components/ui/Checkbox';

interface StepOptionsProps {
  options: Option[];
  onToggle: (optionId: string) => void;
}

const StepOptions = ({ options, onToggle }: StepOptionsProps) => {
  const { isFrench } = useLanguage();

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      {options.map((option, index) => (
        <motion.div
          key={option.title.fr}
          animate={{ scale: 1, transformOrigin: 'left' }}
          exit={{ scale: 0, transformOrigin: 'left' }}
          initial={{ scale: 0, transformOrigin: 'left' }}
          transition={{
            duration: 0.3,
            ease: [0.76, 0, 0.24, 1],
            delay: index * 0.02,
          }}
          layout
        >
          <Checkbox
            key={option.id}
            checked={option.selected}
            label={isFrench ? option.title.fr : option.title.en}
            onChange={() => onToggle(option.id)}
          />
          <p className="text-black-70 label !font-safiro-medium-italic pt-1.5 italic">
            {option.description[isFrench ? 'fr' : 'en']}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default StepOptions;
