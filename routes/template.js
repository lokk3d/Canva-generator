const router = require("express").Router();
let Template = require("../models/template.model");
const mongoose = require("mongoose")
const { check, validationResult } = require('express-validator')
require("dotenv").config();


router.route("/").get((req, res) => {

    Template.find()
      .then(template => {
         res.status(200).json(template)
      })
      .catch(err => res.status(404).json("Error" + err));
});


router.route("/:id").get((req, res) => {
    Template.findOne({_id: req.params.id })
      .then(template => {
         res.status(200).json(template)
      })
      .catch(err => res.status(404).json("Error" + err));
});



router.route("/add").post([
   check("title").not().isEmpty(), 
   check("components").not().isEmpty(), 
   //add here your variables to validate
],
   (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });
      }

      const template = new Template({ title: req.body.title, components: req.body.components });

      template.save()
         .then(() => {
            res.status(200).json("New template created")
         })
         .catch(err => {
            if (err.code == 11000) {
               res.status(400).json("Error" + err)
            }
            res.status(401).json("Error" + err);
         });
   });



router.route("/delete").delete([
   check("_id").not().isEmpty(),

], (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }

   Template.findOneAndDelete({ _id: req.body._id })
      .then(doc => {       
         res.status(200).json("Template with id "+ req.body._id +"deleted")
      })
      .catch(err => {
         res.status(401).json("Error" + err);
      });
})



 

module.exports = router;

