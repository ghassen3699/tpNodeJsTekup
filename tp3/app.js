const express = require('express');

const mongoose= require('mongoose');
const auth= require('./routes/auth')

const app = express();
app.use(express.json())

app.use('/auth',auth)

//connection to mongo db and start the server
mongoose.connect('mongodb+srv://ghassenKhamassi:27988332@cluster0.2mrfmkj.mongodb.net/tp3?retryWrites=true&w=majority').then((()=>{
    console.log('connect to mongodb')
    app.listen(3000,()=>{
        console.log('server listnig on port 3000')
    })
})).catch((err)=>{
    console.error('error connecting to mongodb', err.message)
})