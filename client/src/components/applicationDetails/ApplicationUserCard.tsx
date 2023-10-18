import { FC, useState } from "react";
import { User } from "../../types/user";
import { capitalize } from "../../helpers/format";
import { Button, ErrorMessage } from "../ui/atoms";
import ApplicationState from "../ui/atoms/ApplicationState";
import { get } from "../../helpers/storage";
import { useMutation } from "../../hooks/useMutation";
import { Message } from "../../types/message";
import { JobApplication } from "../../types/jobApplication";

type Props = {
  application: JobApplication;
  refetch: () => void;
};

const ApplicationUserCard: FC<Props> = ({ application, refetch }) => {
  const currentUser = get<User>("user");
  const updateState = useMutation<Object, Message>(
    "api/applications/" + application.id,
    "PUT"
  );
  const [error, setError] = useState(false);

  const changeState = async (newState: string) => {
    setError(false);
    let body: Object = {
      state: newState,
    };
    const { data: dataResponse, error } = await updateState(body);
    if (error) {
      setError(true);
    } else if (dataResponse) {
      refetch();
    }
  };

  return (
    <div className=" w-full m-4 p-4 shadow-md rounded-md">
      <div className="flex justify-between">
        <h1 className="items-center justify-center text-[#57CC99] font-bold text-xl">
          {capitalize(application.candidate_name)}'s application
        </h1>
        <ApplicationState state={application.state} />
      </div>
      <p className="my-2">
        Join by email at{" "}
        <a
          href={`mailto:${application.candidate_email}`}
          className="font-semibold text-[#57CC99]"
        >
          {application.candidate_email}
        </a>
      </p>
      <p className="my-2">
        By phone at{" "}
        <a
          href={`tel:${application.candidate_phone}`}
          className="font-semibold text-[#57CC99]"
        >
          {application.candidate_phone}
        </a>{" "}
      </p>
      <div className="border-2 border-[#2F2963] p-2">
        <p className="text-[#2F2963]">Update application status: </p>
        {["recruiter", "admin"].includes(currentUser?.role ?? "") && (
          <div className="flex gap-2 my-4">
            <Button
              text="processing"
              onClick={() => changeState("processing")}
            />
            <Button text="refused" onClick={() => changeState("refused")} />
            <Button text="accepted" onClick={() => changeState("accepted")} />
          </div>
        )}
      </div>
      {error && <ErrorMessage />}
    </div>
  );
};

export default ApplicationUserCard;
