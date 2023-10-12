import { FC } from "react";
import { User } from "../../types/user";
import { Input, TextArea } from "../ui/atoms";

type Props = {
  user: User;
};

const ProfileTemplate: FC<Props> = ({ user }) => {
  return (
    <div className="w-6/12 flex m-10 flex-col">
      <form>
        <Input
          label="First name"
          defaultValue={user.firstname}
          name="firstname"
        />
        <Input label="Last name" defaultValue={user.lastname} name="lastname" />
        <Input label="Username" defaultValue={user.username} name="username" />
        <TextArea
          label="Description"
          defaultValue={user.description}
          name="description"
        />
        <Input label="Phone number" defaultValue={user.phone} name="phone" />
      </form>
    </div>
  );
};

export default ProfileTemplate;
