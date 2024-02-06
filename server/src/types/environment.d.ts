declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PG_HOST: string;
			PG_USER: string;
			PG_PASSWORD: string;
			PG_PORT: string;
			PG_DATABASE: string;
			NODE_ENV: 'development' | 'production';
			API_KEY: string;
		}
	}
}

export {};
