import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },


}, { timestamps: true })

export const User = mongoose.model('user', userSchema)

export const getUser = () => User.find()
export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => User.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => User.findById(id)
export const createUser = (value: Record<string, any>) => new User(value).save().then((user) => user.toObject());
export const delteUserById = (id: string) => User.findByIdAndDelete({ _id: id });
export const updateUserById = (id: string, value: Record<string, any>) => User.findByIdAndUpdate(id, value)




