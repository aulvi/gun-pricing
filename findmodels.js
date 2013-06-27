var cheerio = require('cheerio')
	, request = require('request')
	, counter = 0
;


var findLinks = function(url, callback) {			// Locates all links on the left side of the page	
	counter++;	// Prevent infinite loop
	if (counter <= 8) {
		var 
			$
			, siteLinks = []
			, gunDescrip = []
		;
	
		request(url, function(err, resp, body) {
			if (err) {
				callback(err);
			}
			else {
				$ = cheerio.load(body);

				$("div.menucontent ul li a").each(function(i, elem) {
					siteLinks[i] = $(this).attr("href");
					gunDescrip[i] = i + " - " + $(this).text();
					console.log(siteLinks[i] + " - " + gunDescrip[i] + $(".StepActive").last().text());
				});
				
				callback(null, siteLinks);						// Sends that pages' links back as array
			}
		});	
	} 
	else {
		
	}
};


findLinks("http://www.gunbroker.com/Firearms/BI.aspx", function(err, siteLinks){
	if (err) {
		return console.log(err);
	};	
	for ( var i = 0; i < siteLinks.length; i++) {
		findLinks(siteLinks[i], function(err, siteLinks) {
			console.log("++++++++++++++++++++++++++");
		}); 
	}
});
