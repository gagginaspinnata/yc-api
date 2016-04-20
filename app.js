"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Alerter = function () {
    function Alerter() {
        var _this = this;

        _classCallCheck(this, Alerter);

        this.top_stories_url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
        this.story_url = 'https://hacker-news.firebaseio.com/v0/item';
        this.min_score = 300;

        this.get_stories(function (stories) {
            _this.stories_with_score(stories, 10, function (result) {
                console.log(result);
            });
        });
    }

    _createClass(Alerter, [{
        key: "get_top_stories_id",
        value: function get_top_stories_id(cb) {
            _request2.default.get(this.top_stories_url, function (err, resp, body) {
                if (err) throw err;
                cb(JSON.parse(body));
            });
        }
    }, {
        key: "get_story",
        value: function get_story(url, cb) {
            _request2.default.get(url, function (err, resp, body) {
                if (err) throw err;
                cb(JSON.parse(body));
            });
        }

        //when this is done the global var list_of_stories
        // will have an array with all the top stories

    }, {
        key: "get_stories",
        value: function get_stories(cb) {
            var _this2 = this;

            var result = [];
            this.get_top_stories_id(function (stories_id) {
                _async2.default.each(stories_id, function (story_id, callback) {
                    var url = _this2.story_url + "/" + story_id + ".json";
                    _this2.get_story(url, function (data) {
                        result.push(data);
                        callback(null);
                    });
                }, function (err) {
                    if (err) throw err;
                    cb(result);
                });
            });
        }
    }, {
        key: "stories_with_score",
        value: function stories_with_score(stories, score, cb) {
            var _this3 = this;

            var result = [];
            _async2.default.each(stories, function (story, callback) {
                if (story.score >= _this3.min_score) {
                    result.push(story);
                }
                callback(null);
            }, function (err) {
                if (err) throw err;

                cb(result);
            });
        }
    }]);

    return Alerter;
}();

var alerter = new Alerter();
