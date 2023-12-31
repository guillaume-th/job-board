import { FC } from "react";
import AdminForm from "./DynamicFormPage";
import { useQuery } from "../hooks/useQuery";
import { useParams } from "react-router-dom";
import { adminConfig } from "../adminConfig";
import { ErrorMessage, Spinner } from "../components/ui/atoms";

type Props = {};

const AdminEditContainer: FC<Props> = () => {
  const { resource, id } = useParams();
  const endpoint = Object.keys(adminConfig).includes(resource ?? "")
    ? `api/${resource}/${id}`
    : "forbidden";
  const { data, error } = useQuery<Record<string, string>>(endpoint);
  const config = adminConfig[resource ?? ""];

  if (!config) {
    return (
      <ErrorMessage text="Resource not supported, please try another URL" />
    );
  }

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
    return <AdminForm defaultValues={data} />;
  }

  return <ErrorMessage />;
};

export default AdminEditContainer;
