import { cleanup } from '@testing-library/react';

import 'whatwg-fetch';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});
