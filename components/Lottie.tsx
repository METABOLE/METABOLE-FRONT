import useIsMounted from '@/hooks/useIsMounted';
import type { LottieComponentProps } from 'lottie-react';
import dynamic from 'next/dynamic';

const DynamicLottie = dynamic(() => import('lottie-react'), { ssr: false });

const Lottie = ({ animationData, className, ...props }: LottieComponentProps) => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <div className={className} />;
  }

  return <DynamicLottie animationData={animationData} className={className} {...props} />;
};

export default Lottie;
