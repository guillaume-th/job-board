import { FC } from "react";
import { useQuery } from "../../hooks/useQuery";
import CandidateContent from "./CandidateContent";
import { get } from "../../helpers/storage";
import { User } from "../../types/user";

const CandidateContainer: FC = () => {
  const currentUser = get<User>("user");
  const { data, error } = useQuery<User>(`api/users/${currentUser.id}`);

  if (data) {
    return <CandidateContent user={data} />;
  } else {
    return <p>{error}</p>;
  }
};

export default CandidateContainer;
