import { FC, useState } from "react";
import { get } from "../../helpers/storage";
import { User } from "../../types/user";
import DropdownContainer, { DropdownElement } from "../DropdownContainer";
import { Input } from "../ui/atoms";
import { InputProps } from "../ui/atoms/Input";

type Props = Pick<
  InputProps,
  "name" | "label" | "type" | "placeholder" | "value" | "defaultValue"
> & { special: string; k?: string };

const SpecialDynamicInput: FC<Props> = ({ special, k, ...props }) => {
  const currentUser = get<User>("user");
  const [specialInput, setSpecialInput] = useState<{
    label?: string;
    value?: string;
  }>({});

  if (currentUser.role === "recruiter" && !specialInput.value) {
    setSpecialInput({
      label: currentUser.company.name,
      value: String(currentUser.company.id),
    });
  }

  const handleAddValue = (element: DropdownElement) => {
    setSpecialInput({
      value: String(element.id),
      label: element?.name as string,
    });
  };

  if (special === "ad-company") {
    return (
      <>
        <p className="p-4">
          Selected company:{" "}
          <span className="font-semibold">{specialInput.label ?? "None"}</span>
        </p>
        {currentUser?.role === "admin" && (
          <DropdownContainer
            resource="companies"
            label="Select a company"
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
