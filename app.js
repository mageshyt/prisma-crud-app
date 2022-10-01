const express = require("express");
const createError = require("http-errors");

const morgan = require("morgan");

require("dotenv").config();

const cookesParser = require("cookie-parser");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");

const app = express();
//! regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//! cookie parser middleware
app.use(cookesParser());

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/api", userRouter);

app.use("/api", postRouter);

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.send({
//     status: err.status || 500,
//     message: err.message,
//   });
// });

const PORT = process.env.PORT || 4000;
app.listen(2000, () => console.log(`🚀 @ http://localhost:${PORT}`));
