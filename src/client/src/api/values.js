const VALUES_ENDPOINT = `${process.env.REACT_APP_API_HOST}api/values`;

export const getValues = async () => {
  const response = await fetch(VALUES_ENDPOINT);
  return response.json();
}
