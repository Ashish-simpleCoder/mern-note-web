// load environment varaibles
import dotenv from 'dotenv'
dotenv.config()

// init db
import { initDB } from './config/db.config'
initDB()

import { ENV } from './config/env.config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

import router from './routers'

const app = express()

// adding cors policy
app.use(
   cors({
      origin: '*',
   })
)
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

// health check route
app.get('/', (req, res) => res.end('hello world'))

// listen to server
app.listen(ENV.port, () => console.log(`server running on ${ENV.port}`))
