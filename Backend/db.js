const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("Issue in db connection", err));
};

module.exports = dbConnect;
