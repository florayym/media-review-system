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
import { Document, Page, pdfjs } from 'react-pdf';
// const pdfjsVersion = "2.0.305";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const names = [
  '小树林',
  '搏击',
  '公路',
  '晚霞',
  '大猩猩',
  '夜景',
  '内饰'
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

export default function Album2(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [openIndex, setOpenIndex] = useState("NO");
  const [mediaList, setMediaList] = useState([]);
  const [blobs, setBlobs] = useState([]);
  const [previewBlob, setPreviewBlob] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [openType, setOpenType] = useState("");

  useEffect(() => {
    const getDocMediaList = async () => {
      await api
        .getAllDocsMedia()
        .then(res => setMediaList(res.data.data))
        .catch(err => console.log(err));
    };

    getDocMediaList();
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

    mediaList.forEach(media => getCardThumbnail(media._id));

  }, [mediaList]);

  const handleWatch = (e) => {
    setOpenIndex(e.target.id.substring(6));
    setOpenType(e.target.type);
  };

  const handleClose = () => {
    setOpenIndex("NO");
  };

  const handleSelectGallery = (e) => {
    if (e.target.id === "0") {
      props.selectMedia("tb_media");
    }
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  const displayPDFModal = (
    <div style={modalStyle}>
      <Document
        file="/media/pdftest.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );

  const displayPicModal = (
    <div style={modalStyle}>
      <img src={blobs[openIndex]}></img>
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
              {/* Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely. */}您可以在此浏览已通过审核的媒体资源
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button id="0" variant="outlined" color="primary" onClick={handleSelectGallery}>
                    视频
                  </Button>
                </Grid>
                <Grid item>
                  <Button id="1" variant="contained" color="primary" onClick={handleSelectGallery}>
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
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardActionArea onClick={handleWatch}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={blobs[index]}
                      id={`media_${index}`}
                      type={card.type}
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
            {openType === "application" ? (displayPDFModal) : (displayPicModal)}
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
