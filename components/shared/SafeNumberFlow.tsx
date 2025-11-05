import NumberFlow, { NumberFlowProps } from '@number-flow/react';
import { useEffect, useState } from 'react';

const SafeNumberFlow = ({ value, className, ...props }: NumberFlowProps) => {
  const [canUseNumberFlow, setCanUseNumberFlow] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const isSupported = typeof window !== 'undefined' && 'attachInternals' in HTMLElement.prototype;
    setCanUseNumberFlow(isSupported);
  }, []);

  // Always render with consistent structure to avoid layout shift
  if (!isClient || !canUseNumberFlow) {
    return (
      <span className={className} style={{ contain: 'layout' }}>
        {value}
      </span>
    );
  }

  return <NumberFlow className={className} value={value} {...props} />;
};

export default SafeNumberFlow;
