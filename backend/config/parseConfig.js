require('dotenv').config();
const Parse = require("parse/node");

const APP_ID = process.env.PARSE_APP_ID;
const JAVASCRIPT_KEY = process.env.PARSE_JAVASCRIPT_KEY;

Parse.initialize(APP_ID, JAVASCRIPT_KEY);
Parse.serverURL = process.env.PARSE_SERVER_URL;

module.exports = Parse;
