
import express from 'express'
import authRouter from './routers/authRouter.js'

import handler from './middlewares/errorHandler.js';
import { ENVIRONMENT, PORT, HOST } from './config.js';
import logger from './middlewares/logger.js';
import reviewsRouter from './routers/reviewsRouter.js';
import cors from 'cors';
import movieRouter from './routers/movieRouter.js'
import favorite from './routers/favoriteRouter.js'
import table from './routers/tableRouter.js'


const app = express();

app.use(logger);
app.use(cors({}))

app.use(express.json());

app.use('/avalia' , reviewsRouter)
app.use('/movies', movieRouter)
app.use('/auth', authRouter)
app.use('/watch', favorite)
app.use('/table' , table)



app.use(handler)


app.listen(PORT, () => {

    console.log(`Servidor Rodando no Ambiente ${ENVIRONMENT} em ${ENVIRONMENT == 'production' ? HOST : HOST + ':' + PORT}`)

})