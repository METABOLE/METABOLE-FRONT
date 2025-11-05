import React from 'react';

type Orientation = 'top' | 'bottom' | 'left' | 'right';

interface GradientBlurProps {
  intensity?: number;
  orientation?: Orientation;
  blurHeight?: string;
  gradientColor?: string;
  className?: string;
}

const GradientBlur = ({
  intensity = 1,
  orientation = 'bottom',
  gradientColor,
  blurHeight = '80px',
  className = '',
}: GradientBlurProps) => {
  const blurLayers = [
    {
      blur: 1 * intensity,
      mask: 'rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 40%',
    },
    {
      blur: 2 * intensity,
      mask: 'rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 50%',
    },
    {
      blur: 4 * intensity,
      mask: 'rgba(0, 0, 0, 0) 15%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 60%',
    },
    {
      blur: 8 * intensity,
      mask: 'rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 70%',
    },
    {
      blur: 16 * intensity,
      mask: 'rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 90%',
    },
    {
      blur: 32 * intensity,
      mask: 'rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%',
    },
    {
      blur: 64 * intensity,
      mask: 'rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%',
    },
  ];

  const getGradientDirection = () => {
    switch (orientation) {
      case 'top':
        return 'to top';
      case 'bottom':
        return 'to bottom';
      case 'left':
        return 'to left';
      case 'right':
        return 'to right';
      default:
        return 'to bottom';
    }
  };

  const getBlurContainerPosition = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 5,
    };

    switch (orientation) {
      case 'top':
        return { ...base, top: 0, left: 0, right: 0, height: blurHeight };
      case 'bottom':
        return { ...base, bottom: 0, left: 0, right: 0, height: blurHeight };
      case 'left':
        return { ...base, top: 0, bottom: 0, left: 0, width: blurHeight };
      case 'right':
        return { ...base, top: 0, bottom: 0, right: 0, width: blurHeight };
      default:
        return { ...base, bottom: 0, left: 0, right: 0, height: blurHeight };
    }
  };

  const blurFilterStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  return (
    <div className={className} style={getBlurContainerPosition()}>
      {blurLayers.map((layer, index) => (
        <div
          key={index}
          style={{
            ...blurFilterStyle,
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            mask: `linear-gradient(${getGradientDirection()}, ${layer.mask})`,
            WebkitMask: `linear-gradient(${getGradientDirection()}, ${layer.mask})`,
          }}
        />
      ))}

      {gradientColor && (
        <div
          style={{
            ...blurFilterStyle,
            background: `linear-gradient(${getGradientDirection()}, transparent, ${gradientColor})`,
          }}
        />
      )}
    </div>
  );
};

export default GradientBlur;
