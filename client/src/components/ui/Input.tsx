import { HTMLProps, forwardRef } from "react";

type Props = HTMLProps<HTMLInputElement> & { label: string };

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <label className="block m-2">
        <span className="block m-2">{label}</span>
        <input {...props} ref={ref} className="block m-2 p-2 w-full" />
      </label>
    );
  }
);

export default Input;
