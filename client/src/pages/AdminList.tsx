import { useQuery } from "../hooks/useQuery";
import { Button, ErrorMessage, Spinner } from "../components/ui/atoms";
import { get } from "../helpers/storage";
import { User } from "../types/user";
import List from "../components/admin/List";
import { useNavigate, useParams } from "react-router-dom";
import { FC } from "react";
import { adminConfig } from "../adminConfig";
import { capitalize } from "../helpers/format";
import AdminNav from "../components/admin/AdminNav";

const AdminList: FC = () => {
  const currentUser = get<User>("user");
  const { resource } = useParams();
  const params = adminConfig[resource || ""] ?? null;
  const { data, error, refetch } = useQuery<Record<string, unknown>[]>(
    `api/${params ? resource : "forbidden"}`
  );
  const navigate = useNavigate();

  if (currentUser?.role !== "admin") {
    return (
      <div className="flex w-full justify-center items-center m-4">
        <ErrorMessage text="You don't have enough rights to access this resource" />
      </div>
    );
  }

  if (!params) {
    return <ErrorMessage text="Invalid resource. Please try another URL" />;
  }

  if (!data || !error) {
    <div className="flex items-center justify-center w-full">
      return <Spinner />
    </div>;
  }

  if (error) {
    return <ErrorMessage text={error} />;
  }

  const onCreateClick = () => {
    navigate(`/${resource}/create`);
  };

  if (data) {
    return (
      <div className="w-full grid grid-cols-12 p-8">
        <div className="col-span-2">
          <AdminNav resource={resource!} action="list" />
        </div>
        <div className="col-span-10">
          <h1 className="text-xl my-8 font-semibold text-[#57CC99]">
            {capitalize(resource!)}
          </h1>
          <div>
            <div className="w-full flex justify-end">
              <Button onClick={onCreateClick} text="New" />
            </div>
            <List
              {...params}
              data={data!}
              resource={resource!}
              refetch={refetch}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AdminList;
