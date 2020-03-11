const router = require("express").Router();
let Canva = require("../models/canva.model");
const mongoose = require("mongoose")
const { check, validationResult } = require('express-validator')
require("dotenv").config();

/*
const username = req.decoded.user;
*/

router.route("/").get((req, res) => {
   const username = req.decoded.user;

    Canva.find({author:username})
      .then(canva => {
         res.status(200).json(canva)
      })
      .catch(err => res.status(404).json("Error" + err));
});


router.route("/:id").get((req, res) => {
    Canva.findOne({_id: req.params.id })
      .then(canva => {
         res.status(200).json(canva)
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
      const canva = new Canva({ title: req.body.title, author: username, components: []});

      canva.save()
         .then(() => {
            res.status(200).json("New canva created")
         })
         .catch(err => {
            if (err.code == 11000) {
               res.status(400).json("Error" + err)
            }else{
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

   Canva.findOneAndDelete({ _id: req.body._id })
      .then(doc => {       
         res.status(200).json("Canva with id "+ req.body._id +"deleted")
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
          return res.status(422).json({ errors: errors.array() });
       }
 
       Canva.findOne({_id: req.body._id })
       .then(canva => {

          //Add here something to modify
          canva.title = req.body.title 
          canva.components = req.body.components || []     
         
          canva.save()
          res.status(200).json("canva with id "+ req.body._id +" correctly updated")
       })
       .catch(err => res.status(404).json("Error" + err));
    });
 

module.exports = router;

