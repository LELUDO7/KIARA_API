import express, { response } from 'express';

const router = express.Router();

class APIStatusRoute {

    constructor() {
        router.head('/', this.up)
    }

    async up(req, res, next) {
        try {
            res.status(200).json();
        } catch (err) {
            return next(err)
        }
        
    }
}

new APIStatusRoute();
export default router;
