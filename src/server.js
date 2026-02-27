import { config } from "dotenv";
import app from "./app.js";

config();

const PORT = process.env.PORT;

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
