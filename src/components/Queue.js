import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.primary,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth :1200,
    margin:'auto',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    maxWidth: 1200,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.primary,
    },
  },
  tableHead: {
      backgroundColor: '#3f51b5'
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [];

function CustomizedTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <CustomTableCell>Song</CustomTableCell>
            <CustomTableCell numeric>User name</CustomTableCell>
            <CustomTableCell numeric></CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ?
            rows.map(row => {
              return (
                <TableRow className={classes.row} key={row.id}>
                  <CustomTableCell component="th" scope="row">
                    {row.name}
                  </CustomTableCell>
                  <CustomTableCell numeric>{row.calories}</CustomTableCell>
                  <CustomTableCell numeric>
                  <IconButton className={classes.addIcon} aria-label="Add">
                    <DeleteIcon className={classes.playIcon} />
                  </IconButton>
                  </CustomTableCell>
                </TableRow>
              );
          }):

          <TableRow className={classes.row}>
            <CustomTableCell component="th" scope="row">
              No request
            </CustomTableCell>
          </TableRow>

        }
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
