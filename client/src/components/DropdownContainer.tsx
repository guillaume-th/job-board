import { FC } from "react";
import Dropdown from "./Dropdown";
import { useQuery } from "../hooks/useQuery";
import { ErrorMessage, Spinner } from "./ui/atoms";

type Data = {
  name: string;
  id: number;
};

export type DropdownElement = { id: number } & Record<string, unknown>;

type Props = {
  resource: string;
  label: string;
  placeholder?: string;
  onAddValue: (element: DropdownElement) => void;
};

const FullAutoComplete: FC<Props> = ({
  resource,
  label,
  placeholder,
  onAddValue,
}) => {
  const { data, error } = useQuery<Record<string, unknown>[]>(
    `api/${resource}`
  );

  if (!data && !error) {
    return (
      <div className="flex items-center justify-center w-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    console.warn(error);
    return <ErrorMessage />;
  }

  if (data) {
    const simpleData = data.map(({ id, ...rest }) => {
      if (resource === "users") {
        return { id, name: `${rest.firstname} ${rest.lastname}` };
      }

      return { id, name: rest.name };
    }) as unknown as Data[];

    const handleSelect = (id: number) => {
      const element = data.find((x) => x.id === id);
      if (element) onAddValue(element as DropdownElement);
    };

    return (
      <Dropdown
        elements={simpleData}
        onSelectValue={handleSelect}
        label={label}
        placeholder={placeholder}
      />
    );
  }

  return null;
};

export default FullAutoComplete;
