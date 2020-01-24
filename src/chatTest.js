const axios = require("axios").default;
const _ = require("lodash");
const startOfMinute = require("date-fns/startOfMinute");

const comments = [];

const getChat = async videoId => {
  console.log("Fetching chat logs...");
  let cursor = null;
  while (cursor !== undefined) {
    const resp = await axios.get(
      `https://api.twitch.tv/v5/videos/${videoId}/comments`,
      {
        params: { cursor },
        headers: {
          "Client-ID": "l7w76k42y3ocxujgl5wweztwkpy3fh"
        }
      }
    );
    comments.push(
      ...resp.data.comments.map(comment => ({
        body: comment.message.body,
        createdAt: comment.created_at
      }))
    );
    cursor = resp.data._next;
    console.log(`Fetched ${comments.length} comments so far...`);
  }
};

getChat(process.argv[2]).then(() => {
  console.log("Searching for the best moments...");
  const topTenMoments = _.chain(comments)
    .filter(comment => comment.body.toLowerCase().includes("pog"))
    .groupBy(comment => startOfMinute(Date.parse(comment.createdAt)))
    .mapValues((comments, createdAt) => ({
      timestamp: createdAt,
      pogCount: comments.length
    }))
    .values()
    .orderBy(["pogCount"], ["desc"])
    .slice(0, 10)
    .value();
  console.log("Top 10 Pog-worthy moments:");
  console.log(topTenMoments);
});
