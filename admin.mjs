import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import mongoose from 'mongoose';
import Dev from './models/dev.js';


AdminJS.registerAdapter({
  Database,
  Resource,
});

const admin = new AdminJS({
  resources: [
    {
      resource: Dev,
    },
  ],
});

const adminRouter = AdminJSExpress.buildRouter(admin);

export { admin, adminRouter };
