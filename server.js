// uri: mongodb+srv://main-user:<password>@cluster0.up44s.mongodb.net/<dbname>?retryWrites=true&w=majority
// dbuser: test-user

const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established securely");
})

const userRouter = require('./router/users');

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`port number ${port}`);
})