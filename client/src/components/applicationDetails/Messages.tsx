import { FC, FormEvent, useRef, useState } from "react";
import { get } from "../../helpers/storage";
import { User } from "../../types/user";
import { TextArea, Button, ErrorMessage } from "../ui/atoms";
import { useMutation } from "../../hooks/useMutation";
import { Message } from "../../types/message";

type Body = {
  author_id: number;
  job_application_id: number;
  content: string;
};

type Props = {
  data: Message[];
  refetch: () => void;
  applicationId: number;
};

const Messages: FC<Props> = ({ data, refetch, applicationId }) => {
  const currentUser = get<User>("user");
  const submit = useMutation<Body, Message>("api/message/");
  const [error, setError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    setError(false);
    const currentUser = get<User>("user");
    e.preventDefault();
    let body: Body = {
      author_id: currentUser?.id!,
      job_application_id: applicationId,
      content: formRef?.current?.content.value,
    };
    const { data: dataResponse, error } = await submit(body);
    if (error) {
      setError(true);
    } else if (dataResponse) {
      refetch();
    }
  };

  return (
    <div>
      {data.map((item, i) => (
        <div
          key={item.id}
          className="box-content w-4/6 min-h-1/6 m-4  p-4 shadow-md rounded-md"
        >
          <p>By {item.author.firstname}</p>
          {item.content}
        </div>
      ))}
      <br />
      {currentUser && (
        <form onSubmit={handleSubmit} ref={formRef}>
          <TextArea label="Message" name="content"></TextArea>
          <Button text="Envoi" type="submit"></Button>
        </form>
      )}
      {error && <ErrorMessage />}
    </div>
  );
};

export default Messages;
