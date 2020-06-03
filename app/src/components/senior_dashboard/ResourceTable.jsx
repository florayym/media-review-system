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
function createData(_id, name, size, type, path) {
  return { _id, name, size, type, path };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

export default function ResourceTable(props) {
  const classes = useStyles();
  const [resource, setResource] = useState([]);

  useEffect(() => {
    const fetchResource = async () => {
      await api
        .getAllMedia()
        .then(res => setResource(res.data.data))
        .catch(err => console.log(err));
    };

    fetchResource();
  }, []);

  return (
    <Fragment component={Paper}>
      <Title>资源管理</Title>
      <Table size="small" className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>序号</TableCell>
            <TableCell>资源编号</TableCell>
            <TableCell>名称</TableCell>
            <TableCell>大小（B）</TableCell>
            <TableCell>类型</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resource.map((row, index) => (
            <TableRow key={row.mediaID}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row._id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.size}</TableCell>
              <TableCell>{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
