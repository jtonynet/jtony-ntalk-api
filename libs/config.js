module.exports = {
	database: "jtony_ntask_api",
	username:"postgres",
	password:"postgres",
	params: {
		dialect: "postgres",
		storage: "postgresql://localhost:5432",
		define: {
			underscored: true
		}
	}
};