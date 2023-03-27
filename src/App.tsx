import { lazy } from 'react';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom';

// import Household from './Pages/Household';
// import HouseholdSettings from './Pages/HouseholdSettings';
// import NotFoundPage from './Pages/NotFoundPage';

import NavigateToTalousById from './Pages/NavigateToTalousById';
import HouseholdStateManager from './components/HouseholdPage/HouseholdStateManager';

import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout';
import { useEffect } from 'react';

const HouseholdSettings = lazy(() => import('./Pages/HouseholdSettings'));
const NotFoundPage = lazy(() => import('./Pages/NotFoundPage'));
const Household = lazy(() => import('./Pages/Household'));
const ProfilePage = lazy(() => import('./Pages/ProfilePage'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<NavigateToTalousById />} />
        <Route path="/talous" element={<NavigateToTalousById />} />
        <Route element={<HouseholdStateManager />}>
          <Route path="talous/:id" element={<Household />} />
          <Route path="talous/:id/asetukset" element={<HouseholdSettings />} />
        </Route>
        <Route path="/profiili" element={<ProfilePage />} />
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
