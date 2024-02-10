// index.mjs
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { connectDB } from './connect.js';
import cookieParse from 'cookie-parser';
import { restrictToLoggedInUserOnly, UserAuth, restrictToLoggedInDevOnly, DevAuth } from './middlewares/auth.js';
import staticRoute from './routes/static_router.js';
import userRoute from './routes/user.js';
import devRoute from './routes/developer.js';

connectDB('mongodb://localhost:27017/DataSphereHub').then(() => console.log("Database connected"));

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParse());

app.use('/userhome', restrictToLoggedInUserOnly);
app.use('/devhome', restrictToLoggedInDevOnly);
app.use('/user', userRoute);
app.use('/developer', devRoute);
app.use('/', UserAuth, DevAuth, staticRoute);

import('./admin.mjs').then((adminModule) => {
  const { admin, adminRouter } = adminModule;

  app.use(admin.options.rootPath, adminRouter);
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${`/landing_page`}`);
  });
}).catch((error) => {
  console.error('Error importing admin module:', error.message);
  process.exit(1);
});
