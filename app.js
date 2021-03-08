const express = require('express')
const app = express()
const axios = require('axios');

//pega todos
// https://pokeapi.co/api/v2/pokemon?offset=0&limit=251

//pega nome do pokemon especifico do pokemon/
// https://pokeapi.co/api/v2/pokemon/

const api = axios.create({
    baseURL:'https://pokeapi.co/api/v2/pokemon?offset=0&limit=251'
})

//rotas
app.get('/pokemon', async (req, res) => {
    const responseAxios = await api.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=251')
    const {data} = responseAxios
    const retorno = {
        ...data,
        results: data.results.map(item =>{
            item.greetings = 'Olá';
            return item;
        })
    }
    return res.json(retorno);
})

app.listen(3000,() => {
    console.log("servidor rodando na porta 3000!")
    console.log('http://localhost:3000/')
})

