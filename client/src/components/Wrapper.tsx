import { FC, ReactNode } from "react";
import Header from "./Header";

type Props = { children: ReactNode };

const Wrapper: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <ul className="flex gap-2"></ul>
      {children}
    </>
  );
};

export default Wrapper;
