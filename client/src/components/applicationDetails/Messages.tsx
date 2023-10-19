import { FC, FormEvent, useLayoutEffect, useRef, useState } from "react";
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [data]);

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
      if (textAreaRef.current) {
        textAreaRef.current.value = "";
      }
      refetch();
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-xl mb-4 text-[#2F2963]">Exchanges</h3>
      <hr className="h-2 bg-[#57CC99] w-full block my-4" />

      {data.length ? (
        <div className="border-2 border-#57CC99 bg-[#DED9E2]/20 ml-4 max-h-[55vh] overflow-y-scroll py-4 scroll-smooth">
          {data.map((message, i) => (
            <div
              className="flex"
              style={{
                justifyContent:
                  message?.author?.id === currentUser?.id
                    ? "flex-end"
                    : "flex-start",
              }}
              ref={i === data.length - 1 ? lastMessageRef : null}
            >
              <div
                key={message.id}
                className="w-3/6 min-h-1/6 m-2 p-4 shadow-md bg-white"
              >
                <div className=" mb-1">
                  <p className="font-semibold text-[#57CC99]">
                    {message?.author?.firstname ?? "Anonymous"}
                  </p>
                  <p className="text-xs text-[#DED9E2]">
                    {new Date(message.created_at).toUTCString()}
                  </p>
                </div>
                <p className="break-words w-full">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <br />
      {currentUser && (
        <form onSubmit={handleSubmit} ref={formRef}>
          <TextArea
            label="Message"
            name="content"
            placeholder="Your message goes here..."
            ref={textAreaRef}
          ></TextArea>
          <div className="flex w-full justify-end">
            <Button text="Send" type="submit"></Button>
          </div>
        </form>
      )}
      {error && <ErrorMessage />}
    </div>
  );
};

export default Messages;
