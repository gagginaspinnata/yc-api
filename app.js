"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YC_Alerter = function () {
    function YC_Alerter() {
        _classCallCheck(this, YC_Alerter);

        this.top_stories_url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
        this.story_url = 'https://hacker-news.firebaseio.com/v0/item';
    }

    // get the top stories on YC and parse them as json to a cb


    _createClass(YC_Alerter, [{
        key: "get_top_stories_id",
        value: function get_top_stories_id(cb) {
            _request2.default.get(this.top_stories_url, function (err, resp, body) {
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

    }, {
        key: "get_story",
        value: function get_story(url, cb) {
            _request2.default.get(url, function (err, resp, body) {
                if (err) throw err;
                cb(JSON.parse(body));
            });
        }

        // get the top stories cycle them into the get_story function
        // pass trougth a cb an array of stories

    }, {
        key: "get_stories",
        value: function get_stories(cb) {
            var _this = this;

            var result = [];
            this.get_top_stories_id(function (stories_id) {
                _async2.default.each(stories_id, function (story_id, callback) {
                    var url = _this.story_url + "/" + story_id + ".json";
                    _this.get_story(url, function (data) {
                        result.push(data);
                        callback(null);
                    });
                }, function (err) {
                    if (err) throw err;
                    cb(result);
                });
            });
        }

        // Get all the stories from the top one's
        // And filter them passing only the story with a minimun score
        // pass an array of story into the cb

    }, {
        key: "stories_with_score",
        value: function stories_with_score(score, cb) {
            var result = [];
            this.get_stories(function (stories) {
                _async2.default.each(stories, function (story, callback) {
                    if (story.score >= score) {
                        result.push(story);
                    }
                    callback(null);
                }, function (err) {
                    if (err) throw err;
                    cb(result);
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

    }]);

    return YC_Alerter;
}();

// let alerter = new Alerter();

// alerter.stories_with_score(500, (stories) => {
//     async.each(stories, (story, cb) => {
//         console.log(`${story.title} url: ${story.url}`);
//         cb();
//     }, (err, res) => {
//         if (err) throw err;
//         console.log('done');
//     });
// });
