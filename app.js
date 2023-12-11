import "dotenv/config";
import session from "express-session";
import express from 'express';
import cors from "cors";
import YelpRoutes from "./yelp/routes.js";
import Hello from "./hello.js";
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
Hello(app);
app.listen(process.env.PORT || 4000);