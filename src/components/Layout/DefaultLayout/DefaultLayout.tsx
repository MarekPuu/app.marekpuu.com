import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './DefaultLayout.css';
import TalousNavContainer from './NavComponents/TalousNavContainer';
import AccountMenu from './NavComponents/AccountMenu';
import Footer from '../Footer/Footer';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuspenseWithLoader from '../../Suspense/Suspense';
import Loading from '../../LoadingSpinner/Loading';

const DefaultLayout = () => {
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();

  console.log(user);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) loginWithRedirect();
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return (
    <div className="default_layout_container">
      <nav className="default_layout_nav_container">
        {!user ? null : (
          <div className="default_layout_nav">
            <TalousNavContainer />
            <AccountMenu />
          </div>
        )}
      </nav>
      <div className="default_layout_outlet">
        <SuspenseWithLoader>
          {!user ? <Loading /> : <Outlet />}
        </SuspenseWithLoader>
      </div>
      <div className="default_layout_footer">
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default DefaultLayout;
