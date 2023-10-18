// affichage de la donnée
import { FC } from "react";
import { Advertisement } from "../../types/advertisement";
import { Button } from "../ui/atoms";
import { capitalize } from "../../helpers/format";
import { Chips } from "../ui/organisms";
import SuggestionsList from "../suggestion/SuggestionsList";

type Props = { data: Advertisement; onApply: () => void };

const formatContract = (str: string) => capitalize(str.replace("_", " "));

const AdvertisementContent: FC<Props> = ({ data, onApply }) => {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-10/12 flex m-10 flex-col">
        <div className="flex gap-2">
          <div className="box-content w-5/6 m-4 p-4 shadow-md rounded-md">
            <div className="flex items-center gap-2">
              <h1 className="items-center justify-center text-[#57CC99] font-bold text-xl">
                {data.name.toUpperCase()}
              </h1>
              <p className="text-[#2F2963]">@ {data?.company?.name}</p>
            </div>
            {data?.contract_type && (
              <span className="text-gray-400 italic">
                {formatContract(data?.contract_type)}
              </span>
            )}
            <span> - </span>
            <span className="text-gray-400 italic">
              {data.working_time} hours{" "}
            </span>
            <hr />
            <span className="text-gray-400 italic">{data.place}</span>
            <p className="font-semibold mt-4">Job description</p>
            <div className="bg-[#DED9E2]/20 my-6 shadow p-6 mx-10 whitespace-pre-wrap max-h-[500px] overflow-y-scroll">
              <p className="text-justify leading-relaxed">{data.description}</p>
            </div>
            {data.skills && (
              <div className="my-4">
                <h3 className="font-semibold my-2">Expected skills: </h3>
                <Chips data={data.skills} />
              </div>
            )}
            <p className="mb-2 text-[#2F2963] italic text-sm">
              Posted by {capitalize(data.recruiter.firstname)}{" "}
              {capitalize(data.recruiter.lastname)} on{" "}
              {new Date(data.created_at).toUTCString()}
            </p>
            <div className="p-4">
              <Button text="Apply" onClick={onApply} />
            </div>
          </div>
        </div>
      </div>
      <SuggestionsList query={data.company.name} current={data.id} />
    </div>
  );
};

export default AdvertisementContent;
