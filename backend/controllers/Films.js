const asyncHandler = require('express-async-handler')
const FilmsModel=require('../models/filmsModels')

class Films {
  add = asyncHandler( async  (req, res) => {
    const {title,year}=req.body;
    if(!title || !year){
      res.status(400)
      throw new Error("Provide all filds!")
    }
    const film = await FilmsModel.create({...req.body});
    res.status(201).json({code:201,data:film})
  })

  getAll = asyncHandler( async (req, res) => {
    // const nanoid = await require('nanoid')
    // const id = nanoid()
    // console.log(id)
   const allFilms = await FilmsModel.find({})
   res.status(200).json({code:200,data:allFilms,qty:allFilms.length})
  }
)


  getById = asyncHandler( async (req, res) => {
    const film = await FilmsModel.findById(req.params.id)
    res.status(200).json({code:200,data:film})
   }
 )


  update = (req, res) => {
    res.send("update");
  };

  remove = (req, res) => {
    res.send("remove");
  };
}

module.exports = new Films();
