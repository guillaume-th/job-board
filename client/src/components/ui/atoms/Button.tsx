import { ButtonHTMLAttributes, FC } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { text: string };

const Button: FC<Props> = ({ text, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-[#2F2963] text-[#DED9E2] rounded py-2 px-4 hover:scale-105 hover:bg-[#57CC99] transition ease-in-out ${props.className}`}
    >
      {text}
    </button>
  );
};

export default Button;
