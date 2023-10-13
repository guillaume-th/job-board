import { FC, FormEvent, useRef, useState } from "react";
import { get } from "../helpers/storage";
import { User } from "../types/user";
import { Skill } from "../types/skill";
import { useQuery } from "../hooks/useQuery";
import { Button, ErrorMessage, Input, Spinner } from "../components/ui/atoms";
import { Chips } from "../components/ui/organisms";
import { useMutation } from "../hooks/useMutation";

type Props = {};
type Body = { name: string; color: string };

const SkillPage: FC<Props> = () => {
  const currentUser = get<User>("user");
  const { data, error, refetch } = useQuery<Skill[]>(`api/skills`);
  const submit = useMutation<Body, Skill>("api/skills");
  const formRef = useRef<HTMLFormElement>(null);
  const [globalError, setGlobalError] = useState(false);

  if (currentUser?.role !== "admin") {
    return <ErrorMessage text="Permission denied" />;
  }

  if (!data && !error) {
    return (
      <div className="flex w-full justify-center items-center m-4">
        <Spinner />
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = Object.fromEntries(
      new FormData(formRef?.current ?? undefined)
    ) as unknown as Body;

    await submit(body);

    if (error) {
      setGlobalError(true);
      console.error(error);
    } else if (data) {
      setGlobalError(false);
      refetch();
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      {data ? (
        <div className="w-6/12 flex m-10 flex-col">
          <form onSubmit={handleSubmit} ref={formRef}>
            <h2>Add a new skill</h2>
            <Input label="Name" name="name" placeholder="Microsoft Office" />
            <Input label="Color" name="color" type="color" />
            <div className="flex justify-end w-full my-4">
              <Button text="Save" type="submit" />
            </div>
            {globalError && (
              <ErrorMessage text="Something went wrong. Please contact an admin." />
            )}
          </form>
          <Chips data={data} />
        </div>
      ) : (
        <ErrorMessage text={error} />
      )}
    </div>
  );
};

export default SkillPage;
