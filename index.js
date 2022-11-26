const mongoose = require("mongoose");
// external imports
const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
// internal imports
const {
  defaultErrorHandler,
  notFound,
} = require("./middlewares/common/defaultErrorHandlear");
const router = require("./routers/router");

dotenv.config({ path: ".env" });

const app = express();
// connect with DataBase
mongoose
  .connect(process.env.MONGO_STR)
  .then(() => console.log("DataBase Connection SuccessFull....."))
  .catch((err) => console.log(`DataBase Error: ${err.message}`));
// use middlewares
app.use(
  cors({
    origin: "https://mahapravufurniture.netlify.app",
    // origin: "http://localhost:3002",
    methods: ["GET", "POST", "PUT"],
  })
);
app.use(express.json());
// decleair static folder
app.use(express.static(`${__dirname}/public/`)); // for static acites

// app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/", router);
app.use(notFound);
app.use(defaultErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App listen on: http://localhost:${process.env.PORT}/`);
});
