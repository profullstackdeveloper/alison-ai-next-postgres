'use client';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableRowType } from '@/utils/types';
import { Button } from '@mui/material';

interface PropTypes {
  numbers: TableRowType[],
  loading?: boolean
}

export default function NumbersTable({ numbers, loading = true }: Readonly<PropTypes>) {
  if (loading) {
    return "Loading..."
  }
  return (
    <TableContainer component={Paper}>
      {
        !loading && <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID 1</TableCell>
              <TableCell>Number 1</TableCell>
              <TableCell>ID 2</TableCell>
              <TableCell>Number 2</TableCell>
              <TableCell>Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {numbers.map((row) => (
              <TableRow key={row.id1}>
                <TableCell>{row.id1}</TableCell>
                <TableCell>{row.number1}</TableCell>
                <TableCell>{row.id2 || '-'}</TableCell>
                <TableCell>{row.number2 || '-'}</TableCell>
                <TableCell>{row.sum || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
      
      <Button variant='contained' className='mt-4!'>Clear Table</Button>
    </TableContainer>
  );
}