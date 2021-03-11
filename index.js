const express = require("express");
const axios = require("axios");
const path = require("path");


//pega todos
// https://pokeapi.co/api/v2/pokemon?offset=0&limit=251

//pega nome do pokemon especifico do pokemon/
// https://pokeapi.co/api/v2/pokemon/

const app = express();
const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=251",
});

const listaUsuarios = [
  'Ivens',
  'Jailson',
  'Maria',
  'Natalia',
  'Ariel',
  'Nykolle'
]

app.use(express.static(path.join(__dirname + '/src/assets')));

// Query Params
// Ex: localhost:3000/usuarios?nome=Ivens
app.get('/usuarios', (req, res) => {
  const { nome } = req.query;
  let listaRetorno = listaUsuarios.filter(i => i.includes(nome || ''));
  return res.json(listaRetorno);
});

// Route Params 
// Ex: ecommer.com.br/produtos/4/detalhes
app.get('/hello/:usuario', (req, res) => {    
  const { usuario } = req.params;
  return res.send(`Hello world ${usuario}`);
});

//rotas
app.get("/pokemon", async (req, res) => {
  const responseAxios = await api.get(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=251"
  );
  const { data } = responseAxios;
  const retorno = {
    ...data,
    results: data.results.map((item) => {
      item.greetings = "Olá";
      return item;
    }),
  };
  return res.json(retorno);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'/src/views/index.html'));
});

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000!");
  console.log("http://localhost:3000/");
});
