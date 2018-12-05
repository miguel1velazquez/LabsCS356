const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express();

const db = require("./config/keys").mongoURI;

mongoose.connect(db, {
    // Getting error, added => to remove warning
    //(node:20464) DeprecationWarning: collection.ensureIndex is deprecated.
    useCreateIndex: true,
        useNewUrlParser: true
    }).then(() => console.log("DB connected"))
    .catch(err => console.log(err))

// Middleware
///Morgan logs actions: Dev option
app.use(morgan('dev'));
///Request is parsed
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));

// Server init
const port = process.env.POST || 3000;
app.listen(port)
console.log(`Server PORT: ${port}`)