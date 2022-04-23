const mongoose = require('mongoose');
const {Schema} = mongoose;
const fs = require('fs');
const cheerio = require('cheerio')
// console.log(jsonList);


mongoose.connect('mongodb://localhost:27017/siteDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

const pageSchema = new Schema({
    //stock_num,make,model,year,color,url,price
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
                console.log("all data saved");
            }
        });
    })
});

/*
let factdata = [];
fs.readFile(__dirname + "/public/data/Alpaca-Facts.json", 'utf-8',function (err, data) {
    if (err) {
        console.log(err)
    } else {
        factdata.push(JSON.parse(data))
    }
})

console.log(data);

const len = factdata.length
factList = [];
for (let cur = 0; cur < len; cur++) {
    const data = {
        'page_name': "Alpaca-Facts",
        'page_data': factdata[cur].Title,
        'page_info_extra': factdata[cur].Info
    }
    factList.push(data)
    console.log(cur + " : " + len)
    if (cur === (len - 1)) {
        Page.insertMany(data, {}, (err) => {
            console.log(data);
            if (err) {
                console.log(err);
            } else {
                console.log("all data saved");
            }
        });
    }
}*/
