import { FC } from "react";
import { JobApplication } from "../../types/jobApplication";
import { useQuery } from "../../hooks/useQuery";
import Messages from "./Messages";
import ApplicationAdvertisementCard from "./ApplicationAdvertisementCard";
import { Spinner } from "../ui/atoms";
import ApplicationUserCard from "./ApplicationUserCard";

type Props = { data: JobApplication };

const ApplicationDetailsContent: FC<Props> = ({ data }) => {
  const { data: application, refetch } = useQuery<JobApplication>(
    "api/applications/" + data.id
  );

  if (!application) {
    return <Spinner />;
  }

  return (
    <div className="w-full grid p-10 grid-cols-12 gap-10">
      <div className="col-span-7">
        <ApplicationUserCard application={application} refetch={refetch} />
        <ApplicationAdvertisementCard
          advertisement={data.advertisement}
          applicationState={application.state}
        />
      </div>

      <div className="col-span-5">
        <Messages
          data={data.messages}
          refetch={refetch}
          applicationId={data.id}
        />
      </div>
    </div>
  );
};

export default ApplicationDetailsContent;
