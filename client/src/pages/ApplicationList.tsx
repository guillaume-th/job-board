import { FC } from "react";
import ApplicationContainer from "../components/applicationlist/ApplicationListContainer";

const ApplicationList: FC = () => {
  return (
    <div className="h-full w-full">
      <ApplicationContainer />
    </div>
  );
};

export default ApplicationList;
