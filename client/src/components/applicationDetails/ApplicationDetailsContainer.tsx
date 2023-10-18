import { FC } from "react";
import { useQuery } from "../../hooks/useQuery";
import ApplicationDetailsContent from "./ApplicationDetailsContent";
import { useParams } from "react-router-dom";
import { JobApplication } from "../../types/jobApplication";

const ApplicationDetailsContainer: FC = () => {
  const { id } = useParams();
  const { data, error } = useQuery<JobApplication>("api/applications/" + id);

  if (data) {
    return <ApplicationDetailsContent data={data} />;
  } else {
    return <p>{error}</p>;
  }
};

export default ApplicationDetailsContainer;
