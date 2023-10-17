import { FC } from "react";
import { useParams } from "react-router-dom";
import { get } from "../helpers/storage";
import { User } from "../types/user";
import { useQuery } from "../hooks/useQuery";
import { ErrorMessage, Spinner } from "../components/ui/atoms";
import { ProfileTemplate } from "../components/ui/templates";

type Props = {};

const Profile: FC<Props> = () => {
  const { id } = useParams();
  const currentUser = get<User>("user");
  const userId = id === "me" ? currentUser.id : id;
  const { data, error } = useQuery<User>(`api/users/${userId}`);
  const isEditable =
    id === "me" ||
    currentUser?.role === "admin" ||
    Number(id) === currentUser?.id;

  if (!userId) {
    return <ErrorMessage text="Something went wrong. Please log in." />;
  }

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
        <ProfileTemplate user={data!} editable={isEditable} />
      ) : (
        <ErrorMessage text={error} />
      )}
    </div>
  );
};

export default Profile;
