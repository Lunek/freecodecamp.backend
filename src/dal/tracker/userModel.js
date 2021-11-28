const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

const usersSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
  },
  { versionKey: false }
);

let usersModel = mongoose.model("users", usersSchema);

const createUser = (username, callback) => {
  const user = new usersModel({
    username: username,
  });
  user.save((err, data) => callback(err, data));
};

const getAllUsers = (callback) => {
  usersModel.find((err, data) => callback(err, data));
};

module.exports = {
  createUser,
  getAllUsers,
};
