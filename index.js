const express = require("express");

const app = express();

const userRoutes = require("./routes/users.routes");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json("Welcome to UserManagement");
});

const port = 3000;
app.listen(port, () => console.log("Server started ! Port Number" + port));
