const db = require('../../database/models');
const getUrl = (req)=> `${req.protocol}://${req.get('host')}${req.originalUrl}`

module.exports = {
    getAll: (req, res) => {
        
        db.Movie.findAll({
            include: [
                {association: 'genres'},
                 {association: 'actors'}
                ]
        })
        .then((movies)=>{
            return res.json({
                meta:{
                    endpoint: getUrl(req),
                    status:200,
                    total: movies.length
                },
                data: movies
            })
        })

    },
    getOne:(req, res)=>{
        db.Movie.findByPk(req.params.id)
        .then((movie)=>{
            res.json({
                meta:{
                    status:200,
                    url:`/api/movies/${req.params.id}`
                },
                data: movie
            }) 
        })
    },
    add: (req, res)=> {
        db.Movie.create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    update: (req, res)=> { 
        let movieId = req.params.id;
        db.Movie.update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/update/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/movies/update/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
      
    },
    delete: (req, res)=> {
        let movieId = req.params.id;
       
   db.Movie.destroy({where: {id: movieId}, force: true}) 
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/destroy/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/movies/destroy/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    }  


}