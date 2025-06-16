import { useMagnet, useResetMagnet } from '@/hooks/useMagnet';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { IconCross } from './Icons';

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
  const [isCrossHovered, setIsCrossHovered] = useState(false);

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
        'group/button-checkbox w-fit origin-left cursor-pointer overflow-hidden rounded-full transition-colors duration-300',
        {
          'bg-white text-white': selected,
          'bg-red/30 text-white': !selected && isCrossHovered,
          'hover:bg-blur-glass bg-white text-black': !selected && !isCrossHovered,
        },
      )}
      onClick={handleClick}
      onMouseMove={(e) => useMagnet(e, 0.4)}
      onMouseOut={(e) => useResetMagnet(e)}
    >
      <div
        className="flex h-11 w-full items-center gap-2.5 px-6"
        onMouseMove={(e) => useMagnet(e, 0.2)}
        onMouseOut={(e) => useResetMagnet(e)}
      >
        <div className="relative z-10 flex items-center justify-center">
          <div
            className={clsx(
              'absolute -z-10 h-4 w-4 rounded-full',
              selected ? 'scale-[25]' : 'scale-0',
              isCrossHovered ? 'bg-red/30' : 'bg-blue',
            )}
            style={{
              transition: selected
                ? 'background-color 0.1s linear, scale 0.5s var(--ease-power4-in-out)'
                : 'background-color 0.1s linear 0.2s, scale 0.5s var(--ease-power4-in-out)',
            }}
          />
          <div
            className="cursor-pointer"
            onClick={handleDelete}
            onMouseEnter={() => setIsCrossHovered(true)}
            onMouseLeave={() => {
              setTimeout(() => {
                setIsCrossHovered(false);
              }, 100);
            }}
          >
            <IconCross
              className={clsx(
                isCrossHovered && '!stroke-red',
                selected
                  ? 'rotate-135 stroke-white hover:rotate-225'
                  : 'stroke-blue hover:stroke-red rotate-0 group-hover/button-checkbox:rotate-90 hover:rotate-45',
              )}
              style={{
                transition: selected
                  ? 'stroke 0.3s linear, rotate 0.3s var(--ease-power4-in-out)'
                  : 'stroke 0.3s linear 0.2s, rotate 0.3s var(--ease-power4-in-out)',
              }}
            />
          </div>
        </div>
        <span className="z-20 max-w-[155px] overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </span>
      </div>
    </button>
  );
};

export default ButtonCheckbox;
