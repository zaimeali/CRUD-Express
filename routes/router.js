const { Router } = require("express");
const {
  homeRoute,
  addUserRoute,
  editUserRoute,
  deleteUserRoute,
} = require("../services/render");

const router = Router();

router.get("/", homeRoute);

router.get("/add-user", addUserRoute);

router.get("/edit-user/:id", editUserRoute);

router.get("/delete-user/:id", deleteUserRoute);

module.exports = router;
