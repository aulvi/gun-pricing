var cheerio = require('cheerio')
	, request = require('request')
;

var scrape = function(url, callback) {
	var $
		, data = "+++++++++++++++++++++++"
		, gunListing = []
	;
	
	request(url, function(err, resp, body) {
		if (err) {	//Check for errors
			console.log("Couldn't Connect! " + err);
		}
		console.log("Looking at guns on: " + url);
		$ = cheerio.load(body);  // Load body into $ selector
		$("table.Grid.GridBrowse tr").each(function(i, elem) {
			gunListing[i] = $(this).html();
		//	console.log(gunListing[i]);
		});
		
		callback(err, gunListing);
	});
};


var bodyView = function(err, data) {
	var gunPrice = [];
	if (err);
	$ = cheerio.load(data);
	$("td.lrt:not(.nw), td.ttC").each(function(i, elem) {
		gunPrice[i] = $(this).text();
		console.log(gunPrice[i]);
	})
	/*for (var i = 0; i < data.length; i++) {
		console.log(data[i]);
	}*/
}


scrape("http://www.gunbroker.com/Semi-Auto-Pistols/BI.aspx?mfg=1000120", bodyView);