import React from 'react';
import DataTableContainer from '../components/HouseholdPage/DataTableContainer';
import './styles/Talous.css';
import SuspenseWithLoader from '../components/Suspense/Suspense';

const Talous = () => {
  return (
    <SuspenseWithLoader>
      <div className="talouspage_page_container">
        <div className="talouspage_left_container">
          <DataTableContainer />
        </div>
        <div className="talouspage_right_container">
          {/* <DataTableContainer /> */}
        </div>
      </div>
    </SuspenseWithLoader>
  );
};

export default Talous;
