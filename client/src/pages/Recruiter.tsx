import { FC } from "react";
import RecruiterContainer from "../components/recruiterAdvertisement/RecruiterAdvertisement";
const Recruiter: FC = () => {
  return (
    <div className="grid grid-cols-12 h-full overflow-x-hidden">
      <div className="col-span-8">
        <RecruiterContainer />
      </div>
    </div>
  );
};

export default Recruiter;
