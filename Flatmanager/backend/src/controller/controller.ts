import { json, Request, Response } from "express";
import { Repository } from "typeorm";

export abstract class Controller {
    repo: Repository<any>;

    getAll = async (req, res) => {
        try {
            const allEntities = await this.repo.find();
            res.json(allEntities);
        } catch (error) {
            console.error();
            this.handleError(res);
        };
    }

    getOne = async (req, res) => {
        const id = req.params.id;
        try {
            const entity = await this.repo.findOne(id)
            if (!entity) {
                this.handleError(res, 404, "No entity exists with the provided ID.");
                return;
            }
            else {
                res.json(entity);
            }
        } catch (error) {
            console.error();
            this.handleError(res);
        };
    }

    create = async (req, res) => {
        try {
            const entityAdded = await this.repo.save(this.repo.create(req.body));
            res.json(entityAdded);
        } catch (error) {
            console.error();
            this.handleError(res);
        };
    }

    update = this.create;
    
    delete = async (req, res) => {
        const id = req.params.id;
        try {
            if (!await this.repo.findOne(id)) {
                this.handleError(res, 404, "No entity exists with this ID.");
                return;
            }
            else {
                await this.repo.delete(id);
                res.json({ success: "true" });
            }
        } catch (error) {
            console.error();
            this.handleError(res);
        };
    }

    handleError(res, status: number = 500, message: string = 'Server error occurred.') {
        res.status(status).json({ message });
    }

}