import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
    origin:'*'
}))

app.get("/",(req,res)=> res.end("hello world"))


app.listen(8000, ()=>console.log("server running on 8000"))