import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

import UploadButton from './UploadButton';
import Button from '@material-ui/core/Button';
import LinearProgressBar from './LinearProgressBar';
import api from '../../api';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  info: {
    fontWeight: 600,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ReviewUpload(props) {
  const classes = useStyles();
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onSelectFile = (file) => {
    // == converts the variable values to the same type before performing comparison
    file.name == null ? setFilename("Choose File") : setFilename(file.name);
    // file has three params: .name .size .type
    setFile(file);
  }

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    },
    // `onUploadProgress` allows handling of progress events for uploads
    // browser only
    onUploadProgress: progressEvent => {
      // Do whatever you want with the native progress event
      setUploadPercentage(parseInt(Math.round(
        progressEvent.loaded * 100 / progressEvent.total)));
    }
  };

  function onUpload(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('media', file);

    api
      .uploadMedia(formData, config)
      .then(res => {
        console.log(res);
        setUploadedFile(res.data); // id, file
        props.uploadStatus(true);
      })
      .catch(err => console.log(err));

    //****** Another method ******/
    // axios({
    //   method: 'POST',
    //   url: 'http://localhost:3000/api/media/',
    //   data: formData,
    //   config: config
    // })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  };

  return (
    <Fragment>
      {/* 信息展示 */}
      <List disablePadding>
        <ListItem className={classes.listItem}>
          <ListItemText primary="文件类型" />
          <Typography variant="subtitle1" className={classes.info}>
            {props.type}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="参数选择" />
          <Typography variant="subtitle1" className={classes.info}>
            {props.format}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="上传文件" />
          <Typography variant="subtitle1" className={classes.info}>
            {filename}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={3}>
        {/* 文件上传 */}
        <form className={classes.form} encType="multipart/form-data">
          <Grid item xs={12}>
            <UploadButton onSelectFile={file => onSelectFile(file)} accept={props.type} />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={filename === "Choose File" ? null : onUpload}
            >
              上 传
            </Button>
          </Grid>
          <Grid item xs={12}>
            <LinearProgressBar percentage={uploadPercentage} />
          </Grid>
        </form>

        {/* <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            预计大小
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </Grid> */}
      </Grid>
    </Fragment>
  );
}
