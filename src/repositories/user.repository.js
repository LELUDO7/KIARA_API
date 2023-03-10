
import { query } from 'express';
import User from '../models/user.model.js';

class UserRepository {

    addFriendRequest(idUser, idfriend) {
        const idUserQ = { "idUser": idUser };
        const  idfriendQ= { "idUser": idfriend };
        var result = User.findOneAndUpdate(idUserQ, { $addToSet: {"pendingSendFriend":[idfriend]} });
        result = User.findOneAndUpdate(idfriendQ, { $addToSet: {"pendingReciveFriend":[idUser]} });
        return result;
    }

    removeFriendRequest(idUser, body) {
        const query = { "idUser": idUser };
        const result = User.findOneAndDelete(query, { $addToSet: body });
        return result;
    }

    updateUserById(idUser, body) {
        const query = { "idUser": idUser };
        const result = User.findOneAndUpdate(query, body);
        return result;
    }

    getByUserId(idUser) {
        const query = { "idUser": idUser };
        const retrieveQuery = User.findOne(query);
        return retrieveQuery;

    }

    getAllUser(query) {
        const queryRegex = new RegExp(query);
        const retrieveQuery = User.find({ firstName: { $regex: queryRegex} });
        return retrieveQuery;
    }

    transformByNoSchedule(user) {
        delete user.schedule;
        delete user._id;
        delete user.friends
        delete user.pendingReciveFriend
        delete user.pendingSendFriend
        delete user.createdAt;
        delete user.updatedAt;
        delete user.__v;
        return user
    }

    transform(user) {
        delete user._id;
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

