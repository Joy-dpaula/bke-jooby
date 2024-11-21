import { listTable } from "../../models/tableModel.js" 

const get = async (req, res, next) => {
    try{
        const table = await listTable(req.userLogged.public_id)
       
        return res.json({
            message: "Tabelas listadas com sucesso!",
            table
        })
    } catch(error) {
        next(error)
    }
}

export default get