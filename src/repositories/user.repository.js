
import { query } from 'express';
import User from '../models/user.model.js';

class UserRepository {

    updateUserById(idUser, body) {
        const query = { "idUser": idUser };
        const result = User.findOneAndUpdate(query, body);
        return result
    }

    getByUserId(idUser) {
        const query = { "idUser": idUser };
        const retrieveQuery = User.findOne(query);
        return retrieveQuery;

    }

    getAllUser(query) {
        const queryRegex = new RegExp(query);
        const retrieveQuery = User.find({ firstName: { $regex: query} });
        return retrieveQuery;
    }

    transformByNoSchedule(user) {
        delete user.schedule;
        delete user._id;
        delete user.friends
        delete user.createdAt;
        delete user.updatedAt;
        delete user.__v;
        return user
    }

    transform(user) {
        delete user._id;
        delete user.friends
        delete user.createdAt;
        delete user.updatedAt;
        delete user.__v;
        return user
    }

    retrieveById(idUser) {
        const User = User.findById(idUser);
        return User;
    }

    create(user) {
        User.create(user);
    }
}

export default new UserRepository();

