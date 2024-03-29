import React, { useState } from 'react';
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

export default function FormatSelect(props) {
  const classes = useStyles();
  const [format, setFormat] = useState(props.default_format);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    props.onSelectFormat(e.target.value);
    setFormat(e.target.value);
  };

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
        <InputLabel id="demo-controlled-open-select-label">码率参数</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={format}
          onChange={handleChange}
          required
        >
          <MenuItem value={"N/A"}><em>None</em></MenuItem>
          <MenuItem value={"64"}>64</MenuItem>
          <MenuItem value={"128"}>128</MenuItem>
          <MenuItem value={"964"}>964</MenuItem>
          <MenuItem value={"1800"}>1800</MenuItem>
          <MenuItem value={"3500"}>3500</MenuItem>
          <MenuItem value={"3856"}>3856</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}