import { FC } from "react";
import ApplicationContainer from "../components/applicationlist/ApplicationListContainer";

const ApplicationList: FC = () => {
  return (
    <div className="grid grid-cols-12 h-full overflow-x-hidden">
      <div className="col-span-8">
        <ApplicationContainer />
      </div>
    </div>
  );
};

export default ApplicationList;
