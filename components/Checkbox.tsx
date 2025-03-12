import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked = false, onChange, label, className, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      setIsChecked(newChecked);
      onChange?.(newChecked);
    };

    return (
      <label className={clsx('flex cursor-pointer items-center', className)}>
        <div className="relative">
          <input
            ref={ref}
            checked={isChecked}
            className="sr-only"
            type="checkbox"
            onChange={handleChange}
            {...props}
          />
          <div className="flex h-4 w-4 items-center justify-center rounded-sm border-2 border-blue-600">
            <div
              className={clsx(
                'h-2 w-2 rounded-[2px] bg-blue-600 transition-transform ease-out',
                isChecked ? 'scale-100' : 'scale-0',
              )}
            />
          </div>
        </div>
        {label && <span className="ml-2">{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
