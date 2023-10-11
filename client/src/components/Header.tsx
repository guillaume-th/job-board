import { FC } from "react";
import AvatarIcon from "./ui/icons/Avatar";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();

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
      <AvatarIcon
        fill="#DED9E2"
        height="35px"
        width="35px"
        onClick={() => {
          navigate("/profile/me");
        }}
      />
    </header>
  );
};

export default Header;
