const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

//config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routers
app.use("/api/v1/user", require("./routes/userRoutes"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const port = process.env.PORT || 8080;
//listen
app.listen(port, () => {
  console.log(
    `Server running in ${process.env.DEV_MODE} mode on port ${port}`.bgCyan
      .white
  );
});
