import { FC } from "react";
import { User } from "../../../types/user";

type Props = {
  user?: User;
};

const ProfileTemplate: FC<Props> = ({ user }) => {
  return <div></div>;
};

export default ProfileTemplate;
