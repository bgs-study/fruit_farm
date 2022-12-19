const Users = (sequelize, DataTypes) => {
	const Users = sequelize.define(
		'Users',
		{
			email: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(64),
				allowNull: false,
				unique: true,
			},
			phoneNum: {
				type: DataTypes.STRING(64),
				allowNull: false,
			},
			role: {
				type: DataTypes.STRING(32),
				allowNull: false,
				defaultValue: 'user',
			},
		},
		{
			sequelize,
			charset: 'utf8',
			collate: 'utf8_general_ci', //한글 저장
			tableName: 'Users',
			timestamps: false,
		},
	);

	// Users.associate = (db) => {
	// 	db.Users.hasMany(db.Reservations, {
	// 		foreignKey: 'user_id',
	// 		sourceKey: 'id',
	// 	});
	// };

	Users.findByUserId = (id) => {
		return Users.findOne({ where: { id } });
	};

	Users.findByUserEmail = (email) => {
		return Users.findOne({ where: { email } });
	};

	Users.getUsers = () => {
		return Users.findAll();
	};

	Users.findById = (id) => {
		return Users.findByPk(id);
	};

	Users.createUser = (user) => {
		return Users.create(user).then((data) => data.dataValues.id);
	};

	Users.updateUser = ({ userId, update }) => {
		return Users.update(update, { where: { id: userId } });
		// return {"update_count": result, update};
	};

	Users.deleteUser = (userId) => {
		return Users.destroy({ where: { id: userId } });
	};

	return Users;
};
export default Users;
