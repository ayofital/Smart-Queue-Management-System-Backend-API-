import express, { json, urlencoded } from "express";
import routes from "./routes/index.js";
import errorHandler from "./middleware/error.middleware.js";
import notFoundHandler from "./middleware/notFound.js";
import authRouter from "./routes/auth.routes.js";
import branchRouter from "./routes/branch.route.js";
import userRouter from "./routes/user.routes.js";

const app = express();

// Body parser middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// routes handlers

app.use("/", routes);
app.use("/api/auth", authRouter);
app.use("/api/branches", branchRouter);
app.use("/api/users", userRouter);

// error handling middleware

app.use(notFoundHandler); 
app.use(errorHandler); 
export default app;