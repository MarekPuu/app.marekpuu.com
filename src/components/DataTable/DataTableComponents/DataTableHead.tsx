import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

interface IDataTableHead {
  tableHead: string[];
}

const DataTableHead = ({ tableHead }: IDataTableHead) => {
  return (
    <TableHead>
      <TableRow>
        {tableHead?.map((head, index) => {
          return (
            <TableCell
              sx={{ width: index === 1 ? '100%' : 'auto' }}
              key={index}
              align="left"
            >
              {head}
            </TableCell>
          );
        })}
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export default DataTableHead;
