const mongoose = require("mongoose");

mongoose.connect(require("./mongo_connection_string"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
