import { FC, FormEvent, useRef, useState } from "react";
import { User } from "../../types/user";
import { Button, ErrorMessage, Input, TextArea } from "../ui/atoms";
import { useMutation } from "../../hooks/useMutation";
import { useNavigate } from "react-router-dom";
import Dropdown from "../Dropdown";
import { Skill } from "../../types/skill";
import { Skills } from "../ui/organisms";

type Props = {
  user: User;
  skills: Skill[];
};

type FieldsToOmit =
  | "emai"
  | "password"
  | "role"
  | "created_advertisement"
  | "company"
  | "job_applications"
  | "created_at"
  | "updated_at"
  | "skills";
type Body = Omit<User, FieldsToOmit> & { skills: number[] };

const UpdateProfileFormContent: FC<Props> = ({ user, skills }) => {
  const submit = useMutation<Body, User>(`api/users/${user.id}`, "PUT");
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [userSkills, setSkills] = useState<Skill[]>(user?.skills ?? []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = Object.fromEntries(
      new FormData(formRef?.current ?? undefined)
    ) as unknown as Body;
    body.skills = skills.map(({ id }) => id);
    const { data, error } = await submit(body);

    if (error) {
      setError(true);
      console.error(error);
    } else if (data) {
      setError(false);
      navigate(`/profile/${user.id}`);
    }
  };

  const onAddSkill = (id: number) => {
    const skill = skills.find((skill) => skill.id === id);
    if (skill) setSkills((prev) => [...prev, skill]);
  };

  return (
    <div className="w-6/12 flex m-10 flex-col">
      <form ref={formRef} onSubmit={handleSubmit}>
        <Input
          label="First name"
          defaultValue={user.firstname}
          name="firstname"
        />
        <Input label="Last name" defaultValue={user.lastname} name="lastname" />
        <Input label="Username" defaultValue={user.username} name="username" />
        <TextArea
          label="Description"
          defaultValue={user.description}
          name="description"
        />
        <Input label="Phone number" defaultValue={user.phone} name="phone" />
        <Input label="Avatar (URL)" defaultValue={user.avatar} name="avatar" />

        {skills && <Skills skills={userSkills} />}
        <Dropdown
          elements={skills.map(({ id, name }) => ({ id, name }))}
          onSelectValue={onAddSkill}
          label="Browse skills"
        />
        <div className="flex w-full justify-end my-4">
          <Button type="submit" text="Save" />
        </div>
        {error && (
          <ErrorMessage text="Something went wrong, please try again." />
        )}
      </form>
    </div>
  );
};

export default UpdateProfileFormContent;
