module.exports = {
	database: process.env.DATABASE_NAME || "jtony_ntask_api",
	username: process.env.DATABASE_USER || "postgres",
	password: process.env.DATABASE_PWD  || "postgres",
	params: {
		dialect: "postgres",
		protocol:"postgres",
		port: process.env.DATABASE_PORT || "5432",
		host: process.env.DATABASE_HOST || "localhost",
		define: {
			underscored: true
		}
	}
};