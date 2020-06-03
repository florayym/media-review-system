import React, { useState, useEffect, Fragment } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Paper from '@material-ui/core/Paper';
import api from '../../api';

// Generate Data Format
function createData(mediaID, date, description, decision) {
  return { mediaID, date, description, decision };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

export default function ReviewTable(props) {
  const classes = useStyles();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      await api
        .getHistoryByReviewerId(props.reviewerID)
        .then(res => setHistory(res.data.data))
        .catch(err => console.log(err));
    };

    fetchHistory();
  }, []);

  return (
    <Fragment component={Paper}>
      <Title>审核历史</Title>
      <Table size="small" className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>序号</TableCell>
            <TableCell>资源编号</TableCell>
            <TableCell>日期</TableCell>
            <TableCell>描述</TableCell>
            <TableCell>审核结果</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((row, index) => (
            <TableRow key={row.mediaID}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{row.mediaID}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.decision}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
