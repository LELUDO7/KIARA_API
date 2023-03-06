import express from 'express';
import database from './libs/database.js';
import userRoute from './route/User.route.js'
import userInfoRoute from './route/UserInfo.route.js'
import APIStatusRoute from './route/APIStatus.js'

database();

const app = express();

app.use(express.json());

app.use('/user', userRoute);
app.use('/userinfo', userInfoRoute);
app.use('/apistatus', APIStatusRoute);

export default app;