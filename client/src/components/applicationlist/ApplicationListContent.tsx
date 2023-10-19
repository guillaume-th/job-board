// affichage de la donnée
import { FC } from "react";
import { JobApplication } from "../../types/jobApplication";
import { User } from "../../types/user";
import { Link } from "react-router-dom";
import ApplicationState from "../ui/atoms/ApplicationState";

type Props = { user: User };

const ApplicationContent: FC<Props> = ({ user }) => {
  let data: JobApplication[] | undefined = user.job_applications;
  if (data && data.length >= 1) {
    return (
      <div className="w-full h-full flex items-center flex-col">
        <div className="w-8/12 mt-6">
          <h1 className="text-2xl font-semibold text-[#2F2963]">
            All applications
          </h1>
          <hr className="h-2 bg-[#57CC99] w-full block my-4" />
          <ul className="w-5/6 px-6">
            {data.map(function (item, i) {
              return (
                <li
                  key={item.id}
                  className="w-full min-h-1/6 p-4 shadow-md rounded-md my-8"
                >
                  <div className="flex justify-between text-[#57CC99]">
                    <div>
                      <strong>
                        <Link
                          className="hover:underline"
                          to={"/board/" + item.id}
                        >
                          {item?.advertisement?.name.toUpperCase()}
                        </Link>
                      </strong>
                      <span> - </span>
                      <span>
                        {item?.advertisement?.contract_type?.replace("_", " ")}
                      </span>
                    </div>
                    <div>
                      <ApplicationState state={item?.state} />
                    </div>
                  </div>
                  <hr />
                  <div className="text-gray-400 italic">
                    {item?.advertisement?.place}
                  </div>
                  <br />
                  <div className="flex justify-between">
                    <p className="truncate ... ">
                      {item?.advertisement?.description}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link
                      className="font-medium hover:underline text-[#DED9E2]"
                      to={"/applications/me/" + item.id}
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
        <p>No applications found...</p>
      </div>
    );
  }
};

export default ApplicationContent;
