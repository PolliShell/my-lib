const Parse = require("parse/node");
require("dotenv").config();

const { PARSE_APP_ID, PARSE_JAVASCRIPT_KEY, PARSE_SERVER_URL } = process.env;

Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_SERVER_URL;

module.exports = Parse;
