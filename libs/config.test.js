module.exports = {
	database: "jtony_ntask_api",
	username: "",
	password: "",
	params: {
		dialect: "sqlite",
		protocol:"sqlite",
		storage: "ntask.sqlite",
		define: {
			underscored: true
		}
	},
	jwtSecret: "12natsk_test34",
	jwt: {session: false}
};