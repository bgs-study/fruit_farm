const Reservations = (sequelize, DataTypes) => {
	const Reservations = sequelize.define(
		'Reservations',
		{
			date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			total_price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING(64),
				allowNull: false,
				defaultValue: '결제완료',
			},
			time: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
			farm_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			personnel: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci', //한글 저장
			tableName: 'Reservations',
			timestamps: true,
		},
	);
	Reservations.associate = (db) => {
		db.Reservations.belongsTo(db.Users, {
			foreignKey: 'user_id',
			targetKey: 'id',
		});
	};

	Reservations.createReserve = (reserve) => {
		return Reservations.create(reserve);
	};

	Reservations.findByReserveId = (id) => {
		return Reservations.findOne({ where: { id } });
	};

	Reservations.getReserve = () => {
		return Reservations.findAll();
	};

	Reservations.deleteReserve = (id) => {
		return Reservations.destroy({ where: { id } });
	};

	Reservations.updateReserve = ({ id, update }) => {
		return Reservations.update(update, { where: { id } });
	};

	return Reservations;
};

export default Reservations;
