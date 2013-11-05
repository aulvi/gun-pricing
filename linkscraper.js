var 
	cheerio = require('cheerio')
	, request = require('request')
;

var counter = 0;
var maxCounter = 50;

function linkscraper(url) {
	request(url, function(err, resp, body) {
		if (err) {
			return console.log("ERR! " + JSON.stringify(err));
		}

		// Load the page and nab the links from the left side.
		var $ = cheerio.load(body);

		$("div.menucontent ul li a").each(function(i, elem) {
			var entry = { 
				sourceUrl: url,
				url: $(this).attr("href"),
				description: $(this).text(),
				category: $(".StepActive").last().text()
			};
		
			if (entry.url) {
				console.log(entry);
				setTimeout(function(){
					counter = counter +1;
					if (counter < 50) {
						linkscraper(entry.url);
					}
				}, 200);
			}
		});
	});	
}

if (process.argv.length != 3) {
	console.log("Usage: node linkscraper.js http://my.url");
} else {
	linkscraper(process.argv[2]);
}
