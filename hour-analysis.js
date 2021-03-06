var fs = require('fs');
var readline = require('readline');

if (process.argv.length != 3) {
  console.error('usage: node hour-analysis.js file-name');
  return 0;
}
var dataFile = process.argv[2];

// empty 24 item array, intialized to 0 (dunno why it's so complicated in js)
var hourCounts = Array.apply(null, Array(24)).map(function() { return 0; });

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
    hourCounts[parseInt(matches[1])] += 1;
  }
});

// produce summary statistics once we've looked at all lines
rd.on('close', function() {
  for (var i = 0; i < 24; i+=1) {
    var hour = (i < 10 ? '0' + i : String(i));
    console.log(hour + ": " + hourCounts[i]);
  }
});
