// npm i express body-parser mongoose

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
/*app.use(express.static(__dirname + "/public/photos"));*/

mongoose.connect('mongodb://localhost:27017/alpacaDB',
    {useNewUrlParser: true}, function () {
        console.log("alpacaDB connection successful");
    });

// =============================================================

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

app.post("/save_contact", (req, res) => {
    Contact.create({
        email:req.body.email,
        message:req.body.message
    }, function (err, contact) {
        if (err) {
            return console.error(err);
        } else {
            console.log("contact saved to database");
            res.redirect("/Contact.html");
        }
    });
})

// =============================================================

// newsletter: email, message (optional)
const newsletterSchema = {
    email: {
        type:String,
        required:[true, "Email cannot be empty"]
    },
    message: {
        type:String,
        required:false
    }
}

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

app.post("/save_newsletter", (req, res) => {
    Newsletter.create({
        email:req.body.email,
        message:req.body.message
    }, function (err, newsletter) {
        if (err) {
            return console.error(err);
        } else {
            console.log("newsletter saved to database");
            res.redirect("/NewsLetter.html");
        }
    });
})

// =============================================================

app.listen(3000, function() {
    console.log("server started at 3000");
})

// Page Navigation
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/Home.html");
})
app.get('/Home', function (req, res) {
    res.sendFile(__dirname + "/public/Home.html");
})
app.get('/About', function (req, res) {
    res.sendFile(__dirname + "/public/About.html");
})
app.get('/Alpaca-Facts', function (req, res) {
    res.sendFile(__dirname + "/public/Alpaca-Facts.html");
})
app.get('/Calendar', function (req, res) {
    res.sendFile(__dirname + "/public/Calendar.html");
})
app.get('/Contact', function (req, res) {
    res.sendFile(__dirname + "/public/ContactUs.html");
})
app.get('/Gallery', function (req, res) {
    res.sendFile(__dirname + "/public/Gallery.html");
})
app.get('/Newsletter', function (req, res) {
    res.sendFile(__dirname + "/public/NewsLetter.html");
})
app.get('/Store', function (req, res) {
    res.sendFile(__dirname + "/public/Store.html");
})
app.get('/NavTest', function (req, res) {
    res.sendFile(__dirname + "/public/NavTester.html");
})

