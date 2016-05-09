import jwt from "jwt-simple";

describe("Routes: Tasks", () => {
	const Users = app.db.models.Users;
	const Tasks = app.db.models.Tasks
	const jwtSecret = app.libs.config.jwtSecret;

	let token;
	let fakeTask;
	
	beforeEach(done => {
		Users
			.destroy({where: {}})
			.then(() => Users.create({
				name: "John",
				email: "john@email.net",
				password: "12345"
			}))
			.then(user => {
				Tasks
					.destroy({where: {}})
					.then(() => Tasks.bulkCreate([{
						id: 1,
						title: "Work",
						user_id: user.id
					}, {
						id: 2,
						title: "Study",
						user_id: user.id
					}]))
					.then(tasks => {
						fakeTask => tasks[0];
						token = jwt.encode({id: user.id}, jwtSecret);
						done();
					});
			});
	});

	describe("GET /tasks", () => {
		describe("status 200", () => {
			it("Returns list of tasks", done => {
				request.get("/tasks")
					.set("Authorization", 'JWT '+token)
					.expect(200)
					.end((err, res) => {
						expect(res.body).to.have.length(2);
						expect(res.body[0].title).to.eql("Work");
						expect(res.body[1].title).to.eql("Study");
						done(err);
					});
			});
		});
	});

	describe("POST /tasks/", () => {
		describe("status 200", () => {
			it("Creates a new task", done => {
				request.post("/tasks")
					.set("Authorization", 'JWT '+token)
					.send({title: "Run"})
					.expect(200)
					.end((err, res) => {
						expect(res.body.title).to.eql("Run");
						expect(res.body.done).to.be.false;
						done(err);
					});
			});
		});
	});

/*
	describe("GET /tasks/:id", () => {
		describe("status 200", () => {
			it("retunrs one task", done => {
				//test code
			});
		});

		describe("status 404", () => {
			it("throws error when task not exist", done => {
				//tests code
			});
		});
	});
*/

	/*
	describe("PUT /tasks/:id", () => {
		describe("status 204", () => {
			it("updates a task", done => {
				//test code
			});
		});
	});

	describe("DELETE /tasks/:id", () => {
		describe("status 204", () => {
			it("removes a task", done => {
				//test code
			});
		});
	});
	*/
});