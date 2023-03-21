import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './DefaultLayout.css';
import TalousNavContainer from './NavComponents/TalousNavContainer';
import AccountMenu from './NavComponents/AccountMenu';
import Footer from '../Footer/Footer';
import { useAuth0 } from '@auth0/auth0-react';

const DefaultLayout = () => {
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) loginWithRedirect();
  }, [isAuthenticated, isLoading]);

  return (
    <div className='default_layout_container'>
      <nav className='default_layout_nav_container'>
        {!user ? null : (
          <div className='default_layout_nav'>
            <TalousNavContainer />
            <AccountMenu />
          </div>
        )}
      </nav>
      <div className='default_layout_outlet'>{user ? <Outlet /> : null}</div>
      <div className='default_layout_footer'>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
