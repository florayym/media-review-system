import createError from 'http-errors';
import express from 'express'; // { json, urlencoded, static }
import path from 'path'; // { join }
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import reviewersRouter from './routes/reviewer.js';
import mediaRouter from './routes/media.js';
import historyRouter from './routes/history.js';
//import downloadRouter from './routes/download.js';

import db from './db/index.js';

const app = express();

const __dirname = path.resolve(path.dirname(''));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/reviewers', reviewersRouter);
app.use('/api/media', mediaRouter);
app.use('/api/history', historyRouter);
//app.use('/api/download', downloadRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
