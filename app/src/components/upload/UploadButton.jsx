import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const MAX_FILE_SIZE = 500 * 1024 * 1024;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function UploadButton(props) {
  const classes = useStyles();

  const handleSelectFile = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0]; // only the first file
      if (file.size <= MAX_FILE_SIZE) {
        props.onSelectFile(file);
        return;
      }
    }
    props.onSelectFile({});
  }

  return (
    <div className={classes.root}>
      <input
        accept={props.accept}
        className={classes.input}
        id="contained-button-file"
        // multiple // 暂不允许批量上传
        type="file"
        name="mediaToUpload"
        onChange={handleSelectFile}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          选择文件
        </Button>
      </label>
    </div>
  );
}