import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import OptionForm from './OptionForm';
import ReviewUpload from './ReviewUpload';

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
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['菜单选择', '确认上传']; // ['菜单选择', '信息确认', '文件上传'];

export default function Upload() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [type, setType] = useState("");
  const [format, setFormat] = useState("N/A");
  const [uploadComplete, setUploadComplete] = useState(false);

  useEffect(() => {
    if (uploadComplete) {
      setTimeout(() => setActiveStep(activeStep + 1), 3000);
    }
  }, [uploadComplete]);

  function getStepContent() {
    switch (activeStep) {
      case 0:
        return <OptionForm
          default_type={type}
          default_format={format}
          type={type => setType(type)}
          format={format => setFormat(format)}
        />;
      case 1:
        return <ReviewUpload
          type={type}
          format={format}
          uploadStatus={complete => setUploadComplete(complete)}
        />;
      // case 2:
      //   return <InProgress file={file} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    if (activeStep === 0) {
      if (type === "" || type === "tb_media" && format === "N/A") {
        alert("选项均不可为空！");
        return;
      }
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <CloudUploadIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Upload
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            文 件 上 传
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Fragment>
            {activeStep === steps.length ? (
              <Fragment>
                {/* 成功提示 */}
                <Typography variant="h5" gutterBottom>
                  上传成功！
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.回到gallery页面看看其它视频吧
                </Typography>
              </Fragment>
            ) : (
                <Fragment>
                  {/* 功能菜单 */}
                  {getStepContent()}
                  {/* 右下方按钮 */}
                  <div className={classes.buttons}>
                    {activeStep === 1 && (
                      <Button onClick={handleBack} className={classes.button}>
                        上一步
                      </Button>
                    )}
                    {activeStep === 0 && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        下一步
                      </Button>
                    )}
                  </div>
                </Fragment>
              )}
          </Fragment>
        </Paper>
        <Copyright />
      </main>
    </Fragment>
  );
}
