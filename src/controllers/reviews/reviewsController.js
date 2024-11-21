import { review, reviewValidateToCreate } from "../../models/reviewsModel.js"
import { getByPublicId } from "../../models/authModel.js"


const avalia = async (req, res, next) => {
    try {

        console.log("req.userLogged:", req.userLogged);
        if (!req.userLogged || !req.userLogged.public_id) {
            return res.status(400).json({ error: "Usuário não autenticado!" });
        }

        const body = req.body

        const reviewValidated = reviewValidateToCreate(body)


        if (!reviewValidated.success) {
            console.log("Erros de validação:", reviewValidated.error.errors);
            return res.status(400).json({
                error: "Dados da avaliação inválidos!",
                details: reviewValidated.error.errors
            });
        }


        const user = await getByPublicId(req.userLogged.public_id)


        if (!user)
            return res.status(401).json({
                error: "Public ID Inválido!"
            })

        const reviewData = {
            ...reviewValidated.data,
            user_id: user.public_id
        };


        const result = await review(reviewData);

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

export default avalia