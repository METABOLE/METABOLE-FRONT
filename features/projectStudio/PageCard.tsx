import SafeNumberFlow from '@/components/shared/SafeNumberFlow';
import { IconDelete } from '@/components/ui/Icons';

const PageCard = ({
  title,
  onDelete,
  onUnSelect,
}: {
  title: string;
  onDelete?: () => void;
  onUnSelect?: () => void;
}) => {
  return (
    <div className="border-gradient-white-to-b ease-power4-in-out h-[451px] w-[263px] rounded-3xl bg-[#e9e9fd] bg-linear-to-b from-[#c3c2ff4d] to-[#C5C4FF00] px-4 py-3 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.01]">
      <div className="flex gap-2">
        <p className="border-blue-10 grow overflow-hidden rounded-md border-[1px] px-2 py-0.5 text-ellipsis whitespace-nowrap">
          {title}
        </p>
        {onDelete && (
          <button className="cursor-pointer" onClick={onUnSelect}>
            <IconDelete className="fill-blue hover:fill-red transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
};

export const PageAndMoreCard = ({ number }: { number: number }) => {
  return (
    <div className="border-gradient-white-to-b h-[451px] w-[263px] rounded-3xl bg-[#e9e9fd] bg-linear-to-b from-[#c3c2ff4d] to-[#C5C4FF00] px-4 py-3 backdrop-blur-xl">
      <p className="border-blue-10 h2 text-blue flex h-full grow justify-center rounded-md border-[1px] px-2 pt-10">
        <SafeNumberFlow prefix="+ " value={number} />
      </p>
    </div>
  );
};

export default PageCard;
