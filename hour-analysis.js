var fs = require('fs');
var readline = require('readline');

var dataFile = process.argv[2];

var hourCounts = {};
for (var i = 0; i < 24; i+=1) {
  var hour = '';
  if (i < 10) hour += '0';
  hour += i;
  hourCounts[hour] = 0;
}

// create readstream and use readline to loop over each line
var rd = readline.createInterface({
  input: fs.createReadStream(dataFile),
  output: process.stdout,
  terminal: false
});

// process each line, iterate hours counter
rd.on('line', function(l) {
  var matches = l.match(/([0-9]{2}):[0-9]{2}:[0-9]{2}/);
  if (matches) {
    hourCounts[matches[1]] = hourCounts[matches[1]] + 1;
  }
});

// produce summary statistics once we've looked at all lines
rd.on('close', function() {
  for (var i = 0; i < 24; i+=1) {
    var hour = '';
    if (i < 10) hour += '0';
    hour += i;
    console.log(hour + ": " + hourCounts[hour]);
  }
});
