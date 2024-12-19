import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import reactionRouter from './router/reactions';
import resourceRouter from './router/resource';
import userRouter from './router/users';
import { errorHandler } from './middleware/error';
import verification from './middleware/verification';
import PostRouter from './router/posts';

const app = express();

app.set('port', 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req: Request, _: Response, next: NextFunction) => {
  console.log(req.url, 'express log');
  next();
})

// CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, PUT, DELETE, PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if ('OPTIONS' === req.method) {
    res.sendStatus(200)
  } else {
    next();
  }
});

app.get('/', (_: Request, res: Response) => {
  res.send('minstagram apis running..')
});

app.use('/v1/reactions', verification, reactionRouter);
app.use('/v1/users', userRouter);
app.use('/v1/upload', verification, resourceRouter);
app.use('/v1/posts', verification, PostRouter);

app.use('/static', express.static('post-uploads'))

app.use(errorHandler)

export default app;