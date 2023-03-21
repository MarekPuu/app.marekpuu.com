import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom';
import NotFoundPage from './Pages/NotFoundPage';
import Talous from './Pages/Talous';
import DefaultLayout from './components/Layout/DefaultLayout/DefaultLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<DefaultLayout />}>
        <Route path='/' element={<Talous />} />
        <Route path='/login' element={<NotFoundPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
