import { FC } from "react";
import { Advertisement } from "../../types/advertisement";
import { capitalize } from "../../helpers/format";

type Props = { advertisement: Advertisement; applicationState: string };

const ApplicationAdvertisementCard: FC<Props> = ({ advertisement }) => {
  return (
    <div className=" w-full m-4 p-4 shadow-md rounded-md">
      <div className="flex justify-between">
        <h1 className="items-center justify-center text-[#57CC99] font-bold text-xl">
          {advertisement?.name.toUpperCase()}
        </h1>
      </div>
      <span className="text-gray-400 italic">
        {advertisement?.contract_type?.replace("_", " ")}
      </span>
      <span> - </span>
      <span className="text-gray-400 italic">{advertisement?.place}</span>
      <hr />

      <span className="text-gray-400 italic">{advertisement?.place}</span>
      <p className="font-semibold mt-4">Job description</p>
      <div className="bg-[#DED9E2]/20 my-6 shadow p-6 mx-10 whitespace-pre-wrap max-h-[500px] overflow-y-scroll">
        <p className="text-justify leading-relaxed">
          {advertisement?.description}
        </p>
      </div>
      <p className="mb-2 text-[#2F2963] italic text-sm">
        Posted by {capitalize(advertisement?.recruiter?.firstname)}{" "}
        {capitalize(advertisement?.recruiter?.lastname)} on{" "}
        {new Date(advertisement?.created_at).toUTCString()}
      </p>
    </div>
  );
};

export default ApplicationAdvertisementCard;
