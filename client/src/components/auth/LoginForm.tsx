import { FC, FormEvent, useRef, useState } from "react";
import { Button, Input } from "../ui";
import { useMutation } from "../../hooks/useMutation";
import { User } from "../../types/user";
import ErrorMessage from "../ui/Error";
import { save } from "../../helpers/storage";

type Props = { className?: string; onSwitchForm: () => void };

type Body = { email: string; password: string };

const LoginForm: FC<Props> = ({ className, onSwitchForm }) => {
  const submit = useMutation<Body, User>("/api/users/auth");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data, error } = await submit({
      email: emailRef?.current?.value ?? "",
      password: passwordRef?.current?.value ?? "",
    });

    if (error) {
      setError(true);
      console.error(error);
    } else if (data) {
      setError(false);
      save("user", JSON.stringify(data));
    }
  };

  return (
    <form
      className={`${className} flex flex-col justify-center`}
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl text-[#2F2963] font-semibold">Welcome !</h2>
      <h3 className="text-[#57CC99] text-xl">
        Sign in to find your next experience!
      </h3>
      <div className="mt-8">
        <Input
          type="email"
          placeholder="bob@mail.com"
          label="Email"
          required
          ref={emailRef}
        />
        <Input
          type="password"
          label="Password"
          placeholder="********"
          required
          ref={passwordRef}
        />
        <div className="flex justify-end w-full">
          <Button text="Submit" type="submit" />
        </div>
      </div>
      [error && <ErrorMessage text="Something went wrong, please try again." />]
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
