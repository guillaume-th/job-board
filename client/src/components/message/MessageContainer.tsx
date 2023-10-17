import { FC } from "react";
import { useQuery } from "../../hooks/useQuery";
import MessageContent from "./MessageContent";
import { useParams } from "react-router-dom";
import { JobApplication } from "../../types/jobApplication";

const AdvertisementContainer: FC = () => {
  const { id } = useParams();
  const { data, error } = useQuery<JobApplication>("api/applications/" + id);

  if (data) {
    return <MessageContent data={data} />;
  } else {
    return <p>{error}</p>;
  }
};

export default AdvertisementContainer;
