What is it?
===========

This is a wrapper module around the [Hacker News](https://news.ycombinator.com/) API. You can filter the news in order to show you only the stories with a minimum score.

Installation
============
As simple as `npm install yc-api`


Usages
------

Import the module with `var yc-api = require('yc-api')`.

In the new es6 fashon `import yc-pi from yc-api`.


### get\_top\_stories\_id(cb)

This take the top stories (IDs) from YC and return them into the callback.



### get_story(url,cb)
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


### get_stories(cb)
Return into a callback an array of **JSON** object containing the stories.



### stories\_with\_score(score,cb)
Same as **get_stories** but return into the object only the stories with the minimum score of **score**.

**Example**

	stories_with_score(200,function (stories){
		console.log(stories);
	});


Example
=======

	var yc_api = require('yc-api');
	var async = require('async');

	var yc = new yc_api.API;

	yc.stories_with_score(500, function (stories)  {
	    async.each(stories,function (story, cb)  {
	        console.log(story.title);
	        cb();
	    }, function (err, res) {
	        if (err) throw err;
	        console.log('done');
	    });
	});
	
