/* eslint-disable no-eval */
import { FC, useState } from "react";
import { get } from "../../helpers/storage";
import { User } from "../../types/user";
import DropdownContainer, { DropdownElement } from "../DropdownContainer";
import { Input } from "../ui/atoms";
import { InputProps } from "../ui/atoms/Input";
import { useSearchParams } from "react-router-dom";

type Props = Pick<
  InputProps,
  | "name"
  | "label"
  | "type"
  | "placeholder"
  | "value"
  | "defaultValue"
  | "hidden"
> & { special: string; k?: string; resource?: string; labelK?: string };

const SpecialDynamicInput: FC<Props> = ({
  special,
  k,
  labelK,
  resource,
  ...props
}) => {
  const currentUser = get<User>("user");
  const [specialInput, setSpecialInput] = useState<{
    label?: string;
    value?: string;
  }>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams] = useSearchParams();

  if (special === "prefill-admin" && resource && labelK && k) {
    if (currentUser.role !== "admin" && !specialInput.value) {
      setSpecialInput({
        label: eval(labelK),
        value: eval(k),
      });
    }

    const handleAddValue = (element: DropdownElement) => {
      setSpecialInput({
        value: String(element.id),
        label: (element?.name ?? element?.email) as string,
      });
    };

    return (
      <>
        <p className="p-4">
          Selected {props.label.toLowerCase()}:{" "}
          <span className="font-semibold">{specialInput.label ?? "None"}</span>
        </p>
        {currentUser?.role === "admin" && (
          <DropdownContainer
            resource={resource}
            label={`Select a ${props.label.toLowerCase()}`}
            placeholder={props.placeholder}
            onAddValue={handleAddValue}
          />
        )}
        <Input
          {...props}
          defaultValue={specialInput.value}
          wrapperClassName={props.hidden ? "hidden" : undefined}
          hidden={props.hidden}
        />
      </>
    );
  }

  if (special === "prefill" && k) {
    return (
      <Input
        {...props}
        defaultValue={eval(k)}
        wrapperClassName={props.hidden ? "hidden" : undefined}
        hidden={props.hidden}
      />
    );
  }

  return null;
};

export default SpecialDynamicInput;
