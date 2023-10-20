// affichage de la donnée
import { FC } from "react";
import { Advertisement } from "../../types/advertisement";
import AdvertisementCard from "./AdvertisementCard";

type Props = { data: Advertisement[] };

const BoardContent: FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-semibold text-[#2F2963]">Job offers</h1>
      <hr className="h-2 bg-[#57CC99] w-full block my-4" />
      <ul className="w-full h-full">
        {data.map((item) => (
          <AdvertisementCard advertisement={item} />
        ))}
      </ul>
    </div>
  );
};

export default BoardContent;
