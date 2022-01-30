const { userList } = require("../data/userData");
const bcrypt = require("bcrypt");

exports.addUser = async (req, res) => {
  const { name, age, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);

  const encryptPassword = await bcrypt.hash(password, salt);
  const userData = {
    id: new Date().getTime().toString(36),
    name,
    age,
    email,
    password: encryptPassword,
    salt,
  };

  userList.push(userData);
  res.json({
    message: "User Created Successfully",
    data: userData,
  });
};

exports.getAllUsers = (req, res) => {
  res.json({
    userList,
  });
};

exports.getUserDetailWithId = (req, res) => {
  const id = req.params.id;
  const singleUser = userList.find((user) => user.id == id);
  if (!singleUser) {
    return res.status(404).json({ message: "No User Found with Id " + id });
  }
  res.json({
    user: singleUser,
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  const isUserExist = userList.some((user) => user.id == id);
  if (!isUserExist) {
    return res.status(404).json({ message: "No User Found" });
  }
  userList.forEach((user) => {
    if (user.id == id) {
      user.name = name ? name : user.name;
      user.email = email ? email : user.email;
      return res.json({ msg: "User updated", user });
    }
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const isUserExist = userList.some((user) => user.id === id);
  if (isUserExist) {
    const index = userList.findIndex((user) => user.id == id);
    userList.splice(index, 1);

    res.json({
      msg: "User deleted successfully",
    });
  } else {
    res.status(404).json({ message: "No User Found" });
  }
};
