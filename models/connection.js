const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/dev", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
