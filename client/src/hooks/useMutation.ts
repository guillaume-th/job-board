type MutationResponse<T> =
  | {
      error: boolean;
      message: string;
    }
  | { error: boolean; data: T };

type Method = "POST" | "PUT";

export const useMutation = <TBody extends {}>(
  url: string,
  method: Method = "POST"
) => {
  const fetchFn = async (body: TBody): Promise<MutationResponse<TBody>> => {
    const raw_response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const response = await raw_response.json();

    if (response?.error) {
      return { error: true, message: response?.message };
    } else {
      return { error: false, data: response };
    }
  };

  return fetchFn;
};
