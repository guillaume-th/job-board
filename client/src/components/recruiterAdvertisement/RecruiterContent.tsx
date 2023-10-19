// affichage de la donnée
import { FC } from "react";
import { Link } from "react-router-dom";
import { Advertisement } from "../../types/advertisement";

type Props = { data: Advertisement[] };

const RecruiterContent: FC<Props> = ({ data }) => {
  if (data && data.length >= 1) {
    return (
      <div className="w-full h-full flex items-center flex-col">
        <div className="w-8/12 mt-6">
          <h1 className="text-2xl font-semibold text-[#2F2963]">
            All advertisements
          </h1>
          <hr className="h-2 bg-[#57CC99] w-full block my-4" />
          <ul className="w-5/6 px-6">
            {data.map(function (item, i) {
              if (!item) {
                return null;
              }
              return (
                <li
                  key={i}
                  className="w-full min-h-1/6 p-4 shadow-md rounded-md my-8"
                >
                  <div className="flex justify-between text-[#57CC99]">
                    <div>
                      <strong>
                        <Link
                          className="hover:underline"
                          to={"/board/" + item.id}
                        >
                          {item.name.toUpperCase()}
                        </Link>
                      </strong>
                      <span> - </span>
                      <span>{item.contract_type.replace("_", " ")}</span>
                    </div>
                  </div>
                  <hr />
                  <div className="text-gray-400 italic">
                    Posted : {new Date(item.created_at).toUTCString()}
                  </div>
                  <br />
                  <div className="flex justify-between">
                    <span className="truncate">{item.description}</span>
                  </div>
                  <div className="flex flex-row-reverse space-x-4 space-x-reverse items-end">
                    <Link
                      className="font-medium hover:underline text-[#DED9E2]"
                      to={"/board/" + item.id}
                    >
                      View details
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>No applications received yet...</p>
      </div>
    );
  }
};

export default RecruiterContent;
