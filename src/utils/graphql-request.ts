import * as requests from '../shared/constants/requests';

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

export const makeGraphQLPreflightShort = async (url: string) => {
  const query = requests.shortSchemaRequest;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  return res.json();
};

export const makeGraphQLPreflightLong = async (url: string) => {
  const query = requests.longSchemaRequest;
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
