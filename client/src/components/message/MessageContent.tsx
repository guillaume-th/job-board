import { FC, FormEvent, useRef, useState } from "react";
import { JobApplication } from "../../types/jobApplication";
import { ErrorMessage, Spinner, TextArea } from "../ui/atoms";
import { Button } from "../ui/atoms";
import { Message } from "../../types/message";
import { useMutation } from "../../hooks/useMutation";
import { User } from "../../types/user";
import { get } from "../../helpers/storage";
import { useQuery } from "../../hooks/useQuery";

type Props = { data: JobApplication };
type Body = {
  author_id: number;
  job_application_id: number;
  content: string;
};
const MessageContent: FC<Props> = ({ data }) => {
  const currentUser = get<User>("user");
  const submit = useMutation<Body, Message>("api/message/");
  const change = useMutation<Object, Message>(
    "api/applications/" + data.id,
    "PUT"
  );
  const { data: newData, refetch } = useQuery<JobApplication>(
    "api/applications/" + data.id
  );
  const [error, setError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    const currentUser = get<User>("user");
    e.preventDefault();
    let body: Body = {
      author_id: currentUser?.id!,
      job_application_id: data.id,
      content: formRef?.current?.content.value,
    };
    const { data: dataResponse, error } = await submit(body);
    if (error) {
      setError(true);
    } else if (dataResponse) {
      refetch();
      setError(false);
    }
  };
  const changeState = async (newState: string) => {
    let body: Object = {
      state: newState,
    };
    const { data: dataResponse, error } = await change(body);
    if (error) {
      setError(true);
    } else if (dataResponse) {
      refetch();
      setError(false);
    }
  };

  if (!newData) {
    return <Spinner />;
  }

  return (
    <div className="w-screen flex flex-column">
      <div className="box-content w-5/6 min-h-fit h-fullscreen m-4 p-4 shadow-md rounded-md">
        <h1 className="items-center justify-center">
          {newData.advertisement.name.toUpperCase()}
        </h1>
        <span className="text-gray-400 italic">
          {newData.advertisement?.contract_type?.replace("_", " ")}
        </span>
        <span> - </span>
        <span className="text-gray-400 italic">
          {newData.advertisement.place}
        </span>
        <hr />
        <p>Actually : {newData.state}</p>
        {["recruiter", "admin"].includes(currentUser?.role ?? "") && (
          <div>
            <Button
              text="processing"
              onClick={() => changeState("processing")}
            />
            <Button text="refused" onClick={() => changeState("refused")} />
            <Button text="accepted" onClick={() => changeState("accepted")} />
          </div>
        )}
        <br />
        <h2 className="italic">
          Posted by {newData.advertisement.recruiter.firstname}{" "}
          {newData.advertisement.recruiter.lastname}
        </h2>
        <br />
        <h2>Company {newData.advertisement.company.name}</h2>
        <br />
        <h2>Description du Poste</h2>
        <br />
        <p>{newData.advertisement.description}</p>
        <br />
        <h2>Your disscution</h2>
        {newData.messages.map(function (item, i) {
          return (
            <div
              key={item.id}
              className="box-content w-4/6 min-h-1/6 m-4  p-4 shadow-md rounded-md"
            >
              <p>By {item.author.firstname}</p>
              {item.content}
            </div>
          );
        })}
        <br />
        {currentUser && (
          <form onSubmit={handleSubmit} ref={formRef}>
            <TextArea label="Message" name="content"></TextArea>
            <Button text="Envoi" type="submit"></Button>
          </form>
        )}
        {error && <ErrorMessage />}
      </div>
    </div>
  );
};

export default MessageContent;
