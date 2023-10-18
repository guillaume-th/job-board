import { FC } from "react";
import { Card } from "../molecules";
import { useNavigate } from "react-router-dom";
import { User } from "../../../types/user";
import { Button } from "../atoms";

type Props = {
  user: User;
};

const LastApplications: FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  const data =
    user.role === "recruiter"
      ? user.created_advertisements?.flatMap((ad) =>
          ad.job_applications?.map((application) => ({
            ...application,
            advertisement: { name: ad.name, contract_type: ad.contract_type },
          }))
        )
      : user.job_applications;

  const goToApplicationDetails = (id: number) => {
    navigate(`/applications/me/${id}`);
  };

  const goToApplications = () => {
    if (user.role === "recruiter") {
      navigate("/candidate");
    } else if (user.role === "candidate") {
      navigate("/applications/me");
    }
  };

  return data ? (
    <div className="bg-[#DED9E2]/50 my-6 p-4 shadow">
      <h3 className="mb-4 text-[#2F2963] font-semibold">
        Your last applications
      </h3>
      <div className="grid grid-cols-4 text-sm">
        {data.slice(0, 2).map((application) => (
          <Card className="bg-white min-h-[100px]">
            <p>{application?.advertisement.name}</p>
            {application && (
              <>
                <p className="text-[#DED9E2]">
                  {new Date(application.created_at).toUTCString()}
                </p>
                <span
                  className="underline cursor-pointer block w-fit my-2"
                  onClick={() => goToApplicationDetails(application.id)}
                >
                  Show details
                </span>
              </>
            )}
          </Card>
        ))}
        <div className="flex items-center p-4">
          {user.role === "recruiter" ? (
            <Button
              text="Post a new ad"
              onClick={() => navigate("/advertisements/create")}
            />
          ) : (
            <Button
              text="Browse job offers"
              onClick={() => navigate("/board")}
            />
          )}
        </div>
      </div>
      <div className="flex w-full justify-end">
        <span
          className="underline cursor-pointer block w-fit my-2"
          onClick={goToApplications}
        >
          See all
        </span>
      </div>
    </div>
  ) : null;
};

export default LastApplications;
