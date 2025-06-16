import { COLORS } from '@/types';
import clsx from 'clsx';
import type { HTMLProps } from 'react';
import { forwardRef } from 'react';

interface FloatingHaloProps extends HTMLProps<HTMLDivElement> {
  className?: string;
  from?: string;
  to?: string;
  width?: string;
}
const FloatingHalo = forwardRef<HTMLDivElement, FloatingHaloProps>(
  ({ className, from = COLORS.BLUE, to = COLORS.WHITE, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={clsx('absolute', className)}>
        <div
          className="h-full w-full -translate-1/2"
          style={{ background: `radial-gradient(circle, ${from} 0%, ${to} 70%)` }}
        />
      </div>
    );
  },
);

export default FloatingHalo;
