import clsx from 'clsx';

const Divider = ({ className, isDashed = false }: { className?: string; isDashed?: boolean }) => {
  return (
    <div className={className}>
      <div
        className={clsx(
          'row-span-8 h-full w-0.5 border-1 border-[#F1F2FF] opacity-50',
          !isDashed && 'bg-[#F1F2FF]',
        )}
        style={
          isDashed
            ? {
                borderStyle: 'dashed',
                borderSpacing: '8px',
                borderImage:
                  'repeating-linear-gradient(to bottom, #F1F2FF 0, #F1F2FF 4px, transparent 4px, transparent 12px) 1',
              }
            : {}
        }
      />
    </div>
  );
};

export default Divider;
