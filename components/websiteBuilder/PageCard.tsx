import { IconDelete } from '../Icons';

const PageCard = ({ title, onDelete }: { title: string; onDelete: () => void }) => {
  return (
    <div className="border-gradient-white-to-b h-[451px] w-[263px] rounded-3xl bg-[#e9e9fd] bg-linear-to-b from-[#c3c2ff4d] to-[#C5C4FF00] px-4 py-3 backdrop-blur-xl">
      <div className="flex gap-2">
        <p className="border-blue-10 grow rounded-md border-[1px] px-2 py-0.5">{title}</p>
        <button className="cursor-pointer" onClick={onDelete}>
          <IconDelete />
        </button>
      </div>
    </div>
  );
};

export const PageAndMoreCard = ({ number }: { number: number }) => {
  return (
    <div className="border-gradient-white-to-b h-[451px] w-[263px] rounded-3xl bg-[#e9e9fd] bg-linear-to-b from-[#c3c2ff4d] to-[#C5C4FF00] px-4 py-3 backdrop-blur-xl">
      <div className="flex gap-2">
        <p className="border-blue-10 grow rounded-md border-[1px] px-2 py-0.5">{number} pages</p>
      </div>
    </div>
  );
};

export default PageCard;
