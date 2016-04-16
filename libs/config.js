module.exports = {
	database: process.env.DATABASE_NAME || "jtony_ntask_api",
	username: process.env.DATABASE_USER || "postgres",
	password: process.env.DATABASE_PWD  || "postgres",
	params: {
		dialect: "postgres",
		storage: process.env.DATABASE_STORAGE || "postgresql://localhost:5432",
		define: {
			underscored: true
		}
	}
};