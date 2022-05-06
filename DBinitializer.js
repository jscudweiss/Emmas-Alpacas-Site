const mongoose = require('mongoose');
const {Schema} = mongoose;
const fs = require('fs');
const cheerio = require('cheerio')
// console.log(jsonList);

mongoose.connect('mongodb://localhost:27017/alpacaDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

// mongoose.connect('mongodb://34.148.84.215:27017/alpacaDB',
//     {useNewUrlParser: true}, function () {
//         console.log("db connection successful");
//     });

const pageSchema = new Schema({
    page_name: {
        type: String,
        required: "required"
    },
    page_data: {
        type: String,
        required: "required"
    },
    page_info_extra: {
        type: String
    }
})

const Page = mongoose.model('Page', pageSchema);


let files = fs.readdirSync(__dirname + '/public',);
files = files.filter(function (file) {
    return file.substr(-5) === '.html';
});

files.forEach(function (file) {
    fs.readFile('public/' + file, 'utf-8', function (err, contents) {
        const pageList = [];
        let $ = cheerio.load(contents);
        const nameLoaded = {
            'page_name': file.slice(0, -5).toLowerCase(),
            'page_data': file.slice(0, -5).toLowerCase()
        }
        pageList.push(nameLoaded);
        $('.searchable').each(function (i, elm) {
            const pagedat = {
                'page_name': file.slice(0, -5).toLowerCase(),
                'page_data': $(this).text().toLowerCase()
            }
            pageList.push(pagedat);
        })
        Page.insertMany(pageList, {}, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(file + " data saved");
            }
        });
    })
});

fs.readFile(__dirname + "/public/data/Alpaca-Facts.json", 'utf-8', function (err, data) {
    if (err) {
        console.log(err)
    } else {
        let factdata = JSON.parse(data)
        const len = factdata.length
        let factList = [];
        for (let cur = 0; cur < len; cur++) {
            const fdata = {
                'page_name': "alpaca-facts",
                'page_data': factdata[cur].Title.toLowerCase(),
                'page_info_extra': factdata[cur].Info.toLowerCase()
            }
            factList.push(fdata)
            if (cur === (len - 1)) {
                Page.insertMany(factList, {}, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("fact data saved");
                    }
                });
            }
        }
    }
})



