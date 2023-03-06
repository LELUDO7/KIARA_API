import express from 'express';
import HttpError from 'http-errors';
import userRepository from '../repositories/user.repository.js';
import UserRepository from '../repositories/user.repository.js';

const router = express.Router();

class UserInfoRoute {

    constructor() {
        router.get('/:srch', this.getAllUserInfo)
    }

    async getAllUserInfo(req, res, next) {
        try {
            var result = await UserRepository.getAllUser(req.params.srch);

            if (result === null) {
                return next(HttpError.NotFound(`No user found`));
            }

            var i = 0
            result.forEach(user => {
                result[i] = user.toObject({ getters: false, virtuals: false });
                result[i] = userRepository.transformByNoSchedule(result[i]);
                i++
            });
            res.status(200).json(result);

        } catch (err) {
            return next(err)
        }
    }

}

new UserInfoRoute();
export default router;