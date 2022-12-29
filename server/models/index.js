import Sequelize from 'sequelize';
import Users from './auth.js';
import Reservations from './reservations.js';
import Farms from './farm.js';
import Reviews from './review.js';
import TimeTables from './timetable.js';
import Farmers from './farmer.js';
import LikeFarms from './likeFarms.js';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const env = process.env.NODE_ENV || 'development';
import { config } from '../config/config.js';

const db = {};
const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config,
);

db.Users = Users(sequelize, Sequelize);
db.Reservations = Reservations(sequelize, Sequelize);
db.Farms = Farms(sequelize, Sequelize);
db.Reviews = Reviews(sequelize, Sequelize);
db.TimeTables = TimeTables(sequelize, Sequelize);
db.Farmers = Farmers(sequelize, Sequelize);
db.LikeFarms = LikeFarms(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
