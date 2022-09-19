const express = require("express")
const router =  express.Router()

const v1ControlMovies = require('../controllers/controlMovies.js')
const v1ControlCharacters = require('../controllers/controlCharacters.js')

const v1ControlImages = require('../controllers/controlImages')
const v1genreCreator = require('../controllers/genreCreator')
const v1RegistControl = require('../controllers/userControl')
const v1ControlEmail = require('../controllers/nodemailer.js')

 router.get("/movies" , v1ControlMovies.getMovies);

 

router.post("/createMovie", v1ControlMovies.createMovie);

router.get("/movies/:id", v1ControlMovies.getById);

router.get("/mov", v1ControlMovies.getByname);

// characters endpoints

router.post("/createCharacter", v1ControlCharacters.createCharacter);

router.get("/character", v1ControlCharacters.searchBy);
// other endpoints

router.post("/upload", v1ControlImages.upload);

router.post("/createGenre", v1genreCreator.createGenre);

router.get("/files/:name", v1ControlImages.download);





router.get("/email" , v1ControlEmail.sendEmail);

router.post("/auth/register", v1RegistControl.registerUser);

router.post("/protected", v1RegistControl.ensureToken,v1RegistControl.protectedSection);

router.post("//auth/login", v1RegistControl.login);

//router.patch("/:patchId", v1Controller.updateOneWorkout);

//router.delete("/:deleteById", v1Controller.deleteOneWorkout);  

// exporting modules
module.exports = router
