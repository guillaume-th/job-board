import { FC } from "react";
import AvatarIcon from "./ui/icons/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../types/user";
import { get } from "../helpers/storage";

const Header: FC = () => {
  const navigate = useNavigate();
  const currentUser = get<User>("user");
  const linkClassName =
    "cursor-pointer text-lg hover:scale-105 hover:text-[#57CC99] ease-in-out";

  return (
    <header className="bg-[#2F2963] text-white py-4 px-6 flex items-center justify-between">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => {
          navigate("/board");
        }}
      >
        <img src="/logo2.png" alt="job-board" className="h-16" />
        <p className="text-2xl text-[#57CC99] font-bold mx-2">JOB BOARD</p>
      </div>
      <div className="flex gap-6 items-center">
        {currentUser?.role === "admin" && (
          <Link className={linkClassName} to="/advertisements">
            Admin
          </Link>
        )}
        <Link className={linkClassName} to="/board">
          Jobs
        </Link>
        <AvatarIcon
          fill="#DED9E2"
          height="35px"
          width="35px"
          onClick={() => {
            navigate("/profile/me");
          }}
        />
      </div>
    </header>
  );
};

export default Header;
