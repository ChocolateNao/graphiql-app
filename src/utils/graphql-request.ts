import { toast } from 'react-toastify';

const parseVariables = (variables: string, errorMsg: string | undefined) => {
  let parsedVariables = '';
  if (variables.trim() !== '') {
    try {
      parsedVariables = JSON.parse(variables);
    } catch (error) {
      toast.error(errorMsg);
    }
  }
  return parsedVariables;
};

const parseHeaders = (headers: string, errorMsg: string | undefined) => {
  let parsedHeaders = {
    'Content-type': 'application/json',
  };
  if (headers.trim() !== '') {
    try {
      parsedHeaders = { ...parsedHeaders, ...JSON.parse(headers) };
    } catch (error) {
      toast.error(errorMsg);
    }
  }
  return parsedHeaders;
};

const makeGraphQLRequest = async (
  url: string,
  query: string,
  variablesErr: string | undefined,
  headersErr: string | undefined,
  variables: string = '',
  headers: string = ''
) => {
  const parsedVariables = parseVariables(variables, variablesErr);
  const parsedHeaders = parseHeaders(headers, headersErr);
  const res = await fetch(url, {
    method: 'POST',
    headers: parsedHeaders,
    body: JSON.stringify({ query, variables: parsedVariables }),
  });
  return res.json();
};
export default makeGraphQLRequest;
