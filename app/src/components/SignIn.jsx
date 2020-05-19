import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useState } from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/florayym">
        媒体资料审核
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark, // main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('junior');
  const [idError, setIDError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleIDChange = (e) => {
    setID(e.target.value)
    if (ID !== '') {
      setIDError('');
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (password !== '') {
      setPasswordError('');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // submitting the form to prevent a browser reload/refresh

    // perform validation
    if (ID === '') {
      setIDError('工号不可为空！');
    }
    if (password === '') {
      setPasswordError('密码不可为空！');
    } else if (ID !== '') {
      props.onSubmit({
        "ID": ID,
        "password": password,
        "type": type
      });
      setID('');
      setPassword('');
      setType('junior');
      setIDError('');
      setPasswordError('');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          审 核 系 统 登 录
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="id"
            label="工号"
            name="id"
            autoComplete="id"
            autoFocus
            onChange={handleIDChange}
            value={ID}
          />
          <FormHelperText style={{ fontSize: 14, color: "red" }}>{idError}</FormHelperText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="密码"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
            value={password}
          />
          <FormHelperText style={{ fontSize: 14, color: "red" }}>{passwordError}</FormHelperText>
          <FormControl component="fieldset" >
            <RadioGroup row={true} aria-label="usertype" name="usertype1" value={type} onChange={e => setType(e.target.value)}>
              <FormControlLabel value="junior" control={<Radio color="primary" />} label="初审" />
              <FormControlLabel value="senior" control={<Radio color="primary" />} label="主审" />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleSubmit(e)}
          >
            登   录
          </Button>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="记住我"
          />
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
