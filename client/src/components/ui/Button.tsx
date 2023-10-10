import { ButtonHTMLAttributes, FC } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { text: string };

const Button: FC<Props> = ({ text, ...props }) => {
  return (
    <button {...props} className="bg-[#2F2963] text-[#DED9E2]">
      {text}
    </button>
  );
};

export default Button;
