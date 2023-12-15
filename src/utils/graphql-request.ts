const makeGraphQLRequest = async (url: string, query: string) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  return res.json();
};
export default makeGraphQLRequest;
