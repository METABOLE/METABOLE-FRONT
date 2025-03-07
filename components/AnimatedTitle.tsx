import clsx from 'clsx';
import { forwardRef } from 'react';

interface AnimatedTitleProps {
  text: string;
  isBlue: boolean;
}

const AnimatedWord = ({ text, isBlue }: AnimatedTitleProps) => (
  <span className={clsx(isBlue ? 'overflow-hidden' : '')}>
    <span className={clsx(isBlue ? 'anim-y text-blue' : 'anim-x', 'inline-block pb-2')}>
      {text}
    </span>
  </span>
);

export const AnimatedTitle = forwardRef<HTMLHeadingElement, { content: AnimatedTitleProps[] }>(
  ({ content }, ref) => {
    return (
      <h1 ref={ref} className="flex flex-wrap justify-start md:justify-center">
        {content.map((word, index) => (
          <AnimatedWord key={index} isBlue={word.isBlue} text={word.text} />
        ))}
      </h1>
    );
  },
);
