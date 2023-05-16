import { config } from 'dotenv'
import pkg from 'pg'
const { Client } = pkg

import express, { response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const PORT = 8800

const app = express()
config()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(cors())
app.use(express.json())
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

// Implementerar databasen
const client = new Client({

    // detta kommer ifrån .env
    database: process.env.DATABASE,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    user: process.env.USER
})

client.connect(function (err){
    if(err) throw err
    console.log('DATABASE CONNECTED')
})

// Rutterna
app.get('/', (req, res)=>{
    res.json('Fuck a duck')
})

// Hämtar all information från tabellen persons
app.get('/persons', async (req, res)=>{
    try{
        const result = await client.query('SELECT * FROM persons')
        res.json(result.rows)
    } catch(err){
        console.error(err)
        res.status(500)
    }
})

// Lägger till en person i tabellen persons
app.post('/persons/submit-form', async (req, res)=>{
    const {FirstName, LastName, Address, City} = req.body;
    try{
        await client.query(
            'INSERT INTO persons (FirstName, LastName, Address, City) VALUES($1,$2,$3,$4)',
            [FirstName, LastName, Address, City]
            )
            res.sendStatus(201)
    } catch (err){
        console.error(err)
        res.sendStatus(500)
    }
})


app.listen(PORT, ()=>{
    console.log(`SERVER IS ON ${PORT}`)
})
