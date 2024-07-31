declare namespace NodeJS {
	export interface ProcessEnv {
		DATABASE_URL: string;
		JWT_SECRET: string;
		JWT_REFRESH_SECRET: string;
		JWT_TOKEN_EXPIRES: string;
		JWT_REFRESH_TOKEN_EXPIRES: string;
		JWT_SALT_ROUNDS: number;
	}
}
