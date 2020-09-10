import mongoose = require("mongoose");
import connectionString = require("./mongo_connection_string.json"); // default connection

declare var process: { env: any };

mongoose.connect(process.env.MONGO_URL || connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
