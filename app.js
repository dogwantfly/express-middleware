const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AppError = require('./utils/appError');
const errorHandler = require('./utils/errorHandler');

process.on('uncaughtException', err => {
	console.error('Uncaughted Exception！')
	console.error(err);
	process.exit(1);
});
dotenv.config({path: './config.env'});
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('資料庫連接成功'))
  .catch((error) => {console.error(error)});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.use(function(req, res, next) {
  res.status(404).json({
    status: 'error',
    message: "無此頁面資訊",
  });
});


// error handler (接到錯誤後進到這邊)
app.use(errorHandler);

process.on('unhandledRejection', (reason, promise) => {
  console.error('未捕捉到的 rejection：', promise, '原因：', reason);
});
module.exports = app;
