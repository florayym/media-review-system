import React, { useState, useEffect, Fragment } from 'react';
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

import Modal from '@material-ui/core/Modal';
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

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-0%, -0%)`,
  };
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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Album(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [openIndex, setOpenIndex] = useState("NO");
  const [mediaList, setMediaList] = useState([]);
  const [blobs, setBlobs] = useState([]);
  const [previewBlob, setPreviewBlob] = useState("");

  useEffect(() => {
    const getMediaList = async () => {
      await api
        .getAllTBMedia()
        .then(res => setMediaList(res.data.data))
        .catch(err => console.log(err));
    };

    getMediaList();
  }, [])

  // get thumbnails one at a time (tb_media / documents)
  useEffect(() => {
    const getCardThumbnail = async (id) => {
      await api
        .getThumbnail(id, { responseType: 'blob' })
        .then(res => {
          const blob = new Blob([res.data], { type: 'image/*' });

          // Generate the base64 string
          const reader = new FileReader();
          reader.readAsDataURL(blob);

          reader.onloadend = function () {
            const base64blob = reader.result;
            setBlobs(prevBlobs => ([...prevBlobs, base64blob]));

            // const img = document.createElement('img');
            // img.src = base64blob;
            // document.body.appendChild(img);
          }
        })
        .catch(err => console.log(err));
    };

    mediaList.forEach((media, index) => getCardThumbnail(media._id));

  }, [mediaList]);

  useEffect(() => {
    const fetchMeida = async (index) => {
      await api
        .getMediaFileById(mediaList[index]._id, { responseType: 'blob' })
        .then(res => {
          const blob = new Blob([res.data], { type: 'video/*' });
          const url = window.URL.createObjectURL(blob);
          setPreviewBlob(url);

          // const reader = new FileReader();
          // reader.readAsDataURL(blob);
          // reader.onloadend = () => {
          //   const result = reader.result;

          //   const video = document.createElement('video');
          //   video.src = url;
          //   document.body.appendChild(video);
          // }

        })
        .catch(err => console.log(err));
    };

    if (openIndex !== "NO") {
      fetchMeida(openIndex);
    }
  }, [openIndex]);

  const handleWatch = (e) => {
    setOpenIndex(e.target.id.substring(6));
  };

  const handleClose = () => {
    setOpenIndex("NO");
  };

  const handleSelectGallery = (e) => {
    if (e.target.id === "1") {
      props.selectMedia("documents");
    }
  };

  const displayModalBody = (
    <div style={modalStyle}>
      <iframe width="1263" height="720" src="./media/videos/1_3枚举_讨厌的青蛙.mp4" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      {/* <iframe width="1263" height="720" src={previewBlob} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
      {/* <video width="1263" height="720" src={previewBlob} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></video> */}
      {/* <video src={previewBlob}></video> */}
    </div>
  );

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="relative" color="default">
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
              您可以在此浏览已通过审核的媒体资源
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
            {mediaList.map((card, index) => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
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
                      // image={`./media/card_pic_${index}.png`}
                      image={blobs[index]}
                      id={`media_${index}`}
                      title={card.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name.split('.')[0]}
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
          <Modal
            open={openIndex !== "NO"}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {displayModalBody}
          </Modal>
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
