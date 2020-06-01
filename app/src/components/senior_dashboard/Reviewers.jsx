import React, { Fragment, useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { lighten, withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import api from '../../api';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function preventDefault(event) {
  event.preventDefault();
}

/**
 * ! For styles
 */
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  row_root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  // seeMore: {
  //  marginTop: theme.spacing(3),
  // },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(4n-3)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

/**
 * ! For functional table operations
 */
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

/**
 * ! Table data format
 */
const headCells = [
  { id: 'id', numeric: true, disablePadding: false, label: '序号' },
  { id: 'reviewerID', numeric: false, disablePadding: true, label: '初审ID' }, // id
  { id: 'progress', numeric: false, disablePadding: true, label: '进度' },
  { id: 'history', numeric: false, disablePadding: true, label: '审核历史' },
];

// Generate Reviewer Data
function createData(reviewerID, progress, history) {
  return { reviewerID, progress, history };
}

/**
 * ! 工具栏
 * @param {*} props 
 */
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            分配审核任务
          </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

/**
 * ! 表格头部
 * @param {*} props 
 */
function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell key="arrow-cell" />
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={headCell.id !== 'id' ? createSortHandler(headCell.id) : null}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
        <StyledTableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all reviewers' }}
          />
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

/**
 * ! render component
 */
export default function EnhancedReviewerInfoTable() {
  const classes = useStyles();
  const [reviewerInfo, setReviewerInfo] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [stat, setStat] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('reviewerID');
  const [selected, setSelected] = useState([]);
  const [opened, setOpened] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {

    const fetchReviewers = async () => {
      await api.getAllReviewers()
        .then(res => setReviewerInfo(res.data.data))
        .catch(err => console.log(err));
    };

    fetchReviewers();
  }, []);

  useEffect(() => {

    const fetchHistory = async (id) => {
      api.getHistoryByReviewerId(id)
        .then(res => setReviewers(prevHistory => ([
          ...prevHistory, createData(id, 0, res.data.data)])))
        .catch(err => console.log(err));
    };

    reviewerInfo.forEach(reviewer => {
      fetchHistory(reviewer.ID);
    })

  }, [reviewerInfo]);
  // If dependencies present, effect will only activate if the values in the list change.

  useEffect(() => {

    const calculateStat = async (reviewer, id) => {
      let acceptNum = 0;
      let rejectNum = 0;
      let pendingNum = 0;
      switch (reviewer.decision) {
        case "accepted":
          acceptNum++;
          break;
        case "rejected":
          rejectNum++;
          break;
        case "pending":
          pendingNum++;
          break;
      }
      let element = {};
      element.pending = pendingNum + "/" + (acceptNum + rejectNum + pendingNum);
      element.history = "通过：" + acceptNum + "\t通过：" + rejectNum;
      setStat(preStat => ([...preStat, { id: element }]));
    }

    reviewers.forEach(reviewer => {
      calculateStat(reviewer, reviewer.ID);
    })

    console.log(stat);
  }, [reviewers]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc'); // 取反
    setOrderBy(property);
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = reviewers.map((n) => n.reviewerID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]); // discard all
  }

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleOpen = (id) => {
    const openedIndex = opened.indexOf(id);
    let newOpened = [];

    if (openedIndex === -1) {
      newOpened = newOpened.concat(opened, id);
    } else if (openedIndex === 0) {
      newOpened = newOpened.concat(opened.slice(1));
    } else if (openedIndex === opened.length - 1) {
      newOpened = newOpened.concat(opened.slice(0, -1));
    } else if (openedIndex > 0) {
      openedIndex = openedIndex.concat(
        opened.slice(0, openedIndex),
        opened.slice(opened + 1),
      );
    }

    setOpened(newOpened);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const isOpened = (id) => opened.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, reviewers.length - page * rowsPerPage);

  return (
    <Fragment>
      {/* <Title>审核人员</Title> */}
      <EnhancedTableToolbar
        numSelected={selected.length}
      />
      {/* <Table size="small"> */}
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        size={dense ? 'small' : 'medium'}
        aria-label="reviewer table"
      >
        <EnhancedTableHead
          classes={classes}
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={reviewers.length}
        />
        <TableBody>
          {stableSort(reviewers, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {

              // ! Sorting & selecting & Collapsible table
              const isItemSelected = isSelected(row.reviewerID);
              const labelId = `enhanced-table-checkbox-${index + 1}`;

              const isItemOpened = isOpened(row.reviewerID);

              return (
                <Fragment key={`display-row-${row.reviewerID}`}>
                  <StyledTableRow
                    hover
                    // should not be active for the whole row
                    // onClick={(event) => handleClick(event, row.reviewerID)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        // onClick={() => setOpen(!open)}
                        onClick={() => handleOpen(row.reviewerID)}>
                        {isItemOpened ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </TableCell>
                    <StyledTableCell component="th" scope="row" id={labelId} align="center" padding="none">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.reviewerID}</StyledTableCell>
                    <StyledTableCell align="center">{row.progress}</StyledTableCell>
                    <StyledTableCell align="center">{row.history.length}</StyledTableCell>
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={() => handleClick(row.reviewerID)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>

                  {/* collapsed table https://material-ui.com/components/tables/#table */}
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={isItemOpened}> {/* timeout="auto" unmountOnExit */}
                        <Box margin={1}>
                          <Typography variant="h6" gutterBottom component="div">
                            审核员 {row.reviewerID} 的审核记录
                          </Typography>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>日期</TableCell>
                                <TableCell>资源编号</TableCell>
                                <TableCell align="right">审核结果</TableCell>
                                <TableCell align="right">描述</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row.history.map((historyRow) => (
                                <TableRow key={historyRow.date}>
                                  <TableCell component="th" scope="row"> {historyRow.date}</TableCell>
                                  <TableCell>{historyRow.mediaID}</TableCell>
                                  <TableCell align="right">{historyRow.decision}</TableCell>
                                  <TableCell align="right">{historyRow.description}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/*
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
      */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={reviewers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Fragment>
  );
}
