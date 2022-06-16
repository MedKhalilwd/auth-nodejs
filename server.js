const express = require("express");
const { success, error } = require("consola");
require("dotenv").config();
const DB = require('./config/database')
const authRouter = require("./Routes/authRouter");

const PORT = process.env.APP_PORT;
const DOMAIN = process.env.APP_DOMAIN;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", authRouter);


app.listen(PORT, async () => {
  try {
    success({
      message: `Server started on PORT ${PORT} ` + `URL : ${DOMAIN}`,
      badge: true,
    });
  } catch (err) {
    error({ message: "error with server", badge: true });
  }
});
