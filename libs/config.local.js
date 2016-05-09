import logger from "./logger.js";

module.exports = {
	database: "jtony_ntask_api",
	username: "postgres",
	password: "postgres",
	params: {
		dialect: "postgres",
		protocol:"postgres",
		port: "5432",
		host: "localhost",
		logging: (sql) => {
			logger.info("["+(new Date())+"] "+sql);
		},
		define: {
			underscored: true
		}
	},
	jwtSecret: "12ntask_local34",
	jwtSession: {session: false}
};