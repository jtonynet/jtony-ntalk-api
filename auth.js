import passport from "passport";
import {Strategy} from "passport-jwt";
import {ExtractJwt} from "passport-jwt";

module.exports = app => {
	const cfg = app.libs.config;
	const Users = app.db.models.Users;
	const params = {
		jwtFromRequest: ExtractJwt.fromAuthHeader(),
		secretOrKey: cfg.jwtSecret
	};

	const strategy = new Strategy(params, (payload, done) => {
			Users.findOne({id: payload.id})
				.then(user => {
					if(user) {
						return done(null, {
							id: user.id,
							email: user.email
						});
					}
					return done(null, false);
				})
				.catch(error => done(error, null));
		});

	passport.use(strategy);

	return {
		initialize: () => {
			return passport.initialize();
		},
		authenticate: () => {
			return passport.authenticate("jwt", cfg.jwtSession);
		}
	};
	
};