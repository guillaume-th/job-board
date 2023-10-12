import { FC } from "react";
import Dropdown from "./Dropdown";
import { useQuery } from "../hooks/useQuery";
import { ErrorMessage, Spinner } from "./ui/atoms";

type Data = {
  name: string;
  id: number;
};

type Props = {
  resource: string;
  label: string;
  placeholder?: string;
  onAddValue: (element: unknown) => void;
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

  if (!data || !error) {
    <div className="flex items-center justify-center w-full">
      return <Spinner />
    </div>;
  }

  if (error) {
    return <ErrorMessage text={error} />;
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
      onAddValue(element);
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
