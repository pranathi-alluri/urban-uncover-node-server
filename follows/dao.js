import followModel from "./models.js";

export const userFollowsUser = (follower, followed) =>
    followModel.create({ follower, followed });
export const userUnfollowsUser = (follower, followed) =>
    followModel.deleteOne({ follower, followed });
export const findFollowersOfUser = (followed) =>
    followModel.find({ followed }).populate("follower");
export const findFollowedUsersByUser = (follower) =>
    followModel.find({ follower }).populate("followed");