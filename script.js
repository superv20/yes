// Set your name and location here
var name = "Elias";
var weatherLocation = "Casablanca, Morocco";

// SEARCHBAR
var box = document.getElementById("search_box");

// BACKGROUND
var bg = document.getElementById('background');

// this should catch most URLs, or at least the ones I would type.
var urlPattern = /^(https?:\/\/)?[^ ]+[.][^ ]+([.][^ ]+)*(\/[^ ]+)?$/i;

// add on here with more handy things
var handy = /^(google|gmail|trello|wolframalpha|piaomubnb)$/i;

// Greeting and bg changing - NEW
function updateBG() {
	var d = new Date();
	var n = d.getHours();
	if (n >= 21 || n <= 4){
		message = "Goodnight";
		bg.style.background = "url('https://source.unsplash.com/featured/?night,space,northernlights') no-repeat center center fixed";
		bg.style.backgroundSize = "cover";
	} else if ( n >= 5 && n <= 11 ) {
		message = "Good Morning";
		bg.style.background = "url('https://source.unsplash.com/featured/?sunrise,morning') no-repeat center center fixed";
		bg.style.backgroundSize = "cover";
	} else if ( n >= 12 && n <= 16 ) {
		message = "Good Afternoon";
		bg.style.background = "url('https://source.unsplash.com/featured/?sky,city,architecture') no-repeat center center fixed";
		bg.style.backgroundSize = "cover";
	} else if ( n >= 17 && n <= 20 ) {
		message = "Good Evening";
		bg.style.background = "url('https://source.unsplash.com/featured/?sunset') no-repeat center center fixed";
		bg.style.backgroundSize = "cover";
	}
}

function updateName(n) {
	document.getElementById('message').innerHTML = message + ", " + n;
}

// search for text in text box
function search() {
	console.log("Googling \"" + box.value + "\"");
	console.log("Encoded query: \n" + encodeURIComponent(box.value));
	document.location.href = "https://www.google.com/?gws_rd=ssl#safe=off&q=" + encodeURIComponent(box.value);
}

// if not search, nav to somewhere

function nav(address) {
	document.location.href = "https://google.com/?q=" + encodeURIComponent(box.value);
	if (/^(?:(?:https?|ftp):\/\/).*/i.test(address)) {
		document.location.href = address;
	} else {
		document.location.href = "http://" + address;
	}
}

// Handle enter key press in text box
// also handle the command parsing in the event that the text in the box is a command
// TAB unfocuses the searchbar
function searchKeyPress(e) {
	e = e || window.event;
	if (e.keyCode == 13) {
		parseCom(box.value);
	}
	if (e.keyCode == 9) {
		box.blur();
	}
}

// focus the search box on load
window.onload = function() {
	box.focus();
};

