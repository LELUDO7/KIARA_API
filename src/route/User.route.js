import express from 'express';
import HttpError from 'http-errors';
import UserRepository from '../repositories/user.repository.js';

const router = express.Router();

class UserRoute {

    constructor() {
        router.patch('/:idUser', this.updateUser)
        router.head('/:idUser', this.checkIfUserExist)
        router.get('/:idUser', this.getById)
        router.post('/', this.creatUser)
    }
    
    async updateUser(req, res, next) {
        try {
            let result = await UserRepository.updateUserById(req.params.idUser, req.body);
            if (result === null) {
                return next(HttpError.NotFound(`User ${req.params.idUser} dosen't exist`));
            }
            else {
                res.status(200).json();
            }
        } catch (err) {
            return next(err)
        }
    }

    async checkIfUserExist(req, res, next) {
        try {
            let result = await UserRepository.getByUserId(req.params.idUser);

            if (Object.keys(result).length === 0) {
                return next(HttpError.NotFound(`User ${req.params.idUser} dosen't exist`));
            }
            else {
                res.status(200).json(); 
            }
            
        } catch (err) {
            return next(err)
        }
    }

    async creatUser(req, res, next) {
        
        try {
            if (Object.keys(req.body).length === 0) {
                return next(HttpError.BadRequest('User can not be empty'));
            }
            await UserRepository.create(req.body);
            
            res.status(200).json();
        } catch (err) {
            return next(err);
        }
    }

    async getById(req, res, next) {

        try {
            var user = await UserRepository.getByUserId(req.params.idUser);

            if (Object.keys(user).length === 0) {
                return next(HttpError.NotFound(`Schedule whit id ${req.params.idUser} dosent exist.`));
            }
            user = user.toObject({ getters: false, virtuals: false });
            user = UserRepository.transform(user);

            res.status(200).json(user);
        }
        catch (err) {
            return next(err);
        }
    }
}

new UserRoute();
export default router;