import { FC } from "react";
import { useQuery } from "../../hooks/useQuery";
import ApplicationContent from "./ApplicationListContent";
import { get } from "../../helpers/storage";
import { User } from "../../types/user";
import { Spinner, ErrorMessage } from "../ui/atoms";

const ApplicationContainer: FC = () => {
  const currentUser = get<User>("user");
  const { data, error } = useQuery<User>(`api/users/${currentUser?.id}`);

  if (!data && !error) {
    return (
      <div className="flex items-center justify-center w-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage text={error} />;
  }

  if (data) {
    return <ApplicationContent user={data} />;
  }

  return null;
};

export default ApplicationContainer;
