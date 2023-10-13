// requete / fetch / gestion du chargement
import { FC } from "react";
import { useQuery } from "../../hooks/useQuery";
import { Advertisement } from "../../types/advertisement";
import BoardContent from "./BoardContent";

const BoardContainer: FC = () => {
  let params = document.location.search;
  const { data, error } = useQuery<Advertisement[]>(
    `api/advertisements/${params}`
  );

  if (data) {
    return <BoardContent data={data} />;
  } else {
    return <p>{error}</p>;
  }
};

export default BoardContainer;
