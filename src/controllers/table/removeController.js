import { deleteTable,  tableValidateId } from "../../models/tableModel.js"

const remove = async (req, res, next) => {
    const {id} = req.params
    try{
        const tableValidate =  tableValidateId(+id)

        if(tableValidate?.error)
            return res.status(401).json({
                error: "Erro ao deletar um serviço!",
                fieldErrors: tableValidate.error.flatten().fieldErrors
            })

        const table = await deleteTable(tableValidate.data.id, req.userLogged.public_id)

        return res.json({
            success: "Conta removida com sucesso!",
            table
        }) 
    }catch(error){
        if(error?.code === 'P2025')
            return res.status(404).json({
                error: `Conta com o id ${id}, não encontrado!`
            })
        next(error)
    }
}

export default remove