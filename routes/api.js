const { Router } = require("express");
const {
  createUser,
  allUser,
  updateUser,
  deleteUser,
  findUser,
} = require("../controllers/User");

const router = Router();

router.get("/check", (req, res) => {
  res.send("check done");
});

router.get("/user/:id", findUser);
router.get("/users", allUser);
router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
