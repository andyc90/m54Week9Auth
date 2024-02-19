require("dotenv").config();
const express = require("express");

const User = require("./users/model");

const userRouter = require("./users/routes");

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.use(userRouter);

const syncTables = () => {
  User.sync();
};

app.listen(port, () => {
  syncTables();
  console.log(`Server listening on port ${port}`);
});
