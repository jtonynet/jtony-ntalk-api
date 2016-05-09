import jwt from "jwt-simple";

module.exports = app => {
	const cfg = app.libs.config;
	const Users = app.db.models.Users;

	/**
	 *	@api {post} /token Token autenticado
	 *	@apiGroup Credencial
	 *	@apiParam {String} email Email do usuário
	 *	@apiParam {String} password Senha do usuário
	 *	@apiExample {json} Entrada
	 *	{
	 *		"email": "johnconnor@gmail.com"
	 *		"password": "12345"
	 *	}
	 *	@apiSuccess {String} token Token do usuário autenticado
	 *	@apiSuccessExample {json} Sucesso
	 *		HTTP/1.1 200 OK
	 *		{"token": "xyz.abc.123.hgf"}
	 *	@apiErrorExample {json} Erro de autenticação
	 *		HTTP/1.1 401 Unauthorized
	 */
	app.post("/token", (req, res) => {
		if(req.body.email && req.body.password) {
			const email = req.body.email;
			const password = req.body.password;

			Users.findOne({where: {email: email}})
				.then(user => {
					if(Users.isPassword(user.password, password)) {
						const payload = {id: user.id};
						res.json({
							token: jwt.encode(payload, cfg.jwtSecret)
						});
					} else {
						res.sendStatus(401);
					}
				})
				.catch(error => res.sendStatus(401));
		} else {
			res.sendStatus(401);
		}
	});
};