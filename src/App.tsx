import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import router from './router';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
