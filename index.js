const express = require("express");

const app = express();
require("dotenv").config();

const userRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.router");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json("Welcome to UserManagement");
});

const port = 3000;
app.listen(port, () => console.log("Server started ! Port Number" + port));
