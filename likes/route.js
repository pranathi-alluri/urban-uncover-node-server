import * as dao from "./dao.js";

function LikesRoutes(app) {
    const findAllLikes = async (req, res) => {
        const likes = await dao.findAllLikes();
        res.json(likes)
    };
    const createUserLikesBusiness= async (req, res) => {
        const userId = req.params.userId;
        const businessId = req.params.businessId;
        const {name, url} = req.query;
        const likes = await dao.createUserLikesBusiness(userId, businessId, name, url);
        res.json(likes);
    };
    const deleteUserLikesBusiness = async (req, res) => {
        const userId = req.params.userId;
        const businessId = req.params.businessId;
        const status = await dao.deleteUserLikesBusiness(userId, businessId);
        res.json(status);
    };
    const findUsersThatLikeBusiness = async (req, res) => {
        const businessId = req.params.businessId;

        const likes = await dao.findUsersThatLikeBusiness(businessId);
        res.json(likes);
    };
    const findBusinessThatUserLikes = async (req, res) => {
        const userId = req.params.userId;
        const likes = await dao.findBusinessThatUserLikes(userId);
        res.json(likes);
    };
    app.get("/api/likes", findAllLikes);
    app.post("/api/users/:userId/likes/:businessId", createUserLikesBusiness);
    app.delete("/api/users/:userId/likes/:businessId", deleteUserLikesBusiness);
    app.get("/api/likes/:businessId/users", findUsersThatLikeBusiness);
    app.get("/api/users/:userId/likes", findBusinessThatUserLikes);
}

export default LikesRoutes;