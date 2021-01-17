const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();



const app = express();


// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())


const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.mongoURI, 
    {userNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB module has been activated');
});

const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(port, ()=>{
    console.log(`Server has been activated on port ${port}`)
})