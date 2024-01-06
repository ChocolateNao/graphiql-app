import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import ErrorFallback from 'components/ErrorFallback';
import RootLayout from 'layouts/RootLayout';
import NotFoundPage from 'pages/404';
import EndpointSettings from 'pages/EndpointSettings';
import Login from 'pages/Login';
import MainPage from 'pages/MainPage';
import PasswordUpdate from 'pages/PasswordUpdate/PasswordUpdate';
import Register from 'pages/Register';
import Reset from 'pages/Reset';
import WelcomePage from 'pages/WelcomePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorFallback />}>
        <Route index element={<WelcomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset" element={<Reset />} />
        <Route path="home" element={<MainPage />} />
        <Route path="endpoint-settings" element={<EndpointSettings />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="password-update" element={<PasswordUpdate />} />
    </>
  )
);

export default router;
