import React from 'react';
import './Talouspage.css';

import MenotDataTable from './MenotDataTable';
import ToDoDataTable from './ToDoDataTable';

const DataTableContainer = () => {
  return (
    <>
      <div className="talouspage_datatable_container">
        <div className="talouspage_datatable">
          <MenotDataTable />
        </div>
        <div className="talouspage_datatable">
          <ToDoDataTable />
        </div>
      </div>
    </>
  );
};

export default DataTableContainer;
