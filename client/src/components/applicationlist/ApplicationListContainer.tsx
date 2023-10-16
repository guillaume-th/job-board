import { FC } from "react";
import { useQuery } from "../../hooks/useQuery";
import ApplicationContent from "./ApplicationListContent";
import { get } from "../../helpers/storage";
import { User } from "../../types/user";

const ApplicationContainer: FC = () => {
  const currentUser = get<User>("user");
  const { data, error } = useQuery<User>(`api/users/${currentUser.id}`);

  if (data) {
    return <ApplicationContent user={data} />;
  } else {
    return <p>{error}</p>;
  }
};

export default ApplicationContainer;
