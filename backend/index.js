require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const userRoute = require("./src/routes/user.route");
const tableContentRoute = require("./src/routes/tablecontent.route");
const quizRoute = require("./src/routes/quiz.route");
const securityRoute = require("./src/routes/security.route");

// Connecting to Mongo cloud
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.CYBER_URI);
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/table-content", tableContentRoute);
app.use("/api/quiz", quizRoute);
app.use("/api/security", securityRoute);

app.listen(process.env.CYBER_PORT, () => {
  console.log(
    `Example app listening at http://localhost:${process.env.CYBER_PORT}`
  );
});
