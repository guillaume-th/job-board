import { FC, FormEvent, useRef, useState } from "react";
import { Button, Input } from "../ui/atoms";
import { useNavigate } from "react-router-dom";
import { save } from "../../helpers/storage";
import { useMutation } from "../../hooks/useMutation";
import { User } from "../../types/user";
import ErrorMessage from "../ui/atoms/Error";

type Props = { className?: string; onSwitchForm: () => void };
type Body = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: "recruiter" | "candidate";
};

const LoginForm: FC<Props> = ({ className, onSwitchForm }) => {
  const submit = useMutation<Body, User>("api/users/");
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = Object.fromEntries(
      new FormData(formRef?.current ?? undefined)
    );

    const { data, error } = await submit(body as Body);

    if (error) {
      setError(true);
      console.error(error);
    } else if (data) {
      setError(false);
      save("user", JSON.stringify(data));
      navigate("/board");
    }
  };

  return (
    <form
      className={`${className} flex flex-col justify-center`}
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <h2 className="text-4xl text-[#2F2963] font-semibold ">Welcome !</h2>
      <h3 className="text-[#57CC99] text-xl">
        Join us to find your next experience!
      </h3>
      <div className="mt-8">
        <Input
          type="email"
          placeholder="bob@mail.com"
          label="Email"
          name="email"
          required
        />
        <Input
          type="text"
          placeholder="bob_bidou"
          label="Username"
          name="username"
          required
        />
        <Input
          type="text"
          placeholder="Bob"
          label="First name"
          name="firstname"
          required
        />
        <Input
          type="text"
          placeholder="Bidou"
          label="Last name"
          name="lastname"
          required
        />
        <Input
          type="password"
          label="Password"
          placeholder="********"
          name="password"
          required
        />
        <div className="flex items-center gap-8 m-2">
          <p className="m-2 font-semibold">I am a</p>
          <div className="flex justify-evenly">
            <Input
              type="radio"
              value="candidate"
              name="role"
              label="Candidate"
              checked
            />
            <Input
              type="radio"
              value="recruiter"
              name="role"
              label="Recruiter"
            />
          </div>
        </div>
        <div className="flex justify-end w-full">
          <Button text="Submit" type="submit" />
        </div>
      </div>
      {error && <ErrorMessage text="Something went wrong, please try again." />}
      <p className="text-[#01200F]">
        Already have an account? Sign in{" "}
        <span className="underline cursor-pointer" onClick={onSwitchForm}>
          here
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
