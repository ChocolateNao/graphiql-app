import makeGraphQLRequest from 'utils/graphql-request';

import { prettifiedQueryMock } from '../mock/prettifyMock';

const graphQlApiUrl = 'https://rickandmortyapi.com/graphql';
const headers = JSON.stringify({
  'Content-Type': 'application/json',
});
const variables = JSON.stringify({
  test: 'test',
});

let windowFetchSpy;
describe('graphql request', () => {
  beforeEach(() => {
    windowFetchSpy = jest.spyOn(window, 'fetch');
    windowFetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);
  });
  afterEach(() => {
    windowFetchSpy = jest.restoreAllMocks();
  });

  it('makes a request to the api directly', async () => {
    const data = await makeGraphQLRequest(
      graphQlApiUrl,
      prettifiedQueryMock,
      undefined,
      undefined,
      variables,
      headers,
      false
    );

    expect(data).toBeDefined();
  });

  it('makes a request to the api via proxy', async () => {
    const data = await makeGraphQLRequest(
      graphQlApiUrl,
      prettifiedQueryMock,
      undefined,
      undefined,
      variables,
      headers,
      true
    );

    expect(data).toBeDefined();
  });
});
