const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => { 
    socket.on('connectRoom', box => {
        socket.join(box);
    })
 });

mongoose.connect("mongodb://localhost:27017/omnistack", { useNewUrlParser: true });

app.use((req, res, next) => {
    res.io = io;

    return next();
})

//Ajuda o servidor a entender as requisições em JSON
app.use(express.json());

//Permite enviar arquivos em nossas requisições
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require("./routes"));

server.listen(1122);