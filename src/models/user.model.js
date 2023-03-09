import mongoose from "mongoose";

const bloc = mongoose.Schema({
    name: { type: String, required: true },
    local: { type: String, require: true },
    nbBloc: { type: Number, require: true },
    display: { type: Boolean, require: true },
    color: { type: String, require: true }
});


const userSchema = mongoose.Schema({
    idUser: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    schedule: [[bloc]],
    friends: [String],
    pendingReciveFriend: [String],
    pendingSendFriend: [String]
}, {

    collection: "user",
    strict: "throw",
    timestamps: true
});
export default mongoose.model("user", userSchema);