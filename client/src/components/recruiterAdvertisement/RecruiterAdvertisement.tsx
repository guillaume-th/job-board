import { FC } from "react";
import { useQuery } from "../../hooks/useQuery";
import RecruiterContent from "./RecruiterContent";
import { get } from "../../helpers/storage";
import { User } from "../../types/user";

const RecruiterContainer: FC = () => {
  const currentUser = get<User>("user");
  const { data, error } = useQuery<User>(`api/users/${currentUser?.id}`);

  if (data && data.created_advertisements) {
    return <RecruiterContent data={data.created_advertisements} />;
  } else {
    return <p>{error}</p>;
  }
};

export default RecruiterContainer;
