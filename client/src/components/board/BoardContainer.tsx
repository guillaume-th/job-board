// requete / fetch / gestion du chargement
import { FC } from "react";
import { useQuery } from "../../hooks/useQuery";
import { Advertisement } from "../../types/advertisement";
import BoardContent from "./BoardContent";

const BoardContainer: FC = () => {
  const { data, error } = useQuery<Advertisement[]>("api/advertisements/");

  if (data) {
    return <BoardContent data={data} />;
  } else {
    return <p>{error}</p>;
  }
};

export default BoardContainer;