// parse the user's command
function parseCom(com) {
	// handle help command
	if (/^help$/i.test(com) || /^commands$/i.test(com)) {
		document.location.href = "commands.txt";
	}

	// handle reddit command
	else if (com.startsWith("rdt") === true) {
		// if any of the custom subreddit commands are matched
		if (/^rdt [A-Za-z]{2,3}$/i.test(com)) {
			var subargs = com.split(" ");
			switch (subargs.pop()) {
				case "pir":
					nav("https://www.reddit.com/r/piracy");
					break;
				case "diy":
					nav("https://www.reddit.com/r/diy");
					break;
				case "jb":
					nav("https://www.reddit.com/r/jailbreak");
					break;
				case "sfw":
					nav("https://www.reddit.com/r/sfwpornnetwork/wiki/network");
					break;
			}
		}
		// if the subreddit command is matched
		else if (/^rdt -r .*$/i.test(com)) {
			var rargs = com.split(" ");
			nav("https://www.reddit.com/r/" + rargs.pop());
		}
		// if the user command is matched
		else if (/^rdt -u .*$/i.test(com)) {
			var uargs = com.split(" ");
			nav("https://www.reddit.com/u/" + uargs.pop());
		}
		// if the search command is matched
		else if (/^rdt -s .{1,140}$/i.test(com)) {
			query = com.replace(/^rdt -s /i, "");
			nav("https://www.reddit.com/search?q=" + encodeURIComponent(query));
		}
		// if the plain old reddit command is matched
		else if (/^rdt$/i.test(com)) {
			nav("https://www.reddit.com/");
		}
		// if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}
	// SEARCH COMMANDS

	// handle google search command
	else if (com.startsWith("ggl") === true) {
		if (/^ggl$/i.test(com)) {
			nav("https://www.google.com/");
		}
		else if (/^ggl .{1,140}$/i.test(com)) {
			query = com.replace(/^ggl /i, "");
			nav("https://www.google.com/?gws_rd=ssl&q=" + encodeURIComponent(query));
		}
	}
	// handle ig command
	else if (com.startsWith("ig") === true) {
		// just plain old ig
		if (/^ig$/i.test(com)) {
			nav("https://www.instagram.com/");
		}
		// ig [@]username command
		else if (/^ig @?[A-Za-z0-9_.]{1,30}/i.test(com)) {
			var iargs = com.split(" ");
			nav("https://www.instagram.com/" + iargs.pop());
		}
		// if anything else, it'll just google it because who cares
		else if (urlPattern.test(com)){
			nav(com);
		}
		// if all else fails, google it
		else {
			search();
		}
	}
	// handle aliexpress command
	else if (com.startsWith("ali") === true) {
		if (/^ali$/i.test(com)) {
			nav("http://www.aliexpress.com/");
		}
		else if (/^ali .{1,140}$/i.test(com)) {
			query = com.replace(/^ali /i, "");
			nav("http://www.aliexpress.com/wholesale?SearchText=" + encodeURIComponent(query));
		}
	}
	// handle imdb command
	else if (com.startsWith("imdb") === true) {
		if (/^imdb$/i.test(com)) {
			nav("https://www.imdb.com/");
		}
		else if (/^imdb .{1,140}$/i.test(com)) {
			query = com.replace(/^imdb /i, "");
			nav("http://www.imdb.com/find?q=" + encodeURIComponent(query));
		}
	}
	// handle metacritic command
	else if (com.startsWith("meta") === true) {
		if (/^meta$/i.test(com)) {
			nav("http://www.metacritic.com/");
		}
		else if (/^meta .{1,140}$/i.test(com)) {
			query = com.replace(/^meta /i, "");
			nav("http://www.metacritic.com/search/all/" + encodeURIComponent(query) + "/results");
		}
	}
	// handle youtube command
	else if (com.startsWith("yt") === true) {
		if (/^yt$/i.test(com)) {
			nav("https://www.youtube.com/");
		}
		else if (/^yt .{1,140}$/i.test(com)) {
			query = com.replace(/^yt /i, "");
			nav("https://www.youtube.com/results?search_query=" + encodeURIComponent(query));
		}
	}
	// handle github command
	else if (com.startsWith("git") === true) {
		if (/^git$/i.test(com)) {
			nav("https://www.github.com");
		}
		else if (/^git .{1,140}$/i.test(com)) {
			query = com.replace(/^git /i, "");
			nav("https://www.github.com/search?q=" + encodeURIComponent(query));
		}
	}
		// handle stackexchange command
	else if (com.startsWith("stack") === true) {
		if (/^stack$/i.test(com)) {
			nav("https://www.stackexchange.com");
		}
		else if (/^stack .{1,140}$/i.test(com)) {
			query = com.replace(/^stack /i, "");
			nav("https://www.stackexchange.com/search?q=" + encodeURIComponent(query));
		}
	}
	// handle tpb command
	else if (com.startsWith("tpb") === true) {
		if (/^tpb$/i.test(com)) {
			nav("https://www.thepiratebay.org");
		}
		else if (/^tpb .{1,140}$/i.test(com)) {
			query = com.replace(/^tpb /i, "");
			nav("https://thepiratebay.org/search/" + encodeURIComponent(query));
		}
	}
		// handle torrentproject command
	else if (com.startsWith("tp") === true) {
		if (/^tp$/i.test(com)) {
			nav("http://torrentproject.se");
		}
		else if (/^tp .{1,140}$/i.test(com)) {
			query = com.replace(/^tp /i, "");
			nav("http://torrentproject.se/?t=" + encodeURIComponent(query));
		}
	}
	else if (com.startsWith("wiki") === true) {
		if (/^wiki$/i.test(com)) {
			nav("https://en.wikipedia.org");
		}
		else if (/^wiki .{1,140}$/i.test(com)) {
			query = com.replace(/^wiki /i, "");
			nav("https://en.wikipedia.org/wiki/" + encodeURIComponent(query));
		}
	}
	// handle duckduckgo / ddg command
	else if (com.startsWith("duckduckgo") === true || com.startsWith("ddg") === true) {
		nav("https://duckduckgo.com/");
	}

	// misc commands
	else if (/^imgur$/i.test(com)) {
		nav("http://www.imgur.com");
	}
	else if (/^inbox$/i.test(com)) {
		nav("http://inbox.google.com");
	}
	else if (/^drive$/i.test(com)) {
		nav("http://drive.google.com");
	}

	else if (/^calendar$/i.test(com)) {
		nav("http://calendar.google.com");
	}

	// Media commands
	else if (/^(twitch|ttv)$/i.test(com)) {
		nav("http://www.twitch.tv/following");
	}
	else if (/^(twitch|ttv) [^ ]+$/i.test(com)) {
		var parts = com.split(" ");
		nav("http://www.twitch.tv/" + parts.pop());
	}
	else if (/^spotify$/i.test(com) || /^sptfy$/i.test(com)) {
		nav("https://play.spotify.com");
	}
	else if (/^soundcloud$/i.test(com) || /^sc$/i.test(com)) {
		nav("https://soundcloud.com/stream");
	}

	// Here are some really handy ones I'll probably have to use
	else if (handy.test(com)) {
		nav("http://www."+com+".com/");
	}
	else if (/^about:[A-Za-z0-9_]+$/i.test(com)) {
		document.location.href = com;
	}
	// These are some commands that are just for fun, and probably won't be added to the list
	else if (/^cout << .*$/i.test(com)) {
		var message = com.replace(/^cout << /i, "");
		alert(message);
	}

	// if it doesn't match any of the commands...
	// ... but is a valid URL
	else if (urlPattern.test(com)) {
		nav(com);
	}
	// ... or should be searched
	else {
		search();
	}
}

// Finds current time and date, formats it properly
function startTime() {
	var now = new Date();
	var hour = ('0' + now.getHours()).slice(-2);
	var mins = now.getMinutes();
	var secs = now.getSeconds();
	var ampm = hour >= 12 ? 'PM' : 'AM';
	var day = ('0' + now.getDate()).slice(-2);
	var month = ('0' + (now.getMonth()+1)).slice(-2);
	var year = now.getFullYear();
  	hour = hour ? hour : 12;
	mins = mins < 10 ? '0' + mins : mins;
	secs = secs < 10 ? '0' + secs : secs;
	var timeString = hour + ':' + mins;
	var dateString = month + '/' + day + '/' + year;
	document.getElementById('time').innerHTML = timeString;
	document.getElementById('date').innerHTML = dateString;
	var t = setTimeout(startTime, 500);
}

// Gets weather for requested location, appends to page
function getWeather(location) {
	$.simpleWeather({
		location: location,
		unit: 'c',
		success: function(weather) {
			$('.weather').html('<a href="' + weather.link + '">' + weather.city + '</a>' + '</br>' + weather.currently + ', ' + weather.temp + '&deg;');
		},
		error: function(error)   {
			$('.weather').html('Sorry, there has been a problem retrieving the weather information.');
		}
	});
}

// Initializes keyboard nav
function bindMousetraps() {
	$.each($('.parent'), function(i, val) {
		Mousetrap.bind($(val).children('span').text(), function(e) {
			$('a#' + $(val).attr('id')).toggleClass('active').next().slideToggle(150);
			$.each($(val).parent().find('.tab span'), function(i, val) {
				Mousetrap.bind($(val).text(), function(e) {
					window.location.href = $(val).parent().attr('href');
				});
			});
			Mousetrap.bind($(val).children('span').text(), function(e) {
				resetMousetraps();
			});
		});
	});

	// Resets on ESC or spacebar
	Mousetrap.bind(['esc', 'space'], function(e) {
		resetMousetraps();
	});
}

// Initializes everything on page load
$(function() {
	startTime();
	bindMousetraps();
	updateBG();
	updateName(name);
	getWeather(weatherLocation);
	
	// Binds click events for opening tabs and background click to close
	$('li a.parent').click(function() {
		$(this).parent('li').find('ul').slideToggle(150);
		$(this).toggleClass('active');
	});
	$('#background').click(function() {
		resetMousetraps();
	});
});
