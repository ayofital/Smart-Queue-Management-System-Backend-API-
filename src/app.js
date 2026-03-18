import express, { json, urlencoded } from "express";
import routes from "./routes/index.js";
import errorHandler from "./middleware/error.middleware.js";
import notFoundHandler from "./middleware/notFound.js";
import authRouter from "./routes/auth.routes.js";
import branchRouter from "./routes/branch.route.js";
import userRouter from "./routes/user.routes.js";
import emailRouter from "./routes/email.routes.js";

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes handlers

app.use("/", routes);
app.use("/api/auth", authRouter);
app.use("/api/branches", branchRouter);
app.use("/api/users", userRouter);
app.use("/api/email", emailRouter);

app.get("/api/email/test", (req, res) => {
  res.send("Email route works");
});

// error handling middleware

app.use(notFoundHandler); 
app.use(errorHandler); 
export default app;