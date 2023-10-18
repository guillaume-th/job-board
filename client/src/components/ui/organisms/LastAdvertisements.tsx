import { FC } from "react";
import { Card } from "../molecules";
import { useNavigate } from "react-router-dom";
import { User } from "../../../types/user";
import { Button } from "../atoms";

type Props = {
  user: User;
};

const LastAdvertisements: FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  const data =
    user.role === "recruiter" || user.role === "admin"
      ? user.created_advertisements?.map((application) => ({
          ...application,
        }))
      : user.created_advertisements;

  const goToApplicationDetails = (id: number) => {
    navigate(`/board/${id}`);
  };

  const goToApplications = () => {
    if (user.role === "recruiter") {
      navigate("/advertisements/me");
    } else if (user.role === "admin") {
      navigate("/advertisements/me");
    }
  };

  return data ? (
    <div className="bg-[#DED9E2]/50 my-6 p-4 shadow">
      <h3 className="mb-4 text-[#2F2963] font-semibold">
        Your last advertisements
      </h3>
      <div className="grid grid-cols-4 text-sm gap-4">
        {data
          .reverse()
          .slice(0, 3)
          .map((application) => (
            <Card className="bg-white min-h-[100px]">
              <p>{application?.name}</p>
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
          {(user.role === "recruiter" || user.role === "admin") && (
            <Button
              text="Post a new ad"
              onClick={() => navigate("/advertisements/create")}
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

export default LastAdvertisements;
