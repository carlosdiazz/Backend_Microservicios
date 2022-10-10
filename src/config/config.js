"use strict";
exports.__esModule = true;
exports.URL_API = exports.MONGO_URI = exports.SECRET_JWT_TOKEN = exports.PORT_APP = void 0;
var dotenv = require("dotenv");
dotenv.config();
exports.PORT_APP = process.env.PORT_APP || 3000;
exports.SECRET_JWT_TOKEN = process.env.SECRET_JWT_TOKEN || 'TOKEN-MEGA-SECRETO-ULTRA';
exports.MONGO_URI = process.env.MONGO_URI || '';
exports.URL_API = process.env.URL_API || 'http://localhost:4300';
