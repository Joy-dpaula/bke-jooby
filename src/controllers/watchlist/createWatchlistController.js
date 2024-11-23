import { createWatchlist, watchlistValidateToCreate } from "../../models/watchlistModel.js";
import { getByPublicId } from "../../models/authModel.js";

const createWatchlistController = async (req, res, next) => {
    try {
        console.log("req.userLogged:", req.userLogged);

        if (!req.userLogged || !req.userLogged.public_id) {
            return res.status(400).json({ error: "Usuário não autenticado!" });
        }

        const body = req.body;

       
        const watchlistValidated = watchlistValidateToCreate(body);

        if (!watchlistValidated.success) {
            console.log("Erros de validação:", watchlistValidated.error.errors);
            return res.status(400).json({
                error: "Dados da watchlist inválidos!",
                details: watchlistValidated.error.errors,
            });
        }

        const user = await getByPublicId(req.userLogged.public_id);

        if (!user) {
            return res.status(401).json({
                error: "Public ID Inválido!",
            });
        }

       
        const watchlistData = {
            ...watchlistValidated.data,
            user_id: user.public_id, 
            movies: body.movies || [], 
        };

       
        const result = await createTable(watchlistData);

        if (!result) {
            return res.status(500).json({
                error: "Erro ao criar watchlist",
            });
        }

        return res.json({
            success: "Watchlist criada com sucesso!",
            body: result,
        });
    } catch (error) {
        console.error("Erro ao criar watchlist:", error);
        next(error);
    }
};

export default  createWatchlistController
