import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from 'App';

import ErrorFallback from 'components/ErrorFallback';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorFallback />} />
  )
);

export default router;
