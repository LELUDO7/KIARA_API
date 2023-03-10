import express from 'express';
import HttpError from 'http-errors';
import UserRepository from '../repositories/user.repository.js';

const router = express.Router();

class FriendRoute {

    constructor() {
        router.patch('/:idUser', this.addRequest)
        router.delete('/:idUser', this.removeRequest)
    }

    async addRequest(req, res, next) {
        var ok = false
        if (req.query.friendid != null) {
            ok = true
        }

        if (!ok) {
            return next(HttpError.NotFound(`no friend id`));
        }

        try {
            let result = await UserRepository.addFriendRequest(req.params.idUser, req.query.friendid);
            if (result === null) {
                return next(HttpError.NotFound(`User ${req.params.idUser} dosen't exist`));
            }
            else {
                res.status(200).json("Resquet add");
            }
        } catch (err) {
            return next(err)
        }
    }

    async removeRequest(req, res, next) {
        try {
            let result = await UserRepository.removeFriendRequest(req.params.idUser, req.body);
            if (result === null) {
                return next(HttpError.NotFound(`User ${req.params.idUser} dosen't exist`));
            }
            else {
                res.status(200).json("Resquet remove");
            }
        } catch (err) {
            return next(err)
        }
    }

}

new FriendRoute();
export default router;