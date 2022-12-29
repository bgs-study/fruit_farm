import dotenv from 'dotenv';

dotenv.config();

const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_HOST = process.env.MYSQL_HOST;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const S3ACCESSKEYID = process.env.S3ACCESSKEYID;
const S3SECRETACCESSKEY = process.env.S3SECRETACCESSKEY;
const REGION = process.env.REGION;

const config = {
	username: MYSQL_USERNAME,
	password: MYSQL_PASSWORD,
	database: MYSQL_DATABASE,
	host: MYSQL_HOST,
	dialect: 'mysql',
	bcrypt: {
		saltRounds: 12,
	},
	logging: false,
	jwt: JWT_SECRET_KEY,
};

const test = {
	username: MYSQL_USERNAME,
	password: MYSQL_PASSWORD,
	database: MYSQL_DATABASE,
	host: MYSQL_HOST,
	dialect: 'mysql',
};

const production = {
	username: MYSQL_USERNAME,
	password: MYSQL_PASSWORD,
	database: MYSQL_DATABASE,
	host: MYSQL_HOST,
	dialect: 'mysql',
};

const s3 = {
	accessKeyId: S3ACCESSKEYID,
	secretAccessKey: S3SECRETACCESSKEY,
	region: REGION,
};

export { config, production, test, s3 };
