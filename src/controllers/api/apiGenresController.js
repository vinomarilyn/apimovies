const db = require('../../database/models');

module.exports = {
    list: (req, res) => {
        db.Genre.findAll()
        .then((genres)=>{
            res.json({
                meta:{
                    status:200,
                    total: genres.length,
                    url:'/api/genres'
                },
                data: genres
            })
        })
    },
    detail:(req, res)=>{
        db.Genre.findByPk(req.params.id)
        .then((genre)=>{
            res.json({
                meta:{
                    status:200,
                    url:`/api/genres/${req.params.id}`
                },
                data: genre
            }) 
        })
    }

}