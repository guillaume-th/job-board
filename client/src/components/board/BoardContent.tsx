// affichage de la donnée
import { FC } from "react";
import { Advertisement } from "../../types/advertisement";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/atoms";

type Props = { data: Advertisement[] };

const BoardContent: FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  const handleApply = (id: number) =>
    navigate(`/applications/create?advertisement_id=${id.toString()}`);

  return (
    <div className="w-screen h-screen">
      <ul className="w-screen h-screen">
        {data.map((item) => (
          <li
            key={item.id}
            className="box-content w-4/6 min-h-1/6 m-4 p-4 shadow-md rounded-md"
          >
            <div>
              <strong>
                <Link className="hover:underline" to={"/board/" + item.id}>
                  {item.name.toUpperCase()}
                </Link>
              </strong>
              <span> - </span>
              {item.contract_type && (
                <span>{item.contract_type.replace("_", " ")}</span>
              )}
            </div>
            <hr />
            <div className="text-gray-400 italic">{item.place}</div>
            <br />
            <div className="flex justify-between">
              <span className="truncate">{item.description}</span>
            </div>
            <div className="flex flex-row-reverse space-x-4 space-x-reverse items-end">
              <span>
                <Button text="Apply" onClick={() => handleApply(item.id)} />
              </span>
              <Link
                className="font-medium hover:underline text-[#DED9E2]"
                to={"/board/" + item.id}
              >
                More
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardContent;
