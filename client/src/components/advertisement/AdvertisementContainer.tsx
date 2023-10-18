import { FC } from "react";
import { useQuery } from "../../hooks/useQuery";
import { Advertisement } from "../../types/advertisement";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Spinner } from "../ui/atoms";
import AdvertisementContent from "./AdvertisementContent";

const AdvertisementContainer: FC = () => {
  const { id } = useParams();
  const { data, error } = useQuery<Advertisement>("api/advertisements/" + id);
  const navigate = useNavigate();

  const handleApply = () => {
    navigate(`/applications/create?advertisement_id=${id}`);
  };

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
    return <AdvertisementContent data={data} onApply={handleApply} />;
  }

  return null;
};

export default AdvertisementContainer;
