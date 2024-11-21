import { createTable, tableValidateToCreate } from "../../models/tableModel.js";
import { getByPublicId } from "../../models/authModel.js";

const create = async (req, res, next) => {
    try {
        console.log("req.userLogged:", req.userLogged);

       
        if (!req.userLogged || !req.userLogged.public_id) {
            return res.status(400).json({ error: "Usuário não autenticado!" });
        }

        const body = req.body;

       
        const tableValidated = tableValidateToCreate(body);

        if (!tableValidated.success) {
            console.log("Erros de validação:", tableValidated.error.errors);
            return res.status(400).json({
                error: "Dados da tabela inválidos!",
                details: tableValidated.error.errors,
            });
        }

        const user = await getByPublicId(req.userLogged.public_id);

        if (!user) {
            return res.status(401).json({
                error: "Public ID Inválido!",
            });
        }

       
        const tableData = {
            ...tableValidated.data,
            user_id: user.public_id, 
            movies: body.movies || [], 
        };

       
        const result = await createTable(tableData);

        if (!result) {
            return res.status(500).json({
                error: "Erro ao criar tabela!",
            });
        }

        return res.json({
            success: "Tabela criada com sucesso!",
            body: result,
        });
    } catch (error) {
        console.error("Erro ao criar tabela:", error);
        next(error);
    }
};

export default create;
