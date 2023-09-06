const express = require('express');
const app = express();
const User = require('./models/User');

//preparar para receber dados em JSON -
app.use(express.json());

app.get("/", async (req, res) => {
    res.send("Página inicial- BetaTesters");
});

app.post("/inscreva-se", async(req, res) => {
    //console.log(req.body);

    await User.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem:"Usuario Cadastrado com Sucesso!"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem:"ERRO: Usuario não Cadastrado com Sucesso!"
        });
    });

    //res.send("Página Inscreva-se para o Beta");
})

app.listen(8082, () => {
    console.log("Servidor iniciado na porta 8082: http://localhost:8082"); 
});