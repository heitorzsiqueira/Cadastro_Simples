import express from 'express';
import { db } from '../db.js';
import { inserir } from '../controllers/users.js';


const router = express.Router();

router.post('/', (req, res) => {
    const { nome, idade } = req.body;

    // Verificação de campos
    if (!nome || !idade) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }

    // Query de inserção
    db.query(inserir, [nome, idade], (err, resultado) => {
        if (err) {
            console.error('Erro ao inserir dados no banco de dados:', err);
            return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
        }
    
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso!'  });
    });
});


export default router;
