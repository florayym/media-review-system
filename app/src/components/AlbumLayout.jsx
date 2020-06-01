import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import api from '../api';

const names = [
  '2_2递归_小游戏',
  '6_1深度优先搜索_Sudoku',
  '1_3枚举_讨厌的青蛙',
  '4_1动态规划_最长上升子序列',
  '3_2动态规划_几个例题',
  '2_3递归_棋盘分割'
]

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

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // card number = 9

export default function Album(props) {
  const classes = useStyles();

  const handleWatch = (e) => {
    console.log(e.target.id);
    // pop up modal
  }

  const handleSelectGallery = (e) => {
    let media = "tb_media";
    if (e.target.id === "1") {
      media = "documents";
    }
    props.selectMedia(media);
  }

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="relative" color="deault">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Gallery
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              过审资源
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              {/* Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely. */}您可以在此浏览已通过审核的媒体资源
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button id="0" variant="contained" color="primary" onClick={handleSelectGallery}>
                    视频
                  </Button>
                </Grid>
                <Grid item>
                  <Button id="1" variant="outlined" color="primary" onClick={handleSelectGallery}>
                    文档
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card, index) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardActionArea onClick={handleWatch}>
                    <CardMedia

                      // ! HTML Event Attributes: w3schools.com/tags/ref_eventattributes.asp
                      // ? By default, we use the combination of a <div> element
                      // and a background image to display the media. 
                      // It can be problematic in some situations. 
                      // For instance, you might want to display a video or 
                      // a responsive image. Then use the component propert:
                      // component="img"
                      // height="140"

                      className={classes.cardMedia}
                      // image="https://source.unsplash.com/random"
                      // image="./media/card_image.jpg"
                      image={`./media/card_image_${index}.png`}
                      id="mediaID"
                      title="This is a thumbnail."
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {names[index]}
                    </Typography>
                      <Typography>
                        点击卡片弹出播放
                    </Typography>
                    </CardContent>
                  </CardActionArea>
                  {/* <CardActions>
                    <Button size="small" color="primary">
                      观看链接
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions> */}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          发布资源
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          浏览 | 管理 | 审核
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </Fragment>
  );
}
