import "reflect-metadata";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";

// Controllers
import {TaskController} from "./controller/TaskController";
import {PagesController} from "./controller/PagesController";

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async connection => {

    console.log("DB Connection created successfully.", connection.isConnected);

    // create express app
    let app = express();
    app.use(bodyParser.json());
    app.use(express.static('./src/public'));

    // setting up 'pug' view engine
    app.set('view engine', 'pug');
    app.set('views','./src/views');

    // register all application routes
    new TaskController("/api/todos", app);
    new PagesController("", app);

    // run app
    app.listen(3000);

    console.log("Express application is up and running on port 3000");

}).catch(error => console.log("TypeORM connection error: ", error));
