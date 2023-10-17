/* eslint-disable no-eval */
import { FC, useState } from "react";
import { get } from "../../helpers/storage";
import { User } from "../../types/user";
import DropdownContainer, { DropdownElement } from "../DropdownContainer";
import { Input } from "../ui/atoms";
import { InputProps } from "../ui/atoms/Input";

type Props = Pick<
  InputProps,
  "name" | "label" | "type" | "placeholder" | "value" | "defaultValue"
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

  console.log(special, resource, labelK, k);
  if (special === "prefill-admin" && resource && labelK && k) {
    console.log("in", resource);

    if (currentUser.role !== "admin" && !specialInput.value) {
      setSpecialInput({
        label: eval(labelK),
        value: eval(k),
      });
    }

    const handleAddValue = (element: DropdownElement) => {
      setSpecialInput({
        value: String(element.id),
        label: element?.name as string,
      });
    };
    return (
      <>
        <p className="p-4">
          Selected {props.label}:{" "}
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
          value={specialInput.value}
          wrapperClassName="hidden"
          hidden
          required
        />
      </>
    );
  }

  if (special === "prefill" && k) {
    return (
      <Input
        {...props}
        value={String(currentUser[k as keyof User])}
        wrapperClassName="hidden"
        hidden
        required
      />
    );
  }

  return null;
};

export default SpecialDynamicInput;
