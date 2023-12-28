import { toast } from 'react-toastify';

import * as requests from '../shared/constants/requests';

const parseVariables = (variables: string) => {
  let parsedVariables = '';
  if (variables.trim() !== '') {
    try {
      parsedVariables = JSON.parse(variables);
    } catch (error) {
      toast.error('Please enter valid JSON in variables');
    }
  }
  return parsedVariables;
};

const makeGraphQLRequest = async (
  url: string,
  query: string,
  variables: string = ''
) => {
  const parsedVariables = parseVariables(variables);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query, variables: parsedVariables }),
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
