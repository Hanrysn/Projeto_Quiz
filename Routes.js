import express from 'express'
import cors from 'cors'
import sql from './bd.js'
import bcrypt from 'bcrypt'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))


//busca de usuarios 
app.post('/usuario/senha',async (req, res)=>{
    const { usuario, senha } = req.body
    try{
        
        const consulta = await sql`select * from usuarios where usuario = ${usuario} and senha = ${senha};`
        if(consulta != null && consulta != ''){
            return res.status(200).json(consulta)
        }
        else{
            return res.status(401).json('Usuario ou senha incorretos')
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json('um erro inesperado ocorreu')
    }
})



//cadastro de alunos
app.post('/usuarioA/senha', async (req, res)=>{
    try{
        const {usuarioA, senha} = req.body;
    await sql`insert into usuarios (usuario, senha, status) values (${usuarioA}, ${senha}, 'aluno');`
    return res.status(200).json('ok')
    }
    catch(error){
        console.log(error)
        return res.status(500).json('erro ao cadastrar usuario')
    }
})

//cadastro de professores
app.post('/usuarioP/senha', async (req, res)=>{
    try{
        const {usuarioP, senha} = req.body;
    await sql`insert into usuarios (usuario, senha, status) values (${usuarioP}, ${senha}, 'adimim');`
    return res.status(200).json('ok')
    }
    catch(error){
        console.log(error)
        return res.status(500).json('erro ao cadastrar usuario')
    }
})


app.listen(3000,()=>{
    console.log('Running!! in port 3000')
});