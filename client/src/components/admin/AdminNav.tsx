import { FC } from "react";
import { adminConfig } from "../../adminConfig";
import { Link } from "react-router-dom";
import { capitalize } from "../../helpers/format";

type Props = { resource: string; action: string };

const AdminNav: FC<Props> = ({ resource, action }) => {
  const resources = Object.keys(adminConfig);

  return (
    <nav className="rounded shadow-md w-fit py-6 px-10 mt-6">
      <ul>
        {resources.map((name) => (
          <li className="mb-2" key={name}>
            <Link to={`/${name}`}>{capitalize(name)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNav;
