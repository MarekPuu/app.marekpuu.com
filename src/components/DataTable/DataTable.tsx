import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import './DataTable.css';

interface IDataTable {
  title: string;
  tableHead: string[];
  tableBodySetting: tableBodySetting[];
  tableRows: any[];
}

interface tableBodySetting {
  key: string;
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
  symbol?: string;
}

const DataTable = ({
  title,
  tableHead,
  tableBodySetting,
  tableRows: rows = [],
}: IDataTable) => {
  return (
    <div className='data_table_container'>
      <Paper sx={{ minHeight: '250px' }} elevation={3}>
        <div className='data_table_title_container'>
          <h1>{title}</h1>
        </div>
        <div className='data_table_table_container'>
          {rows.length === 0 ? (
            <p>Ei dataa</p>
          ) : (
            <Table aria-label={title}>
              <TableHead>
                <TableRow>
                  {tableHead?.map((head, index) => {
                    return (
                      <TableCell key={head + index} align='left'>
                        {head}
                      </TableCell>
                    );
                  })}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <TableRow
                      key={row.otsikko + index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {tableBodySetting.map((k, index) => {
                        return (
                          <TableCell
                            align={k.align || 'left'}
                            key={k.key + index}
                          >
                            {`${row[k.key as keyof typeof row]} ${
                              k.symbol || ''
                            }`}
                          </TableCell>
                        );
                      })}
                      <TableCell>fn</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </Paper>
    </div>
  );
};

export default DataTable;
