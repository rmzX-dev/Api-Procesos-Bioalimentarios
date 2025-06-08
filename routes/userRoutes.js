const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

// Rutas GET
router.get("/user/:id", UserController.getUserById);
router.get("/user", UserController.findAllUsers);

// Rutas PUT
router.put("/user/:id", UserController.updateUser);

// Rutas POST
router.post("/user/", UserController.createUser);

router.post("/login", UserController.loginUser);

module.exports = router;
