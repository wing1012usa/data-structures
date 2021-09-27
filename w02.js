//0920 updated

// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/2.txt', 'utf8');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// print (to the console) names of thesis students
//$('h4').slice(2).each(function(i, ele) {console.log($(ele.parentNode).text().split('\n'))});
var addresses = $('h4').slice(2)                                    // locate h4
                    .map( (i,elem) => $(elem.parentNode).text()     // get parent node
                                            .split("\n") [3].trim()  // get 3rd row (with address)
                                            .split(',')[0].trim()   // get only street (no room)
                                            .split('-')[0].trim() 
                                            ) // remove extra info (no floor)
                    .get();
  console.log(addresses);
// write the project titles to a text file
//var streetname = ''; // this variable will hold the lines of text

//$('.street .name').each(function(i, elem) {
    //streetname += ($(elem).text()).trim() + '\n';
//});

fs.writeFileSync('data/streetname.txt', addresses.join('\n'), 'utf8');
