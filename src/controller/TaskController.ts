"use strict";
import { Todo } from '../entity/Todo';
import { getConnection } from "typeorm";

const Router = require('./Router');
const DEFAULT_USER_ID = 2;

export class TaskController extends Router {
    private todosRepository;

    constructor(routePath,app) {
        super(routePath, app);

        this.todosRepository = getConnection().getRepository(Todo);
    }

    get services() {
        return {
            '/': 'fetchAll',
            '/:id': 'fetch',
            'POST /create': 'create',
            'PATCH /:id': 'update'
        };
    }

    fetchAll(req, res, next) {
        // do something

        this.todosRepository
            .createQueryBuilder("todo")
            .where("todo.user_id = :user", {user: DEFAULT_USER_ID})
            .orderBy("todo.id", "DESC")
            .getMany()
            .then(todos =>
                res.send(this.build("Here you go ", 1, { todos }))
            ).catch(error =>console.error(error));
    }

    fetch(req, res, next) {
        this.todosRepository
            .findOne(req.params.id)
            .then(todo =>
                res.send(this.build("Here you go ", !! todo ? 1 : 0, { todo }))
            ).catch(error => console.error(error));
    }

    create(req, res, next) {
        const todo = new Todo();
        todo.body = req.body.body;
        todo.done = false;
        todo.user_id = DEFAULT_USER_ID;

        this.todosRepository.save(todo)
            .then(todo =>
                res.send(this.build("Creating..", 1, {todo}))
            ).catch(error => console.error(error));
    }

    update(req, res, next) {
        // do something
        this.todosRepository
            .findOne(req.params.id)
            .then(todo => {
                todo.body = req.body.body;
                todo.done = req.body.done;
                this.todosRepository.save(todo);

                res.send(this.build("Here you go ", !! todo ? 1 : 0, { todo }))
            }).catch(error => console.error(error));
    }
}