import { FC, ReactNode } from "react";
import Header from "./Header";

type Props = { children: ReactNode };

const Wrapper: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Wrapper;
