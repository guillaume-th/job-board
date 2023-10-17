import { Dispatch, FC, SetStateAction } from "react";
import DropdownContainer from "../DropdownContainer";
import { TextArea, Input } from "../ui/atoms";
import { Chips } from "../ui/organisms";
import { capitalize } from "../../helpers/format";
import { InputProps } from "../ui/atoms/Input";
import SpecialDynamicInput from "./SpecialDynamicInput";

const nameToLabel = (name: string) => {
  return capitalize(name.replace("_", " "));
};

type Props = Partial<InputProps> & {
  dropdown?: string;
  setDropdownValues: Dispatch<SetStateAction<Record<string, unknown[]>>>;
  dropdownValues: Record<string, unknown[]>;
  fields?: string[];
  special?: string;
  k?: string;
  labelK?: string;
  resource?: string;
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
  special,
  k,
  labelK,
  resource,
  hidden,
}) => {
  const props = {
    name,
    label: label ?? nameToLabel(name || ""),
    type: type ?? "text",
    placeholder,
    value,
    defaultValue: name === "password" ? "" : defaultValue,
  };

  if (special) {
    return (
      <SpecialDynamicInput
        {...props}
        special={special}
        k={k}
        labelK={labelK}
        resource={resource}
        hidden={hidden}
      />
    );
  }

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

    const handleRemoveValue = (id: string | number) => {
      const index = (dropdownValues[dropdown] as { id: string }[]).findIndex(
        (el) => el.id === id
      );

      if (index !== -1) {
        const newValues = { ...dropdownValues };
        newValues[dropdown].splice(index, 1);
        setDropdownValues(newValues);
      }
    };

    const rawValues =
      (dropdownValues[dropdown] as Record<string, string>[]) || [];

    const chipsData = rawValues.map(({ color, id, ...values }) => {
      if (name === "users") {
        return {
          name: `${values?.firstname} ${values.lastname}`,
          color,
          id,
        };
      }
      return { name: values.name, color, id };
    });

    return (
      <>
        <DropdownContainer
          resource={dropdown}
          label={nameToLabel(name!)}
          placeholder={placeholder}
          onAddValue={handleAddValue}
        />
        <Chips data={chipsData} onDelete={handleRemoveValue} />
      </>
    );
  }

  return <Input {...props} />;
};

export default DynamicInput;
