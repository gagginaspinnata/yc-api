"use strict";
const axios = require("axios");

class API {
  constructor() {
    this.top_stories_url =
      "https://hacker-news.firebaseio.com/v0/topstories.json";
    this.story_url = "https://hacker-news.firebaseio.com/v0/item";
  }

  // get the top stories on YC and parse them as json to a cb
  async get_top_stories_id() {
    const stories = await axios.get(this.top_stories_url);
    return stories.data;
  }

  async get_story(url) {
    const story = await axios.get(url);
    return story.data;
  }

  // get the top stories cycle them into the get_story function
  // pass trougth a cb an array of stories
  async get_stories() {
    let promises = [];
    const ids = await this.get_top_stories_id();
    for (let id of ids) {
      let url = `${this.story_url}/${id}.json`;
      const story = this.get_story(url);
      promises.push(story);
    }

    const stories = await Promise.all(promises);
    return stories;
  }

  // Get all the stories from the top one's
  // And filter them passing only the story with a minimun score
  // pass an array of story into the cb
  async stories_with_score(score) {
    let result = [];
    const stories = await this.get_stories();
    for (let story of stories) {
      if (story.score >= score) result.push(story);
    }
    return result;
  }
}

const api = new API();
api.stories_with_score(100).then(data => console.log(data));
module.exports = API;
