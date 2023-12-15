import * as dao from "./dao.js";

function ReviewRoutes(app) {
    const findAllReviews = async (req, res) => {
        const likes = await dao.findAllReviews();
        res.json(likes)
    };
    const createReviewForBusiness= async (req, res) => {
        const userId = req.params.userId;
        const businessId = req.params.businessId;
        const {name} = req.query;
        const {rating, comment} = req.body;
        const likes = await dao.createReviewForBusiness(userId, businessId, name, rating, comment);
        res.json(likes);
    };
    const deleteReviewForBusiness = async (req, res) => {
        const userId = req.params.userId;
        const businessId = req.params.businessId;
        const status = await dao.deleteUserReviewBusiness(userId, businessId);
        res.json(status);
    };
    const findReviewForBusiness = async (req, res) => {
        const businessId = req.params.businessId;

        const likes = await dao.findReviewsForBusiness(businessId);
        res.json(likes);
    };
    const findReviewsThatUserMade = async (req, res) => {
        const userId = req.params.userId;
        const likes = await dao.findBusinessThatUserReviewed(userId);
        res.json(likes);
    };
    app.get("/api/reviews", findAllReviews);
    app.post("/api/users/:userId/reviews/:businessId", createReviewForBusiness);
    app.delete("/api/users/:userId/reviews/:businessId", deleteReviewForBusiness);
    app.get("/api/reviews/:businessId", findReviewForBusiness);
    app.get("/api/users/:userId/reviews", findReviewsThatUserMade);
}

export default ReviewRoutes;