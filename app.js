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
app.get('*', (req, res) => {
    res.send("Test FINAL API")
});
// Server init
app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});