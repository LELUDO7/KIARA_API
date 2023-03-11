import express from 'express';
import HttpError from 'http-errors';
import UserRepository from '../repositories/user.repository.js';

const router = express.Router();

class FriendRequestRoute {

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
            let result1 = await UserRepository.addFriendSendRequest(req.params.idUser, req.query.friendid);
            let result2 = await UserRepository.addFriendReciveRequest(req.query.friendid, req.params.idUser);
            if (result1 === null) {
                return next(HttpError.NotFound(`The user ${req.params.idUser} dosent exist`));
            }
            else if (result2 === null) {
                return next(HttpError.NotFound(`The user ${req.query.friendid} dosent exist`));
            }
            else {
                res.status(200).json("friend resquet add");
            }
        } catch (err) {
            return next(err)
        }
    }

    async removeRequest(req, res, next) {
        var ok = false
        if (req.query.friendid != null) {
            ok = true
        }

        if (!ok) {
            return next(HttpError.NotFound(`no friend id`));
        }

        try {
            let result1 = await UserRepository.removeFriendSendRequest(req.params.idUser, req.query.friendid);
            let result2 = await UserRepository.removeFriendReciveRequest(req.query.friendid, req.params.idUser);
            if (result1 === null) {
                return next(HttpError.NotFound(`The user ${req.params.idUser} dosent exist`));
            }
            else if (result2 === null) {
                return next(HttpError.NotFound(`The user ${req.query.friendid} dosent exist`));
            }
            else {
                res.status(200).json(`Friend resquet remove`);
            }
        } catch (err) {
            return next(err)
        }
    }

}

new FriendRequestRoute();
export default router;