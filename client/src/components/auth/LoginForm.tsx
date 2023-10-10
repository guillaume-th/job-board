import { FC } from "react";
import { Button, Input } from "../ui";

type Props = { className?: string };

const LoginForm: FC<Props> = ({ className }) => {
  return (
    <form className={`${className} w-full flex flex-col justify-center`}>
      <h2 className="text-4xl text-[#2F2963] font-semibold text-end">
        Welcome !
      </h2>
      <div>
        <Input type="email" placeholder="bob@mail.com" label="Email" />
        <Input type="password" label="Password" placeholder="********" />
        <Button text="Submit" type="submit" />
      </div>
    </form>
  );
};

export default LoginForm;
