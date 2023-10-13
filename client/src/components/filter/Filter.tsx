import { FC, useRef, FormEvent, Dispatch, SetStateAction } from "react";
import { Button, Input } from "../ui/atoms";

type Props = {
  onLocationChange: Dispatch<SetStateAction<string | undefined>>;
};

const Filter: FC<Props> = ({ onLocationChange }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const queryString = new URLSearchParams(
      new FormData(formRef?.current ?? undefined) as unknown as Record<
        string,
        string
      >
    ).toString();

    onLocationChange(queryString);
  };

  return (
    <div className="box-content w-4/6 min-h-1/6 m-4  p-4 shadow-md rounded-md">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <Input type="text" label="Title" name="name" />
          <Input type="text" label="Place" name="place" />
          <Input type="number" label="Salary" name="salary" />
          <Input type="number" label="Working Time" name="working_time" />
          <div className="flex flex-col justify-center">
            <label htmlFor="contract_type" className="block m-2">
              <span className="block m-2">Contract Type</span>
              <select
                name="contract_type"
                className="block m-2 p-2 w-full text-[#2F2963] border-solid border-2 rounded"
              >
                <option value="permanent_contract">Permanent Contract</option>
                <option value="temporary_contract">Temporary Contract</option>
                <option value="internship">Internship</option>
                <option value="apprenticeship">Apprenticeship</option>
              </select>
            </label>
          </div>
        </div>
        <br />
        <div className="flex justify-center">
          <Button text="Filter" name="submit" type="submit"></Button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
