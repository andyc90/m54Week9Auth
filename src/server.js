require("dotenv").config();
const express = require("express");
const cors = require("cors");

const User = require("./users/model");

const userRouter = require("./users/routes");
const { compareSync } = require("bcrypt");

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());

app.use(express.json());

app.use(userRouter);

const syncTables = () => {
  User.sync();
};

app.listen(port, () => {
  syncTables();
  console.log(`Server listening on port ${port}`);
});
