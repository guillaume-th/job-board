// affichage de la donnée
import { FC } from "react";
import { User } from "../../types/user";
import { Link } from "react-router-dom";

type Props = { user: User };

const CandidateContent: FC<Props> = ({ user }) => {
  const data = user.created_advertisements?.flatMap((ad) =>
    ad.job_applications?.map((application) => ({
      ...application,
      advertisement: { name: ad.name, contract_type: ad.contract_type },
    }))
  );
  if (data && data.length >= 1) {
    return (
      <div className="w-screen h-screen">
        <ul className="w-screen h-screen">
          {data.map(function (item, i) {
            if (!item) {
              return null;
            }
            return (
              <li
                key={i}
                className="box-content w-4/6 min-h-1/6 m-4  p-4 shadow-md rounded-md"
              >
                <div className="flex justify-between text-[#57CC99]">
                  <div>
                    <strong>
                      <Link
                        className="hover:underline"
                        to={"/board/" + item.id}
                      >
                        {item.advertisement.name.toUpperCase()}
                      </Link>
                    </strong>
                    <span> - </span>
                    <span>
                      {item.advertisement.contract_type.replace("_", " ")}
                    </span>
                  </div>
                  <div>
                    <span>
                      <strong>{item.state.toUpperCase()}</strong>
                    </span>
                  </div>
                </div>
                <hr />
                <div className="text-gray-400 italic">
                  Posted : {new Date(item.created_at).toUTCString()}
                </div>
                <br />
                <div className="flex justify-between">
                  <span>
                    Candidate : {item.candidate_name} - {item.candidate_email}
                  </span>
                </div>
                <div className="flex flex-row-reverse space-x-4 space-x-reverse items-end">
                  <Link
                    className="font-medium hover:underline text-[#DED9E2]"
                    to={"/applications/me/" + item.id}
                  >
                    View Message
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
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

export default CandidateContent;
