import { COLORS } from '@/types';
import clsx from 'clsx';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { IconCross } from '../Icons';

export interface ButtonCheckboxAnimationRef {
  reverse: () => void;
  play: () => void;
}

type ButtonCheckboxProps = {
  id: string;
  title: string;
  selected: boolean;
  isVisible?: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
};

const ButtonCheckbox = forwardRef<ButtonCheckboxAnimationRef, ButtonCheckboxProps>(
  ({ id, title, selected, onToggle, onDelete }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        play: () => {
          console.log('play');
        },

        reverse: () => {
          console.log('reverse');
        },
      }),
      [],
    );

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
          'flex h-11 w-fit origin-left cursor-pointer items-center gap-2.5 overflow-hidden rounded-full bg-white px-6',
          selected ? 'text-white' : 'text-black',
        )}
        onClick={handleClick}
      >
        <div className="relative z-10 flex items-center justify-center">
          <div
            className={clsx(
              'bg-blue absolute -z-10 h-4 w-4 rounded-full transition-transform duration-300',
              selected ? 'scale-[25]' : 'scale-0',
            )}
          />
          <IconCross
            className={clsx('transition-transform', selected ? 'rotate-45' : 'rotate-0')}
            color={selected ? COLORS.WHITE : COLORS.BLUE}
            onClick={handleDelete}
          />
        </div>
        <span className="z-20 max-w-[155px] overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </span>
      </button>
    );
  },
);

export default ButtonCheckbox;
