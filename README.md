What is it?
===========

This is module let you search for [Hacker News](https://news.ycombinator.com/) stories. You can filter the news in order to show you only the stories with a minimum score and even email them to you!

Installation
============
As simple as `npm install yc_alerter`


Usages
------

Import the module with `var yc_alerter = require('yc_alerter')`.

In the new es6 fashon `import yc_alerter from yc_alerter`.

--

###get\_top\_stories\_id(cb)

This take the top stories (IDs) from YC and return them into the callback.


--

###get_story(url,cb)
Takes an *url* as argument and return into the callback a **JSON** object containing the story.

The returned object looks like this:

	{
	      "by" : "dhouston",
	      "descendants" : 71,
	      "id" : 8863,
	      "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
	      "score" : 111,
	      "time" : 1175714200,
	      "title" : "My YC app: Dropbox - Throw away your USB drive",
	      "type" : "story",
	      "url" : "http://www.getdropbox.com/u/2/screencast.html"
	  }

--

###get_stories(cb)
Return into a callback an array of **JSON** object containing the stories.


--

###stories\_with\_score(score,cb)
Same as **get_stories** but return into the object only the stories with the minimum score of **score**.

**Example**

	stories_with_score(200,(stories)=>{
		console.log(stories);
	});
	
--

###send_email(email,cb)

Send an email within the [mailgun](https://www.mailgun.com/) api.

Takes an *email* object and a callback. The email object looks like this:

	let email = {
	    apikey: 'my api key',
	    server: 'my server (look in the mailgun panel)',
	    sender: 'myemail@gmail.com',
	    to: 'toEmail@gmail.com',
	    subject: 'YC NEWS!',
	    body: 'Check this amazing news! ..'
	};