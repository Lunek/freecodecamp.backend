const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

const encodedUriSchema = new Schema({
  originalUrl: { type: String, unique: true, required: true },
});

let encodedUriModel = mongoose.model("encodedUri", encodedUriSchema);

const addUri = (originalUri, callback) => {
  const uri = new encodedUriModel({
    originalUrl: originalUri,
  });
  uri.save((err, data) => callback(err, data));
};

const findUri = (shortUrl, callback) => {
  encodedUriModel.findById(shortUrl, (err, data) => callback(err, data));
};

const findShortUrlByOriginalOrCreateNewOne = (originalUri, callback) => {
  encodedUriModel.findOne({ originalUrl: originalUri }, (err, result) => {
    return result
      ? callback(err, result)
      : addUri(originalUri, (err, result) => callback(err, result));
  });
};

module.exports = {
  findShortUrlByOriginalOrCreateNewOne,
  findUri,
};
