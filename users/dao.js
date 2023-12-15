import model from "./model.js";
export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
    model.findOne({ username: username });
export const findUserByCredentials = (usr, pass) =>
    model.findOne({ username: usr, password: pass });
export const findByName= (find) =>
    model.find({$or: [
            {firstName: { $regex: new RegExp(find, 'i') }},
            {lastName: { $regex: new RegExp(find, 'i') }},
            {username:{ $regex: new RegExp(find, 'i') }}]
    });
export const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });