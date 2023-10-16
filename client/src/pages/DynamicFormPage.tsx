import { FC, FormEvent, useRef, useState } from "react";
import { useMutation } from "../hooks/useMutation";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ErrorMessage } from "../components/ui/atoms";
import { get } from "../helpers/storage";
import { User } from "../types/user";
import { Field, adminConfig } from "../adminConfig";
import DynamicInput from "../components/admin/DynamicInput";
import AdminNav from "../components/admin/AdminNav";

const getDefaultDropdownValues = (
  fields: Field[],
  defaultValues: Record<string, string>
) =>
  fields.reduce(
    (acc, { name = "", dropdown }) =>
      dropdown ? { ...acc, [name]: defaultValues?.[name] } : acc,
    {}
  ) as DropdownValue;

type DropdownValue = Record<string, unknown[]>;

type Props = { defaultValues?: Record<string, string> };

const AdminForm: FC<Props> = ({ defaultValues }) => {
  const isEdit = !!defaultValues;
  const { resource } = useParams();
  const endpoint = Object.keys(adminConfig).includes(resource ?? "")
    ? `api/${resource}/${defaultValues?.id ?? ""}`
    : "forbidden";
  const submit = useMutation<Record<string, unknown>, Record<string, unknown>>(
    endpoint,
    isEdit ? "PUT" : "POST"
  );
  const config = adminConfig[resource ?? ""];
  const [error, setError] = useState<string>();
  const [dropdownValues, setDropdownValues] = useState<DropdownValue>(
    getDefaultDropdownValues(config.fields, defaultValues ?? {})
  );
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const currentUser = get<User>("user");

  if (!config.auth.includes(currentUser?.role)) {
    return (
      <div className="flex w-full justify-center items-center m-4">
        <ErrorMessage text="You don't have enough rights to access this resource" />
      </div>
    );
  }

  if (!config) {
    return (
      <ErrorMessage text="Resource not supported, please try another URL" />
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    setError(undefined);

    e.preventDefault();
    const body = Object.fromEntries(
      new FormData(formRef?.current ?? undefined)
    ) as Record<string, unknown>;

    // Add dropdown values to body
    Object.entries(dropdownValues).forEach(([key, value]) => {
      body[key] = (value as { id: string }[]).map(({ id }) => Number(id));
    });

    const { data, error, message } = await submit(body);

    if (error) {
      setError(message ?? "Something went wrong. Please contact an admin.");
    } else if (data) {
      onBack();
    }
  };

  const onBack = () => {
    navigate(`/${resource}`);
  };

  return (
    <div className="w-full grid grid-cols-12 p-8">
      <div className="col-span-2">
        <AdminNav resource={resource!} action="new" />
      </div>
      <div className="col-span-10 px-10">
        <div className="w-full my-4">
          <Button onClick={onBack} text="Back to list" />
        </div>
        <h1 className="text-xl my-8 font-semibold text-[#57CC99]">
          {isEdit ? "Edit" : "New"} {config.title}
        </h1>
        <div className="mb-12">
          <form
            className={`flex flex-col justify-center w-full`}
            ref={formRef}
            onSubmit={handleSubmit}
          >
            {config?.fields.map((props) => (
              <DynamicInput
                {...props}
                dropdownValues={dropdownValues}
                setDropdownValues={setDropdownValues}
                defaultValue={defaultValues?.[props.name || ""]}
              />
            ))}

            <div className="flex w-full justify-end my-4">
              <Button type="submit" text="Save" />
            </div>
            {error && <ErrorMessage text={error} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
