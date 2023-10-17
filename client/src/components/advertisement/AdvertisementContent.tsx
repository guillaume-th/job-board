// affichage de la donnée
import { FC } from "react";
import { Advertisement } from "../../types/advertisement";
import { Button } from "../ui/atoms";

type Props = { data: Advertisement };

const AdvertisementContent: FC<Props> = ({ data }) => {
  return (
    <div className="w-screen h-screen flex flex-column">
      <div className="box-content w-5/6 m-4 p-4 shadow-md rounded-md">
        <h1 className="items-center justify-center">
          {data.name.toUpperCase()}
        </h1>
        {data.contract_type && (
          <span className="text-gray-400 italic">
            {data.contract_type.replace("_", " ")}
          </span>
        )}
        <span> - </span>
        <span className="text-gray-400 italic">{data.place}</span>
        <hr />
        <br />
        <h2>
          Posted by {data.recruiter.firstname} {data.recruiter.lastname}
        </h2>
        <br />
        <h2>Company {data.company.name}</h2>
        <br />
        <h2>Description du Poste</h2>
        <br />
        <p>{data.description}</p>
        <br />
        <Button text="Apply" />
      </div>
    </div>
  );
};

export default AdvertisementContent;
