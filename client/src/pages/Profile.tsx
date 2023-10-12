import { FC } from "react";
import { useParams } from "react-router-dom";
import { get } from "../helpers/storage";
import { User } from "../types/user";
import { useQuery } from "../hooks/useQuery";
import { ErrorMessage, Spinner } from "../components/ui/atoms";
import { ProfileTemplate } from "../components/ui/templates";
import UpdateProfileFormContainer from "../components/profile/UpdateProfileFormContainer";

type Props = {
  edit?: boolean;
};

const Profile: FC<Props> = ({ edit = false }) => {
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

  const component = edit ? (
    <UpdateProfileFormContainer user={data!} />
  ) : (
    <ProfileTemplate user={data!} editable={isEditable} />
  );
  return (
    <div className="flex items-center justify-center w-full">
      {data ? component : <ErrorMessage text={error} />}
    </div>
  );
};

export default Profile;
