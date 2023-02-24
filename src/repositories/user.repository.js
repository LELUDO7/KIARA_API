
import User from '../models/user.model.js';

class UserRepository {

    updateUserById(idUser, body) {
        const query = {"idUser":idUser};
        const result = User.findOneAndUpdate(query, body);
        return result
    }

    getByUserId(idUser) {
        const query = {"idUser":idUser};
        const retrieveQuery = User.findOne(query);
        return retrieveQuery;
        
    }

    transform(user) {
        delete user._id;
        delete user.friends
        delete user.createdAt;
        delete user.updatedAt;
        delete user.__v;
        return user
    }
    
    retrieveById(idUser){
        const User = User.findById(idUser);
        return User;
    }

    create(user) {
        User.create(user);
    }
}

export default new UserRepository();

