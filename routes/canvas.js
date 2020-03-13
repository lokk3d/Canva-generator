const router = require("express").Router();
let Canvas = require("../models/canvas.model");
const mongoose = require("mongoose")
const { check, validationResult } = require('express-validator')
require("dotenv").config();

/*
const username = req.decoded.user;
*/

router.route("/").get((req, res) => {
   const username = req.decoded.user;

   Canvas.find({ author: username })
      .then(canvas => {
         res.status(200).json(canvas)
      })
      .catch(err => res.status(404).json("Error" + err));
});


router.route("/:id").get((req, res) => {
   Canvas.findOne({ _id: req.params.id })
      .then(canvas => {
         res.status(200).json(canvas)
      })
      .catch(err => res.status(404).json("Error" + err));
});



router.route("/add").post([
   check("title").not().isEmpty(),
],
   (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const username = req.decoded.user;
      const canvas = new Canvas({ title: req.body.title, author: username, components: [] });

      canvas.save()
         .then(() => {
            res.status(200).json("New canvas created")
         })
         .catch(err => {
            if (err.code == 11000) {
               res.status(400).json("Error" + err)
            } else {
               res.status(401).json("Error" + err);
            }
         });
   });



router.route("/delete").delete([
   check("_id").not().isEmpty(),

], (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }

   Canvas.findOneAndDelete({ _id: req.body._id })
      .then(doc => {
         res.status(200).json("canvas with id " + req.body._id + "deleted")
      })
      .catch(err => {
         res.status(401).json("Error" + err);
      });
})



router.route("/update").post([
   check("_id").not().isEmpty(),
   check("title").not().isEmpty()
   //add here your variables to validate
],
   (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         console.log(errors.array())
         return res.status(422).json({ errors: errors.array() });
      }

      Canvas.findOne({ _id: req.body._id })
         .then(canvas => {

            //Add here something to modify
            canvas.title = req.body.title
            canvas.components = req.body.components || []
            console.log("Ecco la canvass modificata: ")
            console.log(canvas)
            canvas.save()
            res.status(200).json("canvas with id " + req.body._id + " correctly updated")
         })
         .catch(err => {
            console.log(err.message)
            res.status(404).json("Error" + err);
   }
    );
})

module.exports = router;

