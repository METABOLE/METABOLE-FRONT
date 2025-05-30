import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
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
        'group/button-checkbox w-fit origin-left cursor-pointer overflow-hidden rounded-full bg-white transition-colors duration-300',
        selected ? 'text-white' : 'hover:bg-blur-glass text-black',
      )}
      onClick={handleClick}
      onMouseMove={(e) => useMagnet(e, 0.8)}
      onMouseOut={(e) => useResetMagnet(e)}
    >
      <div
        className="flex h-11 w-full items-center gap-2.5 px-6"
        onMouseMove={(e) => useMagnet(e, 0.4)}
        onMouseOut={(e) => useResetMagnet(e)}
      >
        <div className="relative z-10 flex items-center justify-center">
          <div
            className={clsx(
              'ease-power4-in-out bg-blue absolute -z-10 h-4 w-4 rounded-full transition-transform duration-500',
              selected ? 'scale-[25]' : 'scale-0',
            )}
          />
          <IconCross
            className={clsx(
              '',
              selected
                ? 'rotate-135 stroke-white hover:rotate-225'
                : 'stroke-blue rotate-0 group-hover/button-checkbox:rotate-90',
            )}
            style={{
              transition: selected
                ? 'stroke 0.3s linear, rotate 0.3s var(--ease-power4-in-out)'
                : 'stroke 0.3s linear 0.2s, rotate 0.3s var(--ease-power4-in-out)',
            }}
            onClick={handleDelete}
          />
        </div>
        <span className="z-20 max-w-[155px] overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </span>
      </div>
    </button>
  );
};

export default ButtonCheckbox;
