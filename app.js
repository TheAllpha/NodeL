const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
// mongodb+srv://thealpha:<password>@atlascluster.7jgaehh.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(
"mongodb+srv://user2000:"
+process.env.MONGO_ATLAS_PW+
"@atlascluster.7jgaehh.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).catch(error => console.error("MongoDB connection error:", error));

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res , next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization '); 
if (req.method === 'OPTIONS') {
    res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({});    
}
next()
});

// Routes which should handle requests

app.use('/products', productRoutes) 
app.use('/orders', orderRoutes) 

app.use((req,res,next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;