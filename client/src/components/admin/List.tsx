import { useNavigate } from "react-router-dom";
import { capitalize } from "../../helpers/format";
import { Button } from "../ui/atoms";
import { deleteResource } from "../../helpers/delete";

type Props<T> = {
  data: T;
  columns?: string[];
  resource: string;
  refetch: () => void;
};

const List = <T extends {}[]>({
  data,
  columns,
  resource,
  refetch,
}: Props<T>) => {
  const navigate = useNavigate();
  if (!data.length) {
    return <p>No data yet...</p>;
  }
  const cols = columns ?? Object.keys(data[0]);
  const rows = data.map((row) =>
    cols.reduce((acc, col) => {
      return [...acc, row[col as keyof typeof row]];
    }, [])
  );

  const cellWidth = (1 / cols.length) * 100;
  const cellStyle = { width: `${cellWidth}%` };
  const thClass =
    "p-4 border-2 border-[#57CC99] text-ellipsis overflow-hidden ... whitespace-nowrap";
  const tdClass =
    "text-[#2F2963] p-4 border-2 border-[#57CC99] text-ellipsis overflow-hidden ... whitespace-nowrap";

  const edit = (index: number) => {
    navigate(`/${resource}/${(data[index] as { id: string }).id}/edit`);
  };

  const del = async (index: number) => {
    const id = (data[index] as { id: string }).id;
    await deleteResource(resource, id);
    refetch();
  };
  return (
    <table className="rounded shadow-lg my-4 border-2 border-[#57CC99] w-full overflow-scroll table-fixed	">
      <thead className="text-[#57CC99] text-lg">
        <tr className="w-full">
          {cols.map((name) => (
            <th className={thClass} style={cellStyle}>
              {capitalize(name)}
            </th>
          ))}
          <th className={thClass} style={cellStyle}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr className="w-full">
            {row.map((value) => (
              <td className={tdClass} style={cellStyle}>
                {String(value)}
              </td>
            ))}
            <td className={tdClass} style={cellStyle}>
              <div className="flex justify-center gap-2">
                <Button
                  text="Edit"
                  onClick={() => edit(i)}
                  className="block scale-85 px-3"
                />
                <Button
                  text="Delete"
                  className="block scale-85 px-3"
                  onClick={() => del(i)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
