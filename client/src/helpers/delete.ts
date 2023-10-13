export const deleteResource = async (resourceName: string, id: string) => {
  const rawResponse = await fetch(
    `http://localhost:5000/api/${resourceName}/${id}`,
    {
      method: "DELETE",
    }
  );
  const response = await rawResponse.json();
  return response;
};
