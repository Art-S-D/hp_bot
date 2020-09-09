const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL || require("./mongo_connection_string"),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);
