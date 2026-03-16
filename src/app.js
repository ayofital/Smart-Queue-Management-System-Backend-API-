import express, { json, urlencoded } from "express";
import routes from "./routes/index.js";
import errorHandler from "./middleware/error.middleware.js";
import notFoundHandler from "./middleware/notFound.js";
import auth_router from "./routes/auth.routes.js";
import branch_router from "./routes/branch.route.js";
import userRouter from "./routes/user.routes.js"
import staff_router from "./routes/staff.routes.js";
import queue_router from "./routes/queue.routes.js";
import counter_router from "./routes/counter.routes.js";

// import authRoutes from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

/* ==============
Routes Handlers
============== */
app.use("/", routes);
app.use("/api/auth/", auth_router);
app.use("/api/branches/", branch_router);
// app.use("/api/auth", authRoutes)
app.use("/api/users", userRouter)
app.use("/api/staff", staff_router);
app.use("/api/queues", queue_router);
app.use("/api/counters", counter_router);

/* =======================
Error Handling Middleware
======================= */
app.use(notFoundHandler); // Route not found handler
app.use(errorHandler); // Global Error Handler must be last

export default app;
