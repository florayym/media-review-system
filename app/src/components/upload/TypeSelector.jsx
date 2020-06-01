import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function FileTypeSelect(props) {
  const classes = useStyles();
  const selectInput = useRef(null);
  const [type, setType] = useState(props.default_type);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    props.onSelectType(e.target.value);
    setType(e.target.value);
  };

  function handleClick() {
    selectInput.current.focus();
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      {/* <Button className={classes.button} onClick={handleOpen}>
        选择所需上传的文件类型
      </Button> */}
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">文件类型</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={type}
          onChange={handleChange}
          required
          onClick={handleClick}
          ref={selectInput}
        >
          <MenuItem value={""}><em>None</em></MenuItem>
          <MenuItem value={"audio/*, video/*"}>视音频</MenuItem>
          <MenuItem value={"image/*"}>图片</MenuItem>
          <MenuItem value={".pdf"}>PDF文件</MenuItem>
          <MenuItem value={".doc, .docx, .xls, .xlsx, .ppt, .pptx"}>Office文件</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}