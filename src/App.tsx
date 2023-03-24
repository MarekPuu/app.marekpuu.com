import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom';
import NotFoundPage from './Pages/NotFoundPage';
import Talous from './Pages/Talous';
import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout';
import { useEffect } from 'react';
import NavigateToTalousById from './Pages/NavigateToTalousById';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<NavigateToTalousById />} />
        <Route path="/talous" element={<NavigateToTalousById />} />
        <Route path="talous/:id" element={<Talous />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);

function App() {
  useEffect(() => {
    document.body.setAttribute('data-theme', 'dark');
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
