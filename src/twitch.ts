import axios from "axios";

const twitch = axios.create({
  baseURL: "https://api.twitch.tv/helix",
  headers: {
    "Client-ID": process.env.REACT_APP_TWITCH_CLIENT_ID
  }
});

export default twitch;
