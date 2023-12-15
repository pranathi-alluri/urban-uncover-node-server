import "dotenv/config";
import session from "express-session";
import express from 'express';
import cors from "cors";
import mongoose from "mongoose"
import YelpRoutes from "./yelp/routes.js";
import Hello from "./hello.js";
import UserRoutes from "./users/routes.js";
import LikesRoutes from "./likes/route.js";
import FollowRoutes from "./follows/routes.js"
import ReviewRoutes from "./reviews/route.js";
const CONNECTION_STRING = process.env.DB_UU_CONNECTION_STRING
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(cors({
                 credentials: true,
                 origin: process.env.FRONTEND_URL
             }));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
YelpRoutes(app);
UserRoutes(app);
LikesRoutes(app);
FollowRoutes(app);
ReviewRoutes(app);
Hello(app);
app.listen(process.env.PORT || 4000);