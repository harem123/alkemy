// requerido para subir las fotos 
const uploadFile = require("../services/uploadService.js");
const fs = require("fs");
const url = require('url');
// aqui ojo esta la direccion donde apunto el descargar la imagen 
const baseUrl = "http://localhost:3000/images/";
// importo el modelo
const v1ServiceCharacter = require('../services/characterService.js')
const v1Services = require('../services/services.js')
const db = require("../../models/index.js");
const characterAssociateModel = db.character_movie;
const characterModel = db.character


//TODO implement foreign keys and cascade delete and update 

const searchBy= async (req,res) => {
  try{
    
    let allData= null
    let firstKey=Object.keys(req.query)[0];
    switch (firstKey) {
      case 'name':
        const byName = {
          name: req.query.name
        }
        allData = await v1ServiceCharacter.getByFilter(byName)
        break
      case 'age':
        const byAge = {
          age: req.query.age
        }
        allData = await v1ServiceCharacter.getByFilter(byAge)
        break
      case 'movieId':
        const byMovie = { movieId: req.query.movieId }
        allData = await v1ServiceCharacter.getByMovieId(byMovie)
        break
      default: console.log("def")
        
    }
    //TODO review if it is better send raw data 
    res.status(200).send({data:allData});
  }
  catch (error) {
    console.log(error)
    res.status(500).send({status:"FAILED"});
  } 
    
}


const createCharacter = async (req, res) => {
  await uploadFile(req,res)
  const link = baseUrl + req.file.originalname
  const arras = req.body.movieArr
  const dataj = JSON.parse(arras); 

  const {body} = req
  if ( 
    !body.name
  ){
    return
  }
 // inicializo la info
 const newInsert= {
  name: body.name,
  img_link: link,
  age: body.age,
  history: body.history,
  weight: body.weight // decimal
 }  
  try {
    createdId= await v1ServiceCharacter.postCharacter(newInsert)
    res.status(201).send({status:"OK", CreatedId: createdId} );
    // inserto con el id en la tabla movie-genre 
    // TODO agregar un propio try catch para genre movie insertion  
    // TODO make insertion from service and get not use any models from crontroller
    for (i = 0; i < dataj.length; i++) {
      const arras= {
          characterId: createdId,
          movieId: dataj[i]
         }
         characterAssociateModel.create(arras);
    } 
  } catch (error) {
    console.log(error)
    res.status(500).send({status:"FAILED"});
  } 
};

const deleteCharacterByName = async (req,res) => {
  const byName = {
    name: req.query.name
  }

  const deleteResult = v1Services.destroyer(filter= byName,model=characterModel)
  res.status(200).send({deleteResult});

}

const updateCharacter = async (req,res) =>{
  //TODO create response
  //TODO use try catch
  // TODO use success sequelize
const valueBody = req.body.value
//console.log(valueBody)
const filterBody = req.body.filter
console.log(filterBody)
  const value = 
    {
    name: "lolipop"
  }
  const filter =
  {
    where: filterBody
  }
     await v1Services.updater(valueBody,filter)
     res.status(201).send({status:"OK"} );
}

  module.exports = {
    createCharacter,
    searchBy,
    deleteCharacterByName,
    updateCharacter
    
  }
