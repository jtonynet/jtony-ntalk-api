describe("Routes: Token", () => {
	const Users = app.db.models.Users;

	describe("POST /token", () => {
		before(done => {
			//pre test code
			Users
				.destroy({where: {}})
				.then(() => Users.create({
					name: "John",
					email: "john@email.net",
					password: "12345"
				}))
				.then(done());
		});	

		describe("status 200", () => {
			it("returns authenticated user token", done => {
				//test code
				request.post("/token")
					.send({
						email: "john@email.net",
						password: "12345"
					})
					.expect(200)
					.end((err, res) => {
						expect(res.body).to.include.keys("token");
						done(err);
					});
			});
		});

		describe("status 401", () => {
			it("throws error when email not exist", done => {
				//mail error code
				request.post("/token")
					.send({
						email: "WRONG_EMAIL",
						password: "12345"
					})
					.expect(401)
					.end((err, res) => {
						done(err);
					});
			});
			it("throws error when email and password are blank", done => {
				//mail and pass error code
				request.post("/token")
					.expect(401)
					.end((err, res) => {
						done(err);
					})
			});
		});
	});
});