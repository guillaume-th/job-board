import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Card: FC<Props> = ({ children, className = "" }) => {
  return (
    <div className={`rounded-md shadow-md p-4 ${className}`}>{children}</div>
  );
};

export default Card;
