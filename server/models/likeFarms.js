const LikeFarms = (sequelize, DataTypes) => {
	const LikeFarms = sequelize.define(
		'LikeFarms',
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
			tableName: 'LikeFarms', //한글 저장
			timestamps: false,
		},
	);

	LikeFarms.associate = (db) => {
		db.LikeFarms.belongsTo(db.Farms, {
			foreignKey: 'farm_id',
			targetKey: 'id',
		});
	};

	LikeFarms.createLike = (like) => {
		return LikeFarms.create(like);
	};

	LikeFarms.findLike = (id) => {
		return LikeFarms.findAll({ where: { user_id: id } });
	};

	LikeFarms.deleteLike = (userId, farmId) => {
		return LikeFarms.destroy({ where: { user_id: userId, farm_id: farmId } });
	};

	return LikeFarms;
};

export default LikeFarms;
