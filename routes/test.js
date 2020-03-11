const router = require("express").Router();
let User = require("../models/user.model");
const mongoose = require("mongoose")
const { check, validationResult } = require('express-validator')
require("dotenv").config();


router.route("/").get((req, res) => {

    res.status(200).json("Test api canvas generator")

});

module.exports = router;

