import { FC } from "react";
import { Advertisement } from "../../types/advertisement";
import { Link } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";

type Props = { query: string; current: number };

const Sugestion: FC<Props> = ({ query, current }) => {
  const { data, error } = useQuery<Advertisement[]>(
    `api/advertisements?${query}`
  );

  return (
    <div className="w-2/10 m-8">
      <ul>
        {data?.slice(0, 3).map((item) => (
          <div>
            {item.id != current && (
              <li
                key={item.id}
                className="box-content w-6/6 min-h-1/6 m-4 p-4 shadow-md rounded-md"
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
                <div className="flex flex-row-reverse space-x-4 space-x-reverse items-end">
                  <Link
                    className="font-medium hover:underline text-[#DED9E2]"
                    to={"/board/" + item.id}
                  >
                    More
                  </Link>
                </div>
              </li>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sugestion;
