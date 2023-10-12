import { FC } from "react";

export type ChipsProps = { data: { name: string; color?: string }[] };

const Chips: FC<ChipsProps> = ({ data }) => {
  if (!data?.length) {
    return null;
  }

  return (
    <div className="mx-2">
      {data.map(({ name, color }) => (
        <span
          className="px-4 py-1 border-1 border-[#2F2963] rounded mx-2 select-none"
          style={{ backgroundColor: color ?? "#57CC99" }}
        >
          {name}
        </span>
      ))}
    </div>
  );
};

export default Chips;
