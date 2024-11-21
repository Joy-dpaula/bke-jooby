import { creatFavorite, favoriteValidateToCreate } from "../../models/favoriteModel.js"
import { getByPublicId } from "../../models/authModel.js"

const createFavorite = async (req, res, next) => {
    try {

        console.log("req.userLogged:", req.userLogged);
        if (!req.userLogged || !req.userLogged.public_id) {
            return res.status(400).json({ error: "Usuário não autenticado!" });
        }

        const body = req.body

        const favoriteValidated = favoriteValidateToCreate(body)

        if (!favoriteValidated.success) {
            console.log("Erros de validação:", favoriteValidated.error.errors);
            return res.status(400).json({
                error: "Dados do favoritado inválidos",
                details: favoriteValidated.error.errors
            });
        }

        const user = await getByPublicId(req.userLogged.public_id)

        if (!user)
            return res.status(401).json({
                error: "Public ID Inválido!"
            })

        const favoriteData = {
            ...favoriteValidated.data,
            user_id: user.public_id
        };

        const result = await watchlist(favoriteData);

        if (!result)
            return res.status(401).json({
                error: "Erro ao favoritar filme"
            })

        return res.json({
            success: "Filme favoritado com sucesso",
            body: result
        })
    } catch (error) {
        next(error)
    }
}

export default createFavorite