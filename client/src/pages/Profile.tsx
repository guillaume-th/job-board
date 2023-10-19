import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "../helpers/storage";
import { User } from "../types/user";
import { useQuery } from "../hooks/useQuery";
import { ErrorMessage, Spinner } from "../components/ui/atoms";
import { ProfileTemplate } from "../components/ui/templates";

type Props = {};

const Profile: FC<Props> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = get<User>("user");
  const userId = id === "me" ? currentUser?.id : id;
  const { data, error } = useQuery<User>(
    userId ? `api/users/${userId}` : "forbidden"
  );
  const isEditable =
    id === "me" ||
    currentUser?.role === "admin" ||
    Number(id) === currentUser?.id;

  useEffect(() => {
    if (!userId) navigate("/auth");
  }, [navigate, userId]);

  if (!userId) {
    return null;
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
        <ErrorMessage />
      )}
    </div>
  );
};

export default Profile;
