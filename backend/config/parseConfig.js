const Parse = require("parse/node");
require("dotenv").config();

const { PARSE_APP_ID, PARSE_JAVASCRIPT_KEY, PARSE_SERVER_URL, PARSE_MASTER_KEY } = process.env;

Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_SERVER_URL;

Parse.masterKey = PARSE_MASTER_KEY;

module.exports = Parse;
