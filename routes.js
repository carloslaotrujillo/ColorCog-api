const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const colors = require("./controllers/color");
const login = require("./controllers/login");
const profile = require("./controllers/profile");
const register = require("./controllers/register");

const jwtAuth = passport.authenticate("jwt", {
	session: false,
});

router.post("/login", login.handleLogin());
router.post("/profile", jwtAuth, profile.handleProfile());
router.post("/register", register.handleRegister());

router.post(`/api/${process.env.API_VERSION}/color/upsert`, colors.upsertColor());
router.post(`/api/${process.env.API_VERSION}/color/url`, colors.getUrlColorsFromAI());
router.post(`/api/${process.env.API_VERSION}/color/file`, upload.single("image"), colors.getFileColorsFromAI());

module.exports = router;
