const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");

const env = process.env.NODE_ENV || "local";

dotenv.config({ path: __dirname + `/config/.env.${env}` });

const { router: shopRouter } = require("./routes/shop");

mongoose.set('strictQuery', false);

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("[MongoDB] Successfully connected.");
})
.catch(err => {
  console.error("[MongoDB] Connection error.", err);
  process.exit();
});

var app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//Adding ejs
app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);
app.use('/assets', express.static(process.cwd() + '/assets'))

//Initialize server
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/admin", require("./routes/admin"));
app.use("/", shopRouter);
//app.use("/routeName", require("./routes/routeName"));

app.listen(process.env.PORT || 8080);