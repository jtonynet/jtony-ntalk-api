module.exports = app => {
	app.set("port", (process.env.PORT || 3000));
	app.set("json spaces", 4);

	app.use(app.bodyParser);
	app.use((req, res, next) => {
		delete req.body.id;
		next();
	})
}