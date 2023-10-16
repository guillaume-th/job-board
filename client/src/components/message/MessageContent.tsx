import { FC } from "react";
import { JobApplication } from "../../types/jobApplication";
import { TextArea } from "../ui/atoms";

type Props = { data: JobApplication };

const MessageContent: FC<Props> = ({ data }) => {
  return (
    <div className="w-screen h-screen flex flex-column">
      <div className="box-content w-5/6 m-4 p-4 shadow-md rounded-md">
        <h1 className="items-center justify-center">
          {data.advertisement.name.toUpperCase()}
        </h1>
        <span className="text-gray-400 italic">
          {data.advertisement.contract_type.replace("_", " ")}
        </span>
        <span> - </span>
        <span className="text-gray-400 italic">{data.advertisement.place}</span>
        <hr />
        <br />
        <h2 className="italic">
          Posted by {data.advertisement.recruiter.firstname}{" "}
          {data.advertisement.recruiter.lastname}
        </h2>
        <br />
        <h2>Company {data.advertisement.company.name}</h2>
        <br />
        <h2>Description du Poste</h2>
        <br />
        <p>{data.advertisement.description}</p>
        <br />
        <h2>Vos message avec {data.advertisement.recruiter.firstname}</h2>

        {data.messages.map(function (item, i) {
          return (
            <p
              key={i}
              className="box-content w-4/6 min-h-1/6 m-4  p-4 shadow-md rounded-md"
            >
              <p>By {item.author.firstname}</p>
              {item.content}
            </p>
          );
        })}
        <br />
        <TextArea label="Message"></TextArea>
      </div>
    </div>
  );
};

export default MessageContent;
