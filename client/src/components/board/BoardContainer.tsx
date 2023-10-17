// requete / fetch / gestion du chargement
import { FC } from "react";
import { useQuery } from "../../hooks/useQuery";
import { Advertisement } from "../../types/advertisement";
import BoardContent from "./BoardContent";
import { Spinner, ErrorMessage } from "../ui/atoms";
import { useNavigate } from "react-router-dom";

type Props = {
  query: string;
};

const BoardContainer: FC<Props> = ({ query }) => {
  const { data, error } = useQuery<Advertisement[]>(
    `api/advertisements?${query}`
  );
  const navigate = useNavigate();

  const handleApply = () => {
    navigate("/applications/create");
  };

  if (!data || !error) {
    <div className="flex items-center justify-center w-full">
      return <Spinner />
    </div>;
  }

  if (error) {
    return <ErrorMessage text={error} />;
  }

  if (data) {
    return <BoardContent data={data} onApply={handleApply} />;
  }

  return null;
};

export default BoardContainer;
