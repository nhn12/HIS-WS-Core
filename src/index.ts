import { UserService } from './service/UserService';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import TYPES from './types';
import container from './inversify.config';
import { logger } from './util/Logger';
import { RegistrableController } from './controller/RegisterableController';
import config from '../config/config';
import { ResponseUtil } from './util/ResponseUtils';
// import mongoose from 'mongoose';



// create express application
const app: express.Application = express();

// create mongodb
var mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect('mongodb://' + config.MONGO_HOST + ':' + config.MONGO_PORT + '/' + config.MONGO_DBNAME);
mongoose.Promise = Promise;
 mongoose.set("debug", true);

var allowedOrigins = ['http://127.0.0.1:3000',
                      'http://localhost.com',
                      '*'];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf("*") != -1) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// let express support JSON bodies
app.use(bodyParser.json());

app.use(function (req: any, res: express.Response, next: express.NextFunction) {
    if (req.path.indexOf("/api/login") != -1 || req.path.indexOf("/api/register") != -1) {
        next();
    } else {
        container.getAll<UserService>(TYPES.UserService)[0].checkRequiredLogin(req.headers).then(result => {
            if (!result) {
                res.json(container.getAll<ResponseUtil>(TYPES.ResponseUtil)[0].buildAuthenticationFailed());
            }
            req.user = result;
            next();
        }).catch(err => {
            res.json(res.json(container.getAll<ResponseUtil>(TYPES.ResponseUtil)[0].buildAuthenticationFailed()));
        });
    }
})


// setup express middleware logging and error handling



app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    logger.error(err.stack);
    next(err);
});

app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(500).send('Internal Server Error');
});


var io = require('socket.io').listen(app.listen(3000, ()=>{
    logger.info('Example app listening on port 3000!');
}));

// grabs the Controller from IoC container and registers all the endpoints
const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
controllers.forEach(controller => controller.register(app, io));

