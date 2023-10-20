// affichage de la donnée
import { FC } from "react";
import { Advertisement } from "../../types/advertisement";
import { Button } from "../ui/atoms";
import { capitalize } from "../../helpers/format";
import { Chips } from "../ui/organisms";
import SuggestionsList from "../suggestion/SuggestionsList";
import { useNavigate } from "react-router-dom";
import { get } from "../../helpers/storage";
import { User } from "../../types/user";

type Props = { data: Advertisement; onApply: () => void };

const formatContract = (str: string) => capitalize(str.replace("_", " "));

const AdvertisementContent: FC<Props> = ({ data, onApply }) => {
  const navigate = useNavigate();
  const currentUser = get<User>("user");
  const canEdit =
    currentUser?.id === data.recruiter.id || currentUser?.role === "admin";

  return (
    <div className="flex w-screen h-screen justify-center">
      <div className="w-10/12 flex m-10 flex-col">
        <div className=" w-full m-4 p-4 shadow-md rounded-md">
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2 items-center">
              <h1 className="items-center justify-center text-[#57CC99] font-bold text-xl">
                {data.name.toUpperCase()}
              </h1>
              <p className="text-[#2F2963]">@ {data?.company?.name}</p>
            </div>
            {canEdit && (
              <Button
                text="Edit"
                onClick={() => navigate(`/advertisements/${data.id}/edit`)}
              />
            )}
          </div>
          {data?.contract_type && (
            <span className="text-gray-400 italic">
              {formatContract(data?.contract_type)}
            </span>
          )}
          {data?.working_time && (
            <>
              <span> - </span>
              <span className="text-gray-400 italic">
                {data.working_time} hours{" "}
              </span>
            </>
          )}
          {data?.salary && (
            <>
              <span> - </span>
              <span className="text-gray-400 italic">{data.salary} € </span>
            </>
          )}
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
          <div className="w-full justify-end flex">
            <Button text="Apply" onClick={onApply} />
          </div>
        </div>
      </div>
      <SuggestionsList query={data.company.id} current={data.id} />
    </div>
  );
};

export default AdvertisementContent;
