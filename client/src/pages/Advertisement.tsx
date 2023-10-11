import { FC } from "react";
import AdvertisementContainer from "../components/advertisement/AdvertisementContainer";

const Advertisement: FC = () => {

  return (
    <div className="grid grid-cols-12 h-screen">
      <AdvertisementContainer />
    </div>
  );
};

export default Advertisement;
