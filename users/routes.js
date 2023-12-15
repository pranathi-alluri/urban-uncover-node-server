import * as dao from "./dao.js";

function UserRoutes(app) {
    const createUser = async (req, res) => {
        const u = await dao.findUserByUsername(
            req.body.username);
        if (u) {
            return res.status(400).json(
                { message: "Username already taken" });
        }
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    const findAllUsers = async (req, res) => {
        const {find} = req.query;
        console.log(find);
        if (find) {
            const usersByName = await dao.findByName(find);
            const users = [...usersByName]
            res.json(users);
        } else {
            const users = await dao.findAllUsers();
            res.json(users);
        }
    };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user) ;

    };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        const currentUser = await dao.findUserById(userId);
        req.session['currentUser'] = currentUser;
        res.json(status);
    };
    const updateUserAdmin = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        res.json(status);
    };
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(
            req.body.username);
        if (user) {
            return res.status(400).json(
                { message: "Username already taken" });
        } try {
            const currentUser = await dao.createUser(req.body);
            req.session['currentUser'] = currentUser;
            res.json(currentUser);
        } catch (err) {
            res.status(400).json(
                { message: "Invalid Login. Please fill out all fields." })
        }
    };
    const signin = async (req, res) => {
        const {username, password} = req.body;
        const user = await dao.findUserByCredentials(username, password);
        if (user) {
            const currentUser = user;
            req.session['currentUser'] = currentUser;
            res.json(currentUser);
        } else {
            res.status(400).json(
                { message: "Invalid Login. Please try again or signup." })
        }
    };
    const signout = (req, res) => {
        req.session.destroy();
        res.json(200);
    };

    const account = async (req, res) => {
        res.json(req.session['currentUser']);
    };

    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.put("/api/users/admin/:userId", updateUserAdmin)
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/account", account);
}
export default UserRoutes;