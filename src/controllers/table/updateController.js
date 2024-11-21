import { update, tableValidateToUpdate } from "../../models/tableModel.js";
import { getByPublicId } from "../../models/authModel.js";

const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const table = { ...req.body, id: +id };

        const tableValidated = tableValidateToUpdate(table);
        if (tableValidated?.error) {
            return res.status(400).json({
                error: "Erro ao validar tabela!",
                details: tableValidated.error.flatten().fieldErrors,
            });
        }

        const user = await getByPublicId(req.userLogged.public_id);
        if (!user) {
            return res.status(401).json({ error: "Usuário não autenticado!" });
        }

        const result = await update(
            { ...tableValidated.data, user_id: user.id },
            req.userLogged.public_id
        );

        if (!result) {
            return res.status(404).json({
                error: `Tabela com o id ${id} não encontrada ou não pertence ao usuário!`,
            });
        }

        return res.json({
            success: "Tabela atualizada com sucesso!",
            table: result,
        });
    } catch (error) {
        next(error);
    }
};

export default updateController;
