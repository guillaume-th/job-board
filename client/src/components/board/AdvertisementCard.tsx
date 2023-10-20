import { FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/atoms";

type Props = { advertisement: any };

const AdvertisementCard: FC<Props> = ({ advertisement }) => {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const navigate = useNavigate();

  const handleApply = (id: number) =>
    navigate(`/applications/create?advertisement_id=${id.toString()}`);

  const smallDescClass = "truncate ... block";
  const expandedDescClass = "whitespace-pre-wrap block";

  return (
    <li
      key={advertisement.id}
      className="min-h-1/6 m-4 p-4 shadow-md rounded-md"
    >
      <div>
        <strong>
          <Link
            className="hover:underline text-[#57CC99] text-xl"
            to={"/board/" + advertisement.id}
          >
            {advertisement?.name?.toUpperCase()}
          </Link>
        </strong>
        <span> - </span>
        {advertisement.contract_type && (
          <span className="italic text-sm">
            {advertisement.contract_type.replace("_", " ")}
          </span>
        )}
      </div>
      <hr />
      <div className="text-gray-400 italic">{advertisement?.place}</div>
      <br />
      <div>
        <span className={isDescExpanded ? expandedDescClass : smallDescClass}>
          {advertisement?.description}
        </span>
        <span
          className="underline block text-sm cursor-pointer"
          onClick={() => {
            setIsDescExpanded((prev) => !prev);
          }}
        >
          {isDescExpanded ? "See less" : "Learn more"}
        </span>
      </div>
      <div className="flex flex-row-reverse space-x-4 space-x-reverse items-end mt-4">
        <span>
          <Button text="Apply" onClick={() => handleApply(advertisement.id)} />
        </span>
        <Link
          className="font-medium hover:underline text-[#DED9E2]"
          to={"/board/" + advertisement.id}
        >
          Details
        </Link>
      </div>
    </li>
  );
};

export default AdvertisementCard;
