const bcrypt = require("bcrypt");
const User = require("../data/userData");
const Op = require("sequelize").Op;
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  const { name, email, password } = req.body;

  const emailExist = await User.findOne({ where: { email } });

  // checking Email Already Exist
  if (emailExist) {
    return res.status(409).json({ message: "User with email already exists!" });
  }

  const salt = await bcrypt.genSalt(10);
  const encryptPassword = await bcrypt.hash(password, salt);
  const userData = {
    name,
    email,
    password: encryptPassword,
    salt,
  };

  const newUser = new User(userData);
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser)
    res.json({
      message: "User Created Successfully",
    });
};

exports.getAllUsers = async (req, res) => {
  const usersList = await User.findAll();
  res.json({
    usersList,
  });
};

exports.getUserDetailWithId = async (req, res) => {
  const id = req.params.id;
  const singleUser = await User.findByPk(id);
  if (!singleUser) {
    return res.status(404).json({ message: "No User Found with Id " + id });
  }
  res.json({
    user: singleUser,
  });
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  // checking Email Already Exist
  const emailExist = await User.findOne({
    where: { email, id: { [Op.ne]: id } },
  });

  if (emailExist) {
    return res.status(409).json({ message: " Email already exists!" });
  }

  const result = await User.update({ name, email }, { where: { id } }).catch(
    (err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot register user at the moment!" });
    }
  );

  res.json({
    message: "User Updated Successfully",
  });
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  const result = await User.destroy({ where: { id } });
  res.json({
    message: "User deleted successfully",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await (
    await User.findOne({ where: { email } })
  ).get({ plain: true });

  if (!user) {
    return res.status(401).json({ error: "Invalid Email or Password" });
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    return res.status(401).json({ error: "Invalid Email or Password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET
  );

  res.json({
    token,
  });
};
