
import express from 'express'
import { ENVIRONMENT, PORT, HOST } from './config.js';
import cors from 'cors';
import handler from './middlewares/errorHandler.js';
import logger from './middlewares/logger.js';
import authRouter from './routers/authRouter.js'
import movieRouter from './routers/movieRouter.js'
import reviewsRouter from './routers/reviewsRouter.js';
import favoritesRouter from './routers/favoriteRouter.js'
import watchlistsRouter from './routers/watchlistRouter.js'

const app = express();

app.use(logger);
app.use(cors({}))

app.use(express.json());

app.use('/auth', authRouter)
app.use('/reviews' , reviewsRouter)
app.use('/movies', movieRouter)
app.use('/favorites', favoritesRouter)
app.use('/watchlists' , watchlistsRouter)

app.use(handler)

app.listen(PORT, () => {
    console.log(`Servidor Rodando no Ambiente ${ENVIRONMENT} em ${ENVIRONMENT == 'production' ? HOST : HOST + ':' + PORT}`)
})