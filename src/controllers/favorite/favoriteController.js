import { watchlist, watchlistValidateToCreate } from "../../models/favoriteModel.js"
import { getByPublicId } from "../../models/authModel.js"


const favoritar = async (req, res, next) => {
    try {

        console.log("req.userLogged:", req.userLogged);
        if (!req.userLogged || !req.userLogged.public_id) {
            return res.status(400).json({ error: "Usuário não autenticado!" });
        }

        const body = req.body

        const watchlistValidated = watchlistValidateToCreate(body)


        if (!watchlistValidated.success) {
            console.log("Erros de validação:", watchlistValidated.error.errors);
            return res.status(400).json({
                error: "Dados da avaliação inválidos!",
                details: watchlistValidated.error.errors
            });
        }


        const user = await getByPublicId(req.userLogged.public_id)


        if (!user)
            return res.status(401).json({
                error: "Public ID Inválido!"
            })

        const watchlistData = {
            ...watchlistValidated.data,
            user_id: user.public_id
        };


        const result = await watchlist(watchlistData);


        if (!result)
            return res.status(401).json({
                error: "Erro ao criar conta!"
            })

        return res.json({
            success: "Conta criada com sucesso!",
            body: result
        })
    } catch (error) {
        next(error)
    }
}

export default favoritar