import { HTMLProps, forwardRef } from "react";

type Props = HTMLProps<HTMLTextAreaElement> & {
  label: string;
};

const Input = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <label className="block m-2">
        <span className="block m-2">{label}</span>
        <textarea
          {...props}
          ref={ref}
          className="block m-2 p-2 w-full text-[#2F2963] border-solid border-2 rounded"
        />
      </label>
    );
  }
);

export default Input;
