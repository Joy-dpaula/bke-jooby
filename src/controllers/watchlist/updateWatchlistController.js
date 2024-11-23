import { updateWatchlist, watchlistValidateToUpdate } from "../../models/watchlistModel.js";
import { getByPublicId } from "../../models/authModel.js";

const updateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const watchlist = { ...req.body, id: +id };

        const watchlistValidated = watchlistValidateToUpdate(watchlist);

        if (watchlistValidated?.error) {
            return res.status(400).json({
                error: "Erro ao validar watchlist",
                details: watchlistValidated.error.flatten().fieldErrors,
            });
        }

        const user = await getByPublicId(req.userLogged.public_id);
        if (!user) {
            return res.status(401).json({ error: "Usuário não autenticado!" });
        }

        const result = await updateWatchlist(
            { ...watchlistValidated.data, user_id: user.id },
            req.userLogged.public_id
        );

        if (!result) {
            return res.status(404).json({
                error: `Watchlist com o id ${id} não encontrada ou não pertence ao usuário!`,
            });
        }

        return res.json({
            success: "Watchlist atualizada com sucesso!",
            watchlist: result,
        });

    } catch (error) {
        next(error);
    }
};

export default updateController;
