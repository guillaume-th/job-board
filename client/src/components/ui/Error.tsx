import { FC } from "react";

export type Props = {
  text: string;
};

const ErrorMessage: FC<Props> = ({ text }) => {
  return <p className="text-[#dc2626] text-md">{text}</p>;
};

export default ErrorMessage;
