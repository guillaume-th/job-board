import { HTMLProps, forwardRef } from "react";

export type InputProps = HTMLProps<HTMLInputElement> & {
  label: string;
  wrapperClassName?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, wrapperClassName, ...props }, ref) => {
    return (
      <label className={`block m-2 ${wrapperClassName || ""}`}>
        <span className="block m-2">{label}</span>
        <input
          {...props}
          ref={ref}
          style={props.type !== "radio" ? { minHeight: 40 } : undefined}
          className={`block m-2 p-2 w-full text-[#2F2963] border-solid border-2 rounded ${className}`}
        />
      </label>
    );
  }
);

export default Input;
