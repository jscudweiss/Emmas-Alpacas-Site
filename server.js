// npm i express body-parser mongoose

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// =============================================================

mongoose.connect('mongodb://localhost:27017/contactDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

// contact: name, email, phone number, message
const contactSchema = {
    name: {
        type:String,
        required:[true, "Name cannot be empty"]
    },
    email: {
        type:String,
        required:[true, "Email cannot be empty"]
    },
    phone_number: {
        type:String,
        required:[true, "Phone Number cannot be empty"]
    },
    message: {
        type:String,
        required:[true, "Message cannot be empty"]
    }
}

const Contact = mongoose.model('Contact', contactSchema);

// =============================================================

// mongoose.connect('mongodb://localhost:27017/newsletterDB',
//     {useNewUrlParser: true}, function () {
//         console.log("db connection successful");
//     });
//
// // newsletter: name, email, message (optional)
// const newsletterSchema = {
//     name: {
//         type:String,
//         required:[true, "Name cannot be empty"]
//     },
//     email: {
//         type:String,
//         required:[true, "Email cannot be empty"]
//     },
//     message: {
//         type:String,
//         required:false
//     }
// }
//
// const Newsletter = mongoose.model('Newsletter', newsletterSchema);

// =============================================================

app.listen(3000, function() {
    console.log("server started at 3000");
})

// Home Page
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/Home.html");
})
app.get('/alpaca-facts', function (req, res) {
    res.sendFile(__dirname + "/public/Alpaca-Facts.html");
})

