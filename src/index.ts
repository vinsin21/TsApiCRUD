import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'

const app = express();

app.use(cors({ credentials: true }))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send("hi")
})

const server = http.createServer(app)

app.listen(8000, () => {
    console.log(`server is running at port 8000`)
})


const MONGO_URL = `mongodb://localhost:27017/TsAPI`

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log(`connected to mongodb`)
    } catch (error) {
        console.log(`error`, error)
    }
}
connectDb()

app.use('/', router())