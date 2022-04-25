const mongoose = require('mongoose');
const {Schema} = mongoose;
const fs = require('fs');
const cheerio = require('cheerio')
// console.log(jsonList);


mongoose.connect('mongodb://localhost:27017/alpacaDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

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

pageSchema.index({
    page_name: 'text',
    page_data: 'text',
    page_info_extra: 'text'
}, {
    name: 'search_Index', weights: {
        page_name: 100,
        page_data: 5,
        page_info_extra: 1
    }, default_language: 'none'
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
            'page_name': file.slice(0, -5),
            'page_data': file.slice(0, -5)
        }
        pageList.push(nameLoaded);
        $('.searchable').each(function (i, elm) {
            const pagedat = {
                'page_name': file.slice(0, -5),
                'page_data': $(this).text()
            }
            pageList.push(pagedat);
        })
        Page.insertMany(pageList, {}, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(file +" data saved");
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
                'page_name': "Alpaca-Facts",
                'page_data': factdata[cur].Title,
                'page_info_extra': factdata[cur].Info
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



