import passport from "passport";
import {Strategy} from "passport-jwt";
import {ExtractJwt} from "passport-jwt";

module.exports = app => {
	const cfg = app.libs.config;

	passport.use(new Strategy({jwtFromRequest: ExtractJwt.fromAuthHeader(), secretOrKey: cfg.jwtSecret},
		(payload, done) => {
			User.findOne({id: payload.id})
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
		})
	);

	/*
	const Users = app.db.models.Users;
	const cfg = app.libs.config;

	console.log(Strategy.jwtFromRequest);

	const strategy = new Strategy({jwtFromRequest:()=>{}, secretOrKey: cfg.jwtSecret},
		(payload, done) => {
			Users.findById({id: payload.id})
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
		}
	);

	passport.use(strategy);
	*/

	return {
		initialize: () => {
			return passport.initialize();
		},
		authenticate: () => {
			return passport.authenticate("jwt", cfg.jwtSession);
		}
	};

};