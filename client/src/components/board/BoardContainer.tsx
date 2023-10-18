// requete / fetch / gestion du chargement
import { FC } from "react";
import { useQuery } from "../../hooks/useQuery";
import { Advertisement } from "../../types/advertisement";
import BoardContent from "./BoardContent";
import { Spinner, ErrorMessage } from "../ui/atoms";

type Props = {
  query: string;
};

const BoardContainer: FC<Props> = ({ query }) => {
  const { data, error } = useQuery<Advertisement[]>(
    `api/advertisements?${query}`
  );

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
    return <BoardContent data={data} />;
  }

  return null;
};

export default BoardContainer;
