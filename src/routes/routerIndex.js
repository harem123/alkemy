const express = require("express")
const router =  express.Router()
const v1Controller = require('../controllers/controllers.js')
const v1ControlMovies = require('../controllers/controlMovies.js')

router.get("/", v1Controller.getAllinfo)

router.get("/:getId",v1Controller.getInfoByUser);

router.post("/createUser", v1Controller.createUser);

router.post("/createMovie", v1ControlMovies.createMovie);

//router.post("/createGenre", v1ControlMovies.createGenre);


//router.patch("/:patchId", v1Controller.updateOneWorkout);

//router.delete("/:deleteById", v1Controller.deleteOneWorkout);  

// exporting modules
module.exports = router