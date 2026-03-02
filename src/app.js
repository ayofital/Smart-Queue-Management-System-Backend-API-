import express, { json, urlencoded } from "express";
import routes from "./routes/index.js";
import errorHandler from "./middleware/error.middleware.js";
import notFoundHandler from "./middleware/notFound.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }))

/* ==============
Routes Handlers
============== */
app.use("/", routes);

/* =======================
Error Handling Middleware
======================= */
app.use(notFoundHandler); // Route not found handler
app.use(errorHandler); // Global Error Handler must be last

export default app;
