import React from 'react';
import { map } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const TableComponent = ({ expenses }) => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Description</TableCell>
          <TableCell>Value</TableCell>
          <TableCell>User</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Is Settled</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {map(expenses, (row) => (
          <StyledTableRow key={row.id}>
            <TableCell>{row.description}</TableCell>
            <TableCell>{row.value}</TableCell>
            <TableCell>{row.user.email}</TableCell>
            <TableCell>{row.category.name}</TableCell>
            <TableCell>{row.date_str}</TableCell>
            <TableCell>{row.is_settled ? 'True' : 'False'}</TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TableComponent;
