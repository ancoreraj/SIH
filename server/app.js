const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

//Importing config files
dotenv.config({ path: "./config/config.env" });

// Enabling cross origin request
const corsOptions = {
    origin: ["http://localhost:3000", "https://example.com/"],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

// Enabling pre-flight reqeust across 
app.options('*', cors(corsOptions));

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("conneted to mongo yeahh");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

require("./models/User");
require("./models/State");
require("./models/Jobs");

//Requiring routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/jobs", require("./routes/jobs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  //Running Mongoose
  
  console.log("server is running on", PORT);
});
