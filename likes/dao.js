import model from "./model.js";

export const findAllLikes = () => model.find();
export const createUserLikesBusiness = (userId, business, businessName, businessImage) =>
    model.create({ user: userId, businessId: business, businessName, businessImage});
export const deleteUserLikesBusiness = (userId, business) =>
    model.deleteOne({ user: userId, businessId: business });
export const findUsersThatLikeBusiness= (business) =>
    model.find({ businessId: business }).populate("user");
export const findBusinessThatUserLikes = (userId) => model.find({ user: userId });