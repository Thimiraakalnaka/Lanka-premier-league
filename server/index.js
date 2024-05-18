const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);

mongoose.connect('mongodb+srv://thimiraakalanka13:12345@newcluster.dbwgwso.mongodb.net/authentication')
.then(()=> console.log('connected to mongodb'))
.catch((error) => console.error('failed to connected mongodb:',error));

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});


const PORT = 4000;
app.listen(PORT, ()=> {
    console.log(`App running on ${PORT}`);
});    