const User = require("../models/User");

exports.allUser = async (req, res) => {
  await User.find()
    .select("-__v")
    .exec((err, users) => {
      if (err) {
        res.status(400).json({
          message: "Error in retrieving users",
        });
        return;
      }
      res.status(200).json(users);
      return;
    });
};

exports.findUser = async (req, res) => {
  const { id } = req.params;
  if (id) {
    await User.findById(id)
      .select("-__v -createdAt -updatedAt")
      .exec((err, user) => {
        if (err) {
          res.status(404).json({
            message: "No User Found",
            error: err.message,
          });
          return;
        }
        res.status(200).json(user);
        return;
      });
  } else {
    res.status(400).json({
      message: "No User ID provided",
    });
    return;
  }
};

exports.createUser = async (req, res) => {
  // Validation
  if (!req.body) {
    res.status(400).json({
      message: "Content cannot be empty",
    });
    return;
  }

  const { name, email, status, gender } = req.body;

  const user = new User({
    name,
    email,
    status,
    gender,
  });

  await user.save((err, new_user) => {
    if (err) {
      res.status(400).json({
        message: "Problem in saving User",
      });
      return;
    }
    // return res.json(new_user);
    res.redirect("/");
    return;
  });
};

exports.updateUser = async (req, res) => {
  // Validation
  if (!req.body) {
    res.status(400).json({
      message: "Content cannot be empty",
    });
    return;
  }

  const { id } = req.params;
  if (id) {
    const { name, email, status, gender } = req.body;
    await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        status,
        gender,
      },
      {
        new: true,
        useFindAndModify: false,
      },
      (err, user) => {
        if (err) {
          res.status(404).json({
            message: "User Not Found or Error in Updating",
            error: err,
          });
          return;
        }
        res.status(200).json(user);
        return;
      }
    );
  } else {
    res.status(400).json({
      message: "No ID found",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await User.findById(id);
  try {
    await user.remove((err, oldUser) => {
      if (err) {
        res.status(400).json({
          message: "Cannot Delete User",
          error: err,
        });
        return;
      }
      res.json({
        message: "User Deleted",
      });
    });
  } catch (err) {
    res.status(400).json({
      message: "Cannot Delete User",
      error: err,
    });
    return;
  }
};
