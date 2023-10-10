import { FC, useState } from "react";

import { LoginForm, RegisterForm } from "../components/auth";

const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="grid grid-cols-12 h-screen place-items-center">
      <div className="bg-[#2F2963] col-span-7 flex flex-col justify-center items-center h-full">
        <img src="/logo.png" alt="job-board" className="w-9/12" />
        <p className="w-full text-center text-[#DED9E2] p-3 text-xl">
          The one place to find the next big step of your professional life.
        </p>
      </div>
      {isLogin ? (
        <LoginForm
          className="col-span-5 w-7/12"
          onSwitchForm={() => setIsLogin(false)}
        />
      ) : (
        <RegisterForm
          className="col-span-5 w-7/12"
          onSwitchForm={() => setIsLogin(true)}
        />
      )}
    </div>
  );
};

export default Auth;
