import { FC } from "react";
import { Button, Input } from "../ui";

type Props = { className?: string; onSwitchForm: () => void };

const LoginForm: FC<Props> = ({ className, onSwitchForm }) => {
  return (
    <form className={`${className} w-full flex flex-col justify-center`}>
      <h2 className="text-4xl text-[#2F2963] font-semibold">Welcome !</h2>
      <h3 className="text-[#57CC99] text-xl">
        Sign in to find your next experience!
      </h3>
      <div className="mt-8">
        <Input type="email" placeholder="bob@mail.com" label="Email" required />
        <Input
          type="password"
          label="Password"
          placeholder="********"
          required
        />
        <div className="flex justify-end w-full">
          <Button text="Submit" type="submit" />
        </div>
      </div>
      <p className="text-[#01200F]">
        Don't have an account? Register{" "}
        <span className="underline cursor-pointer" onClick={onSwitchForm}>
          here
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
