import express from 'express';
import { userRouter } from './controller';
import { app, envPort } from './index';
import ErrorHandler from './middelwares/ErrorHandler';

app.use(express.json());
app.use('/api/users', userRouter);
app.use(ErrorHandler);


app.listen(envPort, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${envPort}`);
});
