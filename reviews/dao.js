import model from "./model.js";

export const findAllReviews = () => model.find();
export const createReviewForBusiness = (userId, business, name, rating, comment) =>
    model.create({ user: userId, businessId: business, businessName: name, rating, comment});
export const deleteUserReviewBusiness = (userId, business) =>
    model.deleteOne({ user: userId, businessId: business });
export const findReviewsForBusiness= (business) =>
    model.find({ businessId: business }).populate("user");
export const findBusinessThatUserReviewed = (userId) => model.find({ user: userId });