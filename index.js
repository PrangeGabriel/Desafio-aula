const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");

app.use(express.static(__dirname + '/src/assets'));
//dica quente q ele deu

//pega todos
// https://pokeapi.co/api/v2/pokemon?offset=0&limit=251

//pega nome do pokemon especifico do pokemon/
// https://pokeapi.co/api/v2/pokemon/


const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=251",
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
  res.sendFile(path.join(__dirname,''));
});

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000!");
  console.log("http://localhost:3000/");
});
