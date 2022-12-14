import dotenv from 'dotenv';

dotenv.config();

const MYSQL_USERNAME = process.env.MYSQL_USERNAME; 
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD; 
const MYSQL_DATABASE = process.env.MYSQL_DATABASE; 
const MYSQL_HOST = process.env.MYSQL_HOST; 


const config = {
  "username": MYSQL_USERNAME,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DATABASE,
    "host": MYSQL_HOST,
    "dialect": "mysql"
}

const test = {
  "username": MYSQL_USERNAME,
  "password": MYSQL_PASSWORD,
  "database": MYSQL_DATABASE,
  "host": MYSQL_HOST,
  "dialect": "mysql"
}

const production = {
  "username": MYSQL_USERNAME,
  "password": MYSQL_PASSWORD,
  "database": MYSQL_DATABASE,
  "host": MYSQL_HOST,
  "dialect": "mysql"
}

export {config, production, test};
