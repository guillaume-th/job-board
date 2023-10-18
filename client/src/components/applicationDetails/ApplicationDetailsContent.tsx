import { FC } from "react";
import { JobApplication } from "../../types/jobApplication";
import { useQuery } from "../../hooks/useQuery";
import Messages from "./Messages";
import ApplicationAdvertisementCard from "./ApplicationAdvertisementCard";
import { ErrorMessage, Spinner } from "../ui/atoms";
import ApplicationUserCard from "./ApplicationUserCard";
import { get } from "../../helpers/storage";
import { User } from "../../types/user";

type Props = { data: JobApplication };

const ApplicationDetailsContent: FC<Props> = ({ data }) => {
  const {
    data: application,
    refetch,
    error,
  } = useQuery<JobApplication>("api/applications/" + data.id);
  const currentUser = get<User>("user");
  const shouldDisplayUserData =
    currentUser?.role === "admin" ||
    currentUser?.id === application?.advertisement.recruiter.id;

  if (!application && !error) {
    return (
      <div className="flex w-full justify-center">
        <Spinner />;
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full justify-center">
        <ErrorMessage />
      </div>
    );
  }

  if (application) {
    return (
      <div className="w-full grid p-10 grid-cols-12 gap-10">
        <div className="col-span-7">
          {shouldDisplayUserData && (
            <ApplicationUserCard application={application} refetch={refetch} />
          )}
          <ApplicationAdvertisementCard
            advertisement={application.advertisement}
            applicationState={application.state}
          />
        </div>

        <div className="col-span-5">
          <Messages
            data={application.messages}
            refetch={refetch}
            applicationId={data.id}
          />
        </div>
      </div>
    );
  }
  return null;
};

export default ApplicationDetailsContent;
