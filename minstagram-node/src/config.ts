import * as dotenv from "dotenv";

dotenv.config();

export default {
	mongo: {
		mongoUsername: process.env.MONGO_USERNAME,
		mongoPassword: process.env.MONGO_PASSWORD,
		mongoHostname: process.env.MONGO_HOSTNAME,
		mongoPort: process.env.MONGO_PORT,
		mongoDb: process.env.MONGO_DB,
		dbUrl: (() => {
			if (process.env.NODE_ENV === "production") {
				return `${process.env.DB_URL}?authSource=${process.env.DB_AUTH_SOURCE}`;
			}
			return process.env.DB_URL || "example";
		})(),
	},
	resource: {
		staticPath: process.env.FILE_PATH,
	},
	auth: {
		saltRounds: process.env.SALT_ROUNDS || "20",
		accessTokenDuration: process.env.ACCESS_TOKEN_DURATION || "30m",
		refreshTokenDuration: process.env.REFRESH_TOKEN_DURATION,
		accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY || "abc123",
		refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY || "abc123",
	},
	allowedOrigin: process.env.ALLOWED_ORIGIN,
};
