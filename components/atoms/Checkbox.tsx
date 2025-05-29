import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
  isDisclaimer?: boolean;
}

const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ checked = false, onChange, label, className, isDisclaimer = false, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      setIsChecked(newChecked);
      onChange?.(newChecked);
    };

    return (
      <label
        ref={ref}
        className={clsx('group/checkbox flex cursor-pointer items-center', className)}
        htmlFor={props.name}
      >
        <div className="relative">
          <input
            checked={isChecked}
            className="sr-only"
            type="checkbox"
            onChange={handleChange}
            {...props}
          />
          <div className="border-blue flex h-4 w-4 items-center justify-center rounded-sm border-2">
            <div
              className={clsx(
                'bg-blue ease-power4-in-out h-2 w-2 rounded-[2px] transition-transform duration-300',
                isChecked ? 'scale-100' : 'scale-0 group-hover/checkbox:scale-50',
              )}
            />
          </div>
        </div>
        {label && (
          <span
            className={clsx(
              'ease-power4-in-out ml-2 cursor-pointer transition-transform duration-200 group-hover/checkbox:translate-x-2',
              isDisclaimer ? 'text-black-70 disclaimer' : 'p2',
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  },
);

export default Checkbox;
