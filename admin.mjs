import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import Dev from './models/dev.js';
import DASH from './models/dashboards.js';
import REQ from './models/requests.js';
import express from 'express';

AdminJS.registerAdapter({
  Database,
  Resource,
});

const DEFAULT_ADMIN = {
  email: 'admin@gmail.com',
  password: 'admin123',
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

const admin = new AdminJS({
  resources: [
    Dev,
    DASH,
    REQ,
  ],
  rootPath: '/admin',
  authenticate,
  cookieName: 'adminjs',
  cookiePassword: 'sessionsecret',
});

const app = express();

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate,
  cookieName: 'adminjs',
  cookiePassword: 'sessionsecret',
});

app.use(admin.options.rootPath, adminRouter);

export { admin, app }; 
