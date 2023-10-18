import { FC } from "react";

type Props = {
  state: string;
};

const config: Record<string, string> = {
  sent: "black",
  processing: "#2F2963",
  accepted: "#d9f99d",
  refused: "#fca5a5",
};

const ApplicationState: FC<Props> = ({ state }) => {
  return <div style={{ color: config[state] ?? "#57CC99" }}>{state}</div>;
};

export default ApplicationState;
