import React from 'react';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DataTableActions from './DataTableActions';

const DataTableBody = ({ rows, tableBodySetting }: IDataTableBody) => {
  return (
    <TableBody>
      {rows.map((row, index) => {
        return (
          <TableRow
            key={index}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              '&:hover': { background: '#E8E8E8' },
            }}
          >
            {tableBodySetting.map((k, index) => {
              return (
                <TableCell
                  onClick={() => console.log(row.otsikko)}
                  align={k.align || 'left'}
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    background: 'inherit',
                  }}
                >
                  {`${row[k.key as keyof typeof row]} ${k.symbol || ''}`}
                </TableCell>
              );
            })}
            <DataTableActions />
          </TableRow>
        );
      })}
    </TableBody>
  );
};

interface IDataTableBody {
  tableBodySetting: tableBodySetting[];
  rows: any[];
}

interface tableBodySetting {
  key: string;
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
  symbol?: string;
}

export default DataTableBody;
