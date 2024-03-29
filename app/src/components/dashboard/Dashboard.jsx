import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import ReviewTable from './ReviewTable';

import ReviewTBMedia from './ReviewTBMedia';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import api from '../../api';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/florayym">
        媒体资料管理
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [reviewSrc, setReviewSrc] = useState("./media/videos/1_3枚举_讨厌的青蛙.mp4");
  const [description, setDescription] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleNext = () => {
    setReviewSrc("./media/videos/6_1深度优先搜索_Sudoku.mp4")
  };

  const handleDecision = async (e) => {
    console.log(e.target.id);
    await api
      .updateHistory("5ebf60645b666c416c36fd23", props.reviewerID, { // reviewerID=10
        mediaID: "5ebf60645b666c416c36fd23",
        reviewerID: props.reviewerID,
        description: description,
        decision: e.target.id,
        date: Date.now()
      })
      .then(res => console.log(res.data.data))
      .catch(err => console.log(err));
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Junior Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            {/* <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid> */}
            {/* reviews */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ReviewTable reviewerID={props.reviewerID} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <div className="embed-responsive embed-responsive-16by9">
                {/* https://www.youtube.com/embed/b6Oe2puTdMQ */}
                {/* <iframe width="1518" height="594" src="./uploads/MOV032.MOD" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

                {/* <video src="./小型北斗II卫星观测站.mp4" autoplay height="300" width="400" controls codecs="avc1.42E01E, mp4a.40.2" /> */}
                {/* <video src="D:\Downloads\d5a0ecda-4f3b-469b-8a04-95321c2875d2.mp3" autoPlay height="300" width="400" controls> */}
                <video src={reviewSrc} autoPlay height="250" width="300" controls>
                </video>
              </div>
            </Grid>
            <Grid>
              <TextField
                id="standard-read-only-input"
                label="进度"
                defaultValue="还有1个待审"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid><Button id="accepted" type="button" onClick={handleDecision} >通过</Button></Grid>
            <Grid><Button id="rejected" type="button" onClick={handleDecision} >不通过</Button></Grid>
            <Grid><Button type="button" onClick={handleNext} >下一个</Button></Grid>
            <Grid>
              <TextField
                id="outlined-basic"
                label="描述"
                variant="outlined"
                onChange={e => setDescription(e.target.value)}
              >
                {description}
              </TextField>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>

        <Router>
          <Switch>
            <Route path="/tb" exact component={ReviewTBMedia} />
          </Switch>
        </Router>
      </main>

    </div>


  );
}
