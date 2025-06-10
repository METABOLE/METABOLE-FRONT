import { COLORS } from '@/types';
import { forwardRef, SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  color?: COLORS;
}

export const ShapeCorner = forwardRef<SVGSVGElement, IconProps>(
  ({ color = COLORS.BLACK, ...props }, ref) => (
    <svg
      ref={ref}
      {...props}
      fill="none"
      height="46"
      viewBox="0 0 46 46"
      width="46"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23 46C23.0012 34 12.0013 23 0 23V0H46V46H23Z" fill={color} />
    </svg>
  ),
);
