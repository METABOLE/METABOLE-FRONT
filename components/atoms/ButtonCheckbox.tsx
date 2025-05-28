import { COLORS } from '@/types';
import clsx from 'clsx';
import { useRef } from 'react';
import { IconCross } from '../Icons';

type ButtonCheckboxProps = {
  id: string;
  title: string;
  selected: boolean;
  isVisible?: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
};

const ButtonCheckbox = ({ id, title, selected, onToggle, onDelete }: ButtonCheckboxProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    onToggle(id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id, e);
  };

  return (
    <button
      ref={buttonRef}
      className={clsx(
        'group/button-checkbox flex h-11 w-fit origin-left cursor-pointer items-center gap-2.5 overflow-hidden rounded-full bg-white px-6',
        selected ? 'text-white' : 'text-black',
      )}
      onClick={handleClick}
    >
      <div className="relative z-10 flex items-center justify-center">
        <div
          className={clsx(
            'bg-blue ease-power4-in-out absolute -z-10 h-4 w-4 rounded-full transition-transform duration-500',
            selected ? 'scale-[25]' : 'scale-0',
          )}
        />
        <IconCross
          color={selected ? COLORS.WHITE : COLORS.BLUE}
          className={clsx(
            'ease-power4-in-out transition-transform duration-300',
            selected
              ? 'rotate-45 group-hover/button-checkbox:rotate-135'
              : 'rotate-0 group-hover/button-checkbox:rotate-180',
          )}
          onClick={handleDelete}
        />
      </div>
      <span className="z-20 max-w-[155px] overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </span>
    </button>
  );
};

export default ButtonCheckbox;
