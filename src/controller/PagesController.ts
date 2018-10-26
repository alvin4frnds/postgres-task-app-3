"use strict";
const Router = require('./Router');

export class PagesController extends Router {

    constructor(routePath,app) {
        super(routePath, app);
    }

    get services() {
        return {
            '/tasks': 'taskView',
        };
    }

    taskView(req, res, next) {
        // do something

        res.render('tasks/index');
    }
}