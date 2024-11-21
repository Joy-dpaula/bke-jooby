import { list } from "../../models/tableModel.js"

const get = async (req, res, next) => {

    try {
        const table = await list()


        return res.json({
            message: "Contas listadas com sucesso!",
            table
        })
    }catch(error){
        next(error)
       

    }
    
}

export default get