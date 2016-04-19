module.exports = {
	database: process.env.DATABASE_NAME,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PWD,
	params: {
		dialect: "postgres",
		protocol:"postgres",
		port: process.env.DATABASE_PORT,
		host: process.env.DATABASE_HOST,
		define: {
			underscored: true
		}
	},
	jwtSecret: process.env.DATABASE_JWT_SECRET,
	jwt: {session: false}
};