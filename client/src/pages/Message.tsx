import { FC } from "react";
import MessageContainer from "../components/message/MessageContainer";

const Message: FC = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <MessageContainer />
    </div>
  );
};

export default Message;
