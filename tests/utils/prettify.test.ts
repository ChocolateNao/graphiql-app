import { formatQuery, isCodeValid } from 'utils/prettify';

import {
  brokenQueryMock,
  initialQueryMock,
  prettifiedQueryMock,
} from '../mock/prettifyMock';

describe('Prettifyer', () => {
  it('checks if the code is valid correctly', () => {
    const validQuery = isCodeValid(initialQueryMock);
    const brokenQuery = isCodeValid(brokenQueryMock);

    expect(validQuery).toBeTruthy();
    expect(brokenQuery).toBeFalsy();
  });

  it('formats the query', () => {
    const initQuery = initialQueryMock;
    const formattedQuery = formatQuery(initQuery);

    expect(formattedQuery).toBe(prettifiedQueryMock);
  });
});
