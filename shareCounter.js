$.fn.generateShareCount = function(url) {

	//Define the Endpoints and relevant data.
	//get facebook
	function getFacebook(url) {
		return $.ajax({
		    dataType: "jsonp",
		    url: 'http://graph.facebook.com/',
		    data: {'id':url}
		});
	}

	//get reddit
	function getReddit(url) {
		return $.ajax({
		    url: 'http://www.reddit.com/api/info.json',
		    data: {'url':url},
		    jsonpCallback: '?'
		});
	}


	//get linkedin..
	function getLinkedin(url) {
		return $.ajax({
		    dataType: "jsonp",
		    url: 'https://www.linkedin.com/countserv/count/share',
		    data: {'url':url},
		    jsonpCallback: 'this_is_a_random_name'
		});
	}

	//Do the acutal counting..
	var totalCount = 0;
	var object = $(this);
	$.when(getFacebook(url), getLinkedin(url), getReddit(url)).done(function(facebook, linkedin, reddit){

		//Saftey check in case facebook returns undefined.
		if (typeof facebook[0].share !== "undefined") var facebookCount = facebook[0].share.share_count; else var facebookCount = 0;

		//Saftey Check in case reddit returns undefined.
		if (typeof reddit[0].data.children[0] !== "undefined") var redditCount = reddit[0].data.children[0].data.score; else var redditCount = 0;

		//Generate linked in count
		var linkedinCount = linkedin[0].count || 0;

		//Add the counts
	    totalCount += facebookCount + redditCount + linkedinCount;

	    //update the text
	    object.text('total: '+totalCount);
	});
}
