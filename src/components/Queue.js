import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import Rebase from 're-base';
import app from '../Base';
var base = Rebase.createClass(app.database());

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

class Queue extends Component {
  constructor(props) {
      super(props);
      this.state = {
        queue: [],
        username : 'Test'
      }
    }

    componentDidMount(){
      base.syncState(`/`, {
         context: this,
         state: 'queue',
         asArray:true
       }, () => this.test());
    }
    test(){


    }

    removeSong(idDelete) {
      let deleteQueue = this.state.queue;
      deleteQueue.splice(idDelete,1)
      this.setState({queue: deleteQueue})
    }
    bumpSong(idBump) {
      let bumpQueue = this.state.queue;
      let bumpWait = this.state.queue[idBump]
      bumpQueue.splice(idBump,1);
      bumpQueue.unshift(bumpWait)
      this.setState({queue: bumpQueue})
    }


  render(){
    const { classes } = this.props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <CustomTableCell></CustomTableCell>
            <CustomTableCell>Song</CustomTableCell>
            <CustomTableCell>User name</CustomTableCell>
            <CustomTableCell></CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.queue.length > 0 ?
            this.state.queue.map((row,index) => {
              return (
                <TableRow className={classes.row} key={index}>
                  <CustomTableCell component="th" scope="row">
                    {index+1}
                  </CustomTableCell>
                  <CustomTableCell component="th" scope="row">
                    {row.artist} - {row.title}
                  </CustomTableCell>
                  <CustomTableCell>{this.state.username}</CustomTableCell>
                  <CustomTableCell>
                  <Button onClick={()=>this.bumpSong(index)} className={classes.addIcon} aria-label="Add">
                    <StarBorderRoundedIcon className={classes.playIcon} />
                  </Button>
                  <Button onClick={()=>this.removeSong(index)} className={classes.addIcon} aria-label="Add">
                    <DeleteIcon className={classes.playIcon} />
                  </Button>
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
}


Queue.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Queue);
