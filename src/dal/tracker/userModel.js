const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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
    date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

const exerciseModel = model("Exercise", exerciseSchema);
const userModel = model("User", userSchema);

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
        userModel.findOneAndUpdate(
          { _id: userId },
          { $push: { exercises: exer } },
          (err, doc, res) => {
            if (!err) {
              exerciseModel
                .findById(exer._id)
                .populate("user")
                .exec((err, data) => callback(err, data));
            }
          }
        );
      } else {
        callback(err, exer);
      }
    }
  );
};

const getAllLogsByUserId = (userId, callback) => {
  userModel
    .findById(userId)
    .populate("exercises", "-_id description duration date")
    .exec((err, data) => {
      callback(err, data);
    });
};

const getAllLogsByUserIdWithFilteres = (userId, filters, callback) => {
  userModel
    .findById(userId)
    .populate({
      path: "exercises",
      select: "-_id description duration date",
      match: {
        data: {
          $gte: filters.from,
          $lt: filters.to,
        },
      },
      options: {
        limit: filters.limit,
      },
    })
    .exec((err, data) => {
      callback(err, data);
    });
};

module.exports = {
  createUser,
  getAllUsers,
  createExerciseByUserId,
  getAllLogsByUserId,
  getAllLogsByUserIdWithFilteres
};
