import React, { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

interface ITableHead {
  tableHead: string[];
}

const DataTableSkeleton = ({ tableHead }: ITableHead) => {
  const [count, setCount] = useState(Array(3).fill(0));

  return (
    <TableBody>
      {count.map((e, index) => {
        return (
          <TableRow key={index}>
            {tableHead.map((h, index) => {
              return (
                <TableCell key={index}>
                  <Skeleton />
                </TableCell>
              );
            })}
            <TableCell />
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default DataTableSkeleton;
