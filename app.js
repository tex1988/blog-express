require('dotenv').config()
const PORT = process.env.PORT;
const express = require('express');
const indexRouter = require('./route/index');
const userRouter = require('./route/user');
const postRouter = require('./route/post');
const commentRouter = require('./route/comment');
const loginRouter = require('./route/login');
const app = express();
const { errorLogger, errorResponder, invalidPathHandler } = require('./middleware/errorHandler');

app.use(express.json());
app.use(express.static('./static'));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/login', loginRouter);

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

app.listen(PORT, () => console.log(`🚀 Server ready at: http://localhost:${PORT}`));
