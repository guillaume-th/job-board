import { FC } from "react";

export type Props = {
  text?: string | null;
};

const ErrorMessage: FC<Props> = ({
  text = "Something went wrong. Please contact an admin",
}) => {
  return <p className="text-[#dc2626] text-md">{text}</p>;
};

export default ErrorMessage;
