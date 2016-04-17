import express from "express";
import consign from "consign";

import bodyParser from "body-parser"; //TODO: DEPRECATED, review this.

const app = express();

app.bodyParser = bodyParser(); //TODO: DEPRECATED, review this.

consign()
	.include("libs/config.js")
	.then("db.js")
	.then("libs/middlewares.js")
	.then("routes")
	.then("libs/boot.js")
	.into(app);

