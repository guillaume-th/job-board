import { FC } from "react";

type Props = {
  url: string;
  className?: string;
};

const Avatar: FC<Props> = ({ url, className }) => {
  return (
    <img
      className={`rounded-full w-[100px] h-[100px] object-cover block border-2 border-[#57CC99] ${className}`}
      src={url}
      alt="avatar"
    />
  );
};

export default Avatar;
