const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
  },
  { versionKey: false }
);
const exerciseSchema = new Schema(
  {
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

let userModel = mongoose.model("User", userSchema);
let exerciseModel = mongoose.model("Exercise", exerciseSchema);

const createUser = (username, callback) => {
  const user = new userModel({
    username: username,
  });
  user.save((err, data) => callback(err, data));
};

const getAllUsers = (callback) => {
  userModel.find((err, data) => callback(err, data));
};

const createExerciseByUserId = (userId, exercise, callback) => {
  const { description, duration, date } = exercise;
  exerciseModel.create(
    {
      description: description,
      duration: duration,
      date: date,
      user: userId,
    },
    (err, exer) => {
      if (!err) {
        exerciseModel
          .findById(exer._id)
          .populate("user")
          .exec((err, data) => callback(err, data));
      } else {
        callback(err, exer);
      }
    }
  );
};

module.exports = {
  createUser,
  getAllUsers,
  createExerciseByUserId,
};
