type MutationResponse<T> = { error: boolean; data?: T; message?: string };
type Method = "POST" | "PUT";
const BASE_URL = "http://localhost:5000/";

export const useMutation = <TBody extends {}, TResponse extends {}>(
  url: string,
  method: Method = "POST"
) => {
  const fetchFn = async (body: TBody): Promise<MutationResponse<TResponse>> => {
    const raw_response = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const response = await raw_response.json();

    if (response?.error) {
      return { error: true, message: response?.message };
    } else {
      return { error: false, data: response.data };
    }
  };

  return fetchFn;
};
