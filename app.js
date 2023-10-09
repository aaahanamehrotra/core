const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();

const app = express();

require("./config/passport")(passport);

db = process.env.MONGOURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(console.log("connected to db"))
  .catch((err) => console.log(err));

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.login = req.isAuthenticated();

  next();
});

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/product", require("./routes/product"));
app.use("/ticket", require("./routes/ticket"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("listening"));
// const Ticket = require("./models/Ticket");
// const P = new Ticket({});
// t = P.save();
// const Product = require("./models/Product");

// const P = new Product({
//   name: "lorem ipsum",
//   cost: 34,
//   stock: 4,
//   image:
//     "https://media.istockphoto.com/id/163208487/photo/male-coat-isolated-on-the-white.jpg?s=612x612&w=0&k=20&c=3Sdq5xnVS2jOYPNXI6JLwAumzyelcP_VgKVW0MVUhwo=",
//   desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates nostrum corrupti quas, exercitationem fugit laudantium error iure, delectus maxime, officiis animi! Est corporis temporibus dolorem ratione tempore dignissimos at aliquid? Ullam, officia?",
// });
// const savedPost = P.save();
