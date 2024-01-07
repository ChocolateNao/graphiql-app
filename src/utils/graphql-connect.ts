import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { GraphQLSchema } from 'models/GraphQLSchema.interface';

import { longSchemaRequest as query } from '../shared/constants/requests';

export const preflight = createApi({
  reducerPath: 'API Endpoint',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    cachedPreflight: builder.query<GraphQLSchema, string>({
      query: (endpoint) => ({
        url: `${endpoint}`,
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ query }),
      }),
    }),
  }),
});
export const { useCachedPreflightQuery } = preflight;
