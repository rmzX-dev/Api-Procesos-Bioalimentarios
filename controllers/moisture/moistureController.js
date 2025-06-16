import Mouisture from "../../models/moisture/moistureModel"; 

class MoistureController {

    static async getByIdAnalisis(req, res){
        try{
           const data = await Mouisture.getByIdAnalisis(req.params.id);
           if(!data){
              return res.status(404).json( {message: "Analisis humedad no encontrado"} );
           }
           res.json(data);
        }catch{

        }
    }

    static async createAnalisisHumedad(req, res){
        try{
           const data = await Mouisture.createAnalisisHumedad(req.body);
           res.status(201).json(data);
        }catch(err) {
            res.status(500).json({ error: err.message});
        }
    }
}

export default MoistureController;