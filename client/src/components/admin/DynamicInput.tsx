import { Dispatch, FC, SetStateAction } from "react";
import DropdownContainer from "../DropdownContainer";
import { TextArea, Input } from "../ui/atoms";
import { Chips } from "../ui/organisms";
import { capitalize } from "../../helpers/format";
import { InputProps } from "../ui/atoms/Input";

const nameToLabel = (name: string) => {
  return capitalize(name.replace("_", " "));
};

type Props = Partial<InputProps> & {
  dropdown?: string;
  setDropdownValues: Dispatch<SetStateAction<Record<string, unknown[]>>>;
  dropdownValues: Record<string, unknown[]>;
  fields?: string[];
};

const DynamicInput: FC<Props> = ({
  name,
  type,
  placeholder,
  dropdown,
  setDropdownValues,
  dropdownValues,
  label,
  value,
  fields,
  defaultValue,
}) => {
  const props = {
    name,
    label: label ?? nameToLabel(name || ""),
    type: type ?? "text",
    placeholder,
    value,
    defaultValue: name === "password" ? "" : defaultValue,
  };

  if (name === "description") {
    return <TextArea {...props} />;
  }

  if (type === "radio" && fields) {
    return (
      <div className="flex items-center gap-8 m-2">
        <p className="m-2">{props.label}</p>
        <div className="flex justify-evenly">
          {fields?.map((value) => (
            <Input
              type="radio"
              value={value}
              name={name}
              label={nameToLabel(value)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (dropdown) {
    const handleAddValue = (element: unknown) => {
      setDropdownValues((prev) => ({
        ...prev,
        [dropdown]: prev[dropdown] ? [...prev[dropdown], element] : [element],
      }));
    };

    const rawValues = [
      ...((defaultValue as unknown as Record<string, string>[]) || []),
      ...((dropdownValues[dropdown] as Record<string, string>[]) || []),
    ];

    const chipsData = rawValues.map((values) => {
      if (name === "users") {
        return {
          name: `${values?.firstname} ${values.lastname}`,
          color: values?.color,
        };
      }
      return { name: values.name, color: values?.color };
    });

    return (
      <>
        <DropdownContainer
          resource={dropdown}
          label={nameToLabel(name!)}
          placeholder={placeholder}
          onAddValue={handleAddValue}
        />
        <Chips data={chipsData} />
      </>
    );
  }

  return <Input {...props} />;
};

export default DynamicInput;
