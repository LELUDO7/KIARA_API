import express from 'express';
import HttpError from 'http-errors';
import UserRepository from '../repositories/user.repository.js';

const router = express.Router();

class FriendRoute {

    constructor() {
        router.patch('/:idUser', this.addRequest)
    }

    async addRequest(req, res, next) {
        try {
            let result = await UserRepository.addReceiveFriendRequest(req.params.idUser, req.body);
            if (result === null) {
                return next(HttpError.NotFound(`User ${req.params.idUser} dosen't exist`));
            }
            else {
                res.status(200).json("Resquet Add");
            }
        } catch (err) {
            return next(err)
        }
    }

}

new FriendRoute();
export default router;