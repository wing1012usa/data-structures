# data-structures
for class only
#w04.js
const { Client } = require('pg');
var async = require('async');  
const dotenv = require('dotenv');
dotenv.config();  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'esther';
db_credentials.host = 'aa.clcbgz3gfd6f.us-east-2.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
//console.log(process.env.AWSRDS_PW);
db_credentials.port = 5432;

var addressesForDb = [ { address: '273 BOWERY, New York, NY', latLong: { lat: 40.7236818990557, lng: -73.9924846000013 } }, { address: '32 W 11TH ST, New York, NY', latLong: { lat: 40.7362371953365, lng: -74.0025217528845 } }, { address: '283 W BROADWAY, New York, NY', latLong: { lat: 40.7208247814361, lng: -74.0048537254953 } } ];

async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.address + "', " + value.latLong.lat + ", " + value.latLong.lng + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 

#w04b.js
const { Client } = require('pg');
var async = require('async');  
const dotenv = require('dotenv');
dotenv.config();  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'esther';
db_credentials.host = 'aa.clcbgz3gfd6f.us-east-2.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
//console.log(process.env.AWSRDS_PW);
db_credentials.port = 5432;

var addressesForDb = [ { address: '273 BOWERY, New York, NY', latLong: { lat: 40.7236818990557, lng: -73.9924846000013 } }, { address: '32 W 11TH ST, New York, NY', latLong: { lat: 40.7362371953365, lng: -74.0025217528845 } }, { address: '283 W BROADWAY, New York, NY', latLong: { lat: 40.7208247814361, lng: -74.0048537254953 } } ];

async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.address + "', " + value.latLong.lat + ", " + value.latLong.lng + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 

#w04c.js
const { Client } = require('pg');  
const dotenv = require('dotenv');
dotenv.config();  

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'esther';
db_credentials.host = 'aa.clcbgz3gfd6f.us-east-2.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query the entire contents of a table: 
var thisQuery = "SELECT * FROM aalocations;";

client.query(thisQuery, (err, res) => {
    console.log(err, res.rows);
    client.end();
});

#w05.js
var blogEntries = [];

class BlogEntry {
  constructor(primaryKey, date, entry, energy, food) {
    this.pk = {};
    this.pk.N = primaryKey.toString();
    this.date = {}; 
    this.date.S = new Date(date).toDateString();
    this.entry = {};
    this.entry.S = entry;
    this.energy = {};
    this.energy.BOOL = energy; 
    if (food != null) {
      this.food = {};
      this.food.SS = food; 
    }
    this.month = {};
    this.month.N = new Date(date).getMonth().toString();
  }
}

blogEntries.push(new BlogEntry(0, 'October 28 2021', "Energized", true, ["Avocado Toast", "Ginger tea"]));
blogEntries.push(new BlogEntry(1, 'October 29, 2021', "Exhausted", true, ["Chocolate"]));
blogEntries.push(new BlogEntry(2, 8675309, "867-5309?", false));
blogEntries.push(new BlogEntry(3, 'October 30, 2021', "Low", true, ["Harb tea"]));

console.log(blogEntries);

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-2";

var dynamodb = new AWS.DynamoDB();

var params = {};
params.Item = blogEntries[3]; 
params.TableName = "processblog";

dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
![Screen Shot 2021-11-02 at 1 09 48 PM](https://user-images.githubusercontent.com/57466154/139912762-2a4fe1bd-d43c-412f-b73d-13136ae2c7d7.png)

