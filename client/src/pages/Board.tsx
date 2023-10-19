import { FC, useState } from "react";
import BoardContainer from "../components/board/BoardContainer";
import Filter from "../components/filter/Filter";

const Board: FC = () => {
  const [location, setLocation] = useState<string>();
  if (location) {
    window.history.replaceState(
      null,
      "",
      "http://localhost:3000/board?" + location
    );
  }

  return (
    <div className="grid grid-cols-12 h-full w-full p-8">
      <div className="col-span-3">
        <Filter onLocationChange={setLocation} />
      </div>
      <div className="col-span-9">
        <BoardContainer query={location ?? ""} />
      </div>
    </div>
  );
};

export default Board;
