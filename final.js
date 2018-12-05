const express = require("express")
const bodyParser = require("body-parser")
const app = express();
var formidable = require('formidable');
const bcrypt = require('bcryptjs')
const validator = require('validator');
const JWT = require("jsonwebtoken");

// Middleware
///Request is parsed
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('<form action="/saltEncrypt" method="get" enctype="multipart/form-data">');
    res.write('<input type="text" name="finalText"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
});
app.get('/saltEncrypt', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {

        const finalText = req.query.finalText;
        console.log(finalText)
        const validated = validator.isEmail(finalText);
        if (validated) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write('Question 1');
            const passwordHash = saltEncrypt(finalText)
            res.write(`<br/> ${passwordHash}`);
            return res.end();
        }
        return res.status(400).json({
            error: "This is not an email"
        })
    });
});

saltEncrypt = (text) => {
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(text, salt);
    return passwordHash;
}

verifyJWT = (token, secretKey) => {
    const verifiedJwt = JWT.verify(token,secretKey);
    if(!verifiedJwt){
        return res.status(400).json(err);
    }


}




app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});