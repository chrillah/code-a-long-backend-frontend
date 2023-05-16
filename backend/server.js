import { config } from 'dotenv'
import pkg from 'pg'
const { Client } = pkg

import express, { response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
config()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended : true
    })
)

app.use(cors())
app.use(express.json())
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

console.log('Server igång')
