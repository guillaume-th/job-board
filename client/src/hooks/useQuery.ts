import { useState } from "react";

export const useQuery = <T extends {}>(url: string) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();

  if (!data) {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res?.error) {
          setError(res.message);
        } else {
          setData(res);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return { data, error };
};
