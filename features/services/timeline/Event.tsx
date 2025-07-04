import clsx from 'clsx';

const Event = ({
  isSquare = false,
  className,
  icon,
  label,
  duration,
}: {
  isSquare?: boolean;
  className?: string;
  icon: React.ReactNode;
  label: string;
  duration?: string;
}) => {
  return (
    <div className={clsx('relative p-[3px]', className)}>
      <div
        className={clsx(
          'z-10 flex h-14 items-center gap-2.5 rounded-xl px-6',
          isSquare ? 'w-14 justify-center bg-white' : 'bg-blue',
        )}
      >
        {icon && <div>{icon}</div>}

        <p
          className={clsx(
            'p2 row-span-8 whitespace-nowrap text-white',
            isSquare && 'absolute left-[calc(100%+14px)]',
          )}
        >
          {label}
        </p>
        {duration && <span className="text-white-30 p2 whitespace-nowrap">(~{duration}.)</span>}
      </div>
    </div>
  );
};

export default Event;
