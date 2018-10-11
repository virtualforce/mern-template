const express = require("express");
const router = express.Router();

const SessionsController = require("../../controllers/sessions_controller");
const RegistrationsController = require("../../controllers/registrations_controller");

// @route   POST /api/login
// @desc    Allow user to login & generate JWT Token
// @access  Public
router.post("/login", SessionsController.create);

// @route   POST /api/signup
// @desc    Register a new User
// Access   Public
router.post("/signup", RegistrationsController.create);

module.exports = router;
