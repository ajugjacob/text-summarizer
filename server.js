const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .catch(err => console.log(err.reason));


const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established securely");
})

const userRouter = require('./router/users');

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`port number ${port}`);
})