import { FC } from "react";
import { User } from "../../../types/user";
import { capitalize } from "../../../helpers/format";
import Chips from "../organisms/Chips";
import { Card } from "../molecules";
import { Button } from "../atoms";
import { useNavigate } from "react-router-dom";
import LastApplications from "../organisms/LastApplications";
import { clear } from "../../../helpers/storage";

type Props = {
  user: User;
  editable: boolean;
};

const ProfileTemplate: FC<Props> = ({ user, editable }) => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/auth");
    clear();
  };

  return (
    <div className="w-6/12 flex m-10 flex-col">
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-[#57CC99]">
            {capitalize(user.firstname)} {capitalize(user.lastname)}
            <span className="text-[#2F2963] text-2xl ml-6">
              [{user?.role.toUpperCase()}]
            </span>
          </h2>
          <p className="text-[#DED9E2] text-md font-italic">@{user.username}</p>
        </div>
        {editable && (
          <Button
            text="Edit"
            onClick={() => {
              navigate(`/users/${user.id}/edit`);
            }}
          />
        )}
      </div>
      <hr className="h-2 bg-[#57CC99] w-full block my-4" />

      <p className="my-4">{user.description}</p>
      <div className="grid grid-cols-2">
        {user.skills && (
          <div className="my-8">
            <h4 className="underline text-lg text-[#2F2963]">Skills</h4>
            <Chips data={user.skills} />
          </div>
        )}
        <Card className="bg-[#2F2963] text-white h-fit ">
          <h4 className="text-lg ">Contact</h4>
          <a
            href={`mailto:${user.email}`}
            className="text-[#57CC99] block my-2"
          >
            {user.email}
          </a>
          {user.phone && (
            <a href={`tel:${user.phone}`} className="text-[#57CC99] block my-2">
              {user.phone}
            </a>
          )}
        </Card>
      </div>
      {user.role !== "admin" && <LastApplications user={user} />}
      {editable && (
        <div className="w-full flex items-end justify-end mt-32">
          <span
            className="underline cursor-pointer block w-fit"
            onClick={logout}
          >
            Logout
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileTemplate;
