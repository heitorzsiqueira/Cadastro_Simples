import express from 'express'
import cors from 'cors' 
import mysql from 'mysql2'
const app = express()

app.use(express.json())
app.use(cors())

const banco = mysql

const db = banco.createConnection({
    host:"localhost",
    user:"root",
    password:"heitortoco",
    database:"login"
})

const inserir = "INSERT INTO usuario (nome, email, senha) VALUES (?,?,?)"
const select =  "SELECT id, nome, email FROM usuario"

app.post('/', (req, res) => {
    const { nome, email,senha } = req.body;

    // Verificação de campos
    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos!' });
    }
    else if(!email.includes("@") || !email.includes(".com")){
        return res.status(400).json({ message: 'O email cadastrado nao segue o fromato de email' });
    }
    // Query de inserção
    db.query(inserir, [nome, email,senha], (err, resultado) => {
        if (err) {
            console.error('Erro ao inserir dados no banco de dados:', err);
            return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
        }
    
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso!'  });
    });
});


app.get('/tabelas',(req,res)=>{

    db.query(select,(err,resultado)=>{
        if(err){
            return res.status(400).json({ message: 'Erro ao trazer resultados' });
        }
        return res.status(201).json(resultado);
    })
})

app.listen(8800)