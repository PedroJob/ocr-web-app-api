declare namespace NodeJS {
	export interface ProcessEnv {
		DATABASE_URL: string;
		JWT_SECRET: string;
		JWT_REFRESH_SECRET: string;
		JWT_TOKEN_EXPIRES: string;
		JWT_REFRESH_TOKEN_EXPIRES: string;
		JWT_SALT_ROUNDS: number;
		AWS_ACCESS_KEY_ID: string;
		AWS_SECRET_ACCESS_KEY: string;
		AWS_REGION: string;
		AWS_S3_BUCKET_NAME: string;
		OPENAI_API_KEY: string;
	}
}
