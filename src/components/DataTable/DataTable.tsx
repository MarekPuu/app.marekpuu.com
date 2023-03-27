import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';

import './DataTable.css';
import DataTableBody from './DataTableComponents/DataTableBody';
import DataTableHead from './DataTableComponents/DataTableHead';
import DataTableSkeleton from './DataTableComponents/DataTableSkeleton';
import { TableContainer } from '@mui/material';

const DataTable = (props: IDataTable) => {
  const { title, tableRows: rows = [], loading } = props;
  const { tableHead, tableBodySetting } = props;

  return (
    <div className="data_table_container">
      <TableContainer component={Paper} sx={{ width: '100%' }} elevation={1}>
        <div className="data_table_title_container">
          <h1>{title}</h1>
        </div>
        <div className="data_table_table_container">
          <Table aria-label={title}>
            <DataTableHead tableHead={tableHead} />
            {rows.length > 0 ? (
              <DataTableBody rows={rows} tableBodySetting={tableBodySetting} />
            ) : loading ? (
              <DataTableSkeleton tableHead={tableHead} />
            ) : null}
          </Table>
        </div>
      </TableContainer>
    </div>
  );
};

interface IDataTable {
  title: string;
  tableHead: string[];
  tableBodySetting: ITableBodySetting[];
  tableRows: any[];
  loading: boolean;
}

interface ITableBodySetting {
  key: string;
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
  symbol?: string;
}

export default DataTable;
