import React from 'react';
import DataTableContainer from '../components/TalousPage/DataTableContainer';
import './styles/Talous.css';

const Talous = () => {
  return (
    <div className='talouspage_page_container'>
      <div className='talouspage_left_container'>
        <DataTableContainer />
      </div>
      <div className='talouspage_right_container'>
        {/* <DataTableContainer /> */}
      </div>
    </div>
  );
};

export default Talous;
