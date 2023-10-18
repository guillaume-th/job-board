import { FC } from "react";

type Id = string | number;
export type ChipsProps = {
  data: { name: string; color?: string; id: Id }[];
  onDelete?: (id: Id) => void;
};

const Chips: FC<ChipsProps> = ({ data, onDelete }) => {
  if (!data?.length) {
    return null;
  }

  return (
    <div className="mx-2 flex gap-4 flex-wrap mt-4">
      {data.map(({ name, color, id }) => (
        <div
          key={id}
          className="flex justify-between items-center px-4 py-1 border-1 border-[#2F2963] rounded"
          style={{ backgroundColor: color ?? "#57CC99" }}
        >
          <span className="mx-2 select-none block ">{name}</span>
          {onDelete && (
            <div className="cursor-pointer block" onClick={() => onDelete(id)}>
              <img
                src="/cross.png"
                alt="delete"
                className="w-4 h-4 ml-3 hover:scale-105"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Chips;
