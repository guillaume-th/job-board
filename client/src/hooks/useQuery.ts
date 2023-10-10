import { useState } from "react";

type Method = "GET" | "DELETE";

export const useQuery = <T extends {}>(url: string, method: Method = "GET") => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!data) {
    fetch(url, { method })
      .then((res) => res.json())
      .then((res) => {
        if (res?.error) {
          setError(res.message);
        } else {
          setData(res?.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return { data, error };
};
