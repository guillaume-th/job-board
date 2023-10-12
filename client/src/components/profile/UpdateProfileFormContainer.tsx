import { FC } from "react";
import { User } from "../../types/user";
import { useQuery } from "../../hooks/useQuery";
import { Skill } from "../../types/skill";
import { ErrorMessage, Spinner } from "../ui/atoms";
import UpdateProfileFormContent from "./UpdateProfileFormContent";

type Props = {
  user: User;
};

const UpdateProfileFormContainer: FC<Props> = ({ user }) => {
  const { data, error } = useQuery<Skill[]>("api/skills");

  if (!data && !error) {
    return (
      <div className="flex w-full justify-center items-center m-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full">
      {data ? (
        <UpdateProfileFormContent user={user} skills={data} />
      ) : (
        <ErrorMessage text={error} />
      )}
    </div>
  );
};

export default UpdateProfileFormContainer;
