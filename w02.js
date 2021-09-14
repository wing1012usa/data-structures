// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/2.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// print (to the console) names of thesis students
$('h5').each(function(i, elem) {
    console.log($(elem).text());
});


// write the project titles to a text file
var streetname = ''; // this variable will hold the lines of text

$('.street .name').each(function(i, elem) {
    streetname += ($(elem).text()).trim() + '\n';
});

fs.writeFileSync('data/streetname.txt', streetname);

