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
    }
})

const Page = mongoose.model('Page', pageSchema);



let files = fs.readdirSync(__dirname + '/public', );
files = files.filter(function (file) {
    return file.substr(-5) === '.html';
});
const pageList = [];

files.forEach(function (file) {
    fs.readFile('public/' + file, 'utf-8', function (err, contents) {
        let $ = cheerio.load(contents);
        $('.searchable').each(function (i, elm) {
            const pagedat = {
                'page_name': file.slice(0, -5),
                'page_data': $(this).text()
            }
            pageList.push(pagedat);
        })
    });
});
Page.insertMany(pageList, {}, (err) => {
    console.log(pageList)
    if (err) {
        console.log(err);
    } else {
        console.log("all data saved");
        mongoose.connection.close();
    }
});



