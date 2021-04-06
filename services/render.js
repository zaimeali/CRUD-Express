const axios = require("axios");

exports.homeRoute = (req, res) => {
  axios
    .get("http://localhost:8001/api/users")
    .then((response) =>
      res.render("index", { title: "CRUD App", users: response.data })
    )
    .catch((err) => console.error(err));
};

exports.addUserRoute = (req, res) => {
  res.render("add_user", { title: "Add User" });
};

exports.editUserRoute = (req, res) => {
  let id = req.params.id;
  axios
    .get(`http://localhost:8001/api/user/${id}`)
    .then((response) =>
      res.render("update_user", {
        title: "Edit User",
        id: id,
        user: response.data,
      })
    )
    .catch((err) => console.error(err));
};

exports.deleteUserRoute = (req, res) => {
  let id = req.params.id;
  res.send(id);
};
