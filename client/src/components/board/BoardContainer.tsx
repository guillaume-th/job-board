// requete / fetch / gestion du chargement
import { FC } from "react";
import { useQuery } from "../../hooks/useQuery";
import { Advertisement } from "../../types/advertisement";
import BoardContent from "./BoardContent";

type Props = {
  query: string;
};

const BoardContainer: FC<Props> = ({ query }) => {
  const { data, error } = useQuery<Advertisement[]>(
    `api/advertisements?${query}`
  );

  if (data) {
    return <BoardContent data={data} />;
  } else {
    return <p>{error}</p>;
  }
};

export default BoardContainer;
