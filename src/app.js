import request from "request"
import async from "async"

class Alerter {
    constructor() {
        this.top_stories_url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
        this.story_url = 'https://hacker-news.firebaseio.com/v0/item';
    	this.min_score = 300;

        this.get_stories((stories)=>{
        	this.stories_with_score(stories,10,(result)=>{
        		console.log(result);
        	})
        });


    }

    get_top_stories_id(cb) {
        request.get(this.top_stories_url, (err, resp, body) => {
            if (err) throw err;
            cb(JSON.parse(body));
        });
    }

    get_story(url, cb) {
        request.get(url, (err, resp, body) => {
            if (err) throw err;
            cb(JSON.parse(body));
        });
    }

    //when this is done the global var list_of_stories
    // will have an array with all the top stories
    get_stories(cb) {
    	let result = []
        this.get_top_stories_id((stories_id) => {
            async.each(stories_id, (story_id, callback) => {
                let url = `${this.story_url}/${story_id}.json`
                this.get_story(url, (data) => {
                    result.push(data);
                    callback(null);

                });
            }, (err) => {
            	if (err) throw err;
                cb(result);
            });
        });
    }

    stories_with_score(stories,score,cb){
    	let result = [];
    	async.each(stories,(story,callback)=>{
    		if(story.score>=this.min_score){
    			result.push(story);
    		}
    		callback(null);
    	},
    	(err)=>{
    		if(err)throw err;

    		cb(result)
    	});
    }
}

let alerter = new Alerter();