import request from "request"
import async from "async"

class yc_api {
    constructor() {
        this.top_stories_url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
        this.story_url = 'https://hacker-news.firebaseio.com/v0/item';
    }

    // get the top stories on YC and parse them as json to a cb
    get_top_stories_id(cb) {
        request.get(this.top_stories_url, (err, resp, body) => {
            if (err) throw err;
            cb(JSON.parse(body));
        });
    }

    //   get a single story and parse them into a cb as json
    //   Example of story
    //     {
    //   "by" : "dhouston",
    //   "descendants" : 71,
    //   "id" : 8863,
    //   "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
    //   "score" : 111,
    //   "time" : 1175714200,
    //   "title" : "My YC app: Dropbox - Throw away your USB drive",
    //   "type" : "story",
    //   "url" : "http://www.getdropbox.com/u/2/screencast.html"
    // }
    get_story(url, cb) {
        request.get(url, (err, resp, body) => {
            if (err) throw err;
            cb(JSON.parse(body));
        });
    }

    // get the top stories cycle them into the get_story function
    // pass trougth a cb an array of stories
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

    // Get all the stories from the top one's
    // And filter them passing only the story with a minimun score
    // pass an array of story into the cb
    stories_with_score(score, cb) {
        let result = [];
        this.get_stories((stories) => {
            async.each(stories, (story, callback) => {
                if (story.score >= score) {
                    result.push(story);
                }
                callback(null);
            }, (err) => {
                if (err) throw err;
                cb(result)
            });
        });
    }

    // takes the API url of mailgun
    // sender email
    // to email
    // subject and body
    // execute a cb
    //     example of email object:
    //     let email = {
    //     apikey: '',
    //     server: '',
    //     sender: '',
    //     to: '',
    //     subject: '',
    //     body: ''
    // };
    // send_email(email, cb) {
    //     let msg = new mailgun.Mailgun(email.apikey);
    //     msg.sendText(email.sender, email.to,
    //         email.subject,
    //         email.body,
    //         email.server,
    //         'noreply@example.com',
    //         function(err) {
    //             if (err) {
    //                 console.log(err);
    //                 throw err;
    //             }
    //             cb();
    //         });
    // }
}

// let alerter = new yc_api();

// alerter.stories_with_score(500, (stories) => {
//     async.each(stories, (story, cb) => {
//         console.log(`${story.title} url: ${story.url}`);
//         cb();
//     }, (err, res) => {
//         if (err) throw err;
//         console.log('done');
//     });
// });