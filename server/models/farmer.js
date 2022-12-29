import db from './index.js';

const Farmers = (sequelize, DataTypes) => {
	const farmer = sequelize.define(
		'farmer',
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
				type: DataTypes.STRING,
				allowNull: false,
			},
			phoneNum: {
				type: DataTypes.STRING(64),
				allowNull: false,
			},
			role: {
				type: DataTypes.STRING(32),
				allowNull: true,
				defaultValue: 'farmer',
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci', //한글 저장
		},
	);

	farmer.associate = (db) => {
		db.Farmers.belongsTo(db.Farms);
	};

	// farmer.findByFarmerId = (id) => {
	// 	return farmer.findOne({ where: { id } });
	// };

	farmer.findByFarmerEmail = (email) => {
		return farmer.findOne({ where: { email } });
	};

	farmer.getFarmInfo = (farmerId) => {
		return farmer.findOne({
			where: { id: farmerId },
		});
	};

	farmer.findById = (id) => {
		return farmer.findByPk(id);
	};

	farmer.getFarmIdFromFarmer = (id) => {
		return farmer.findByPk(id).then((data) => {
			return data.dataValues.farmId;
		});
	};

	farmer.getFarmerInfoFromFarmId = (id) => {
		return farmer
			.findOne({ where: { farmId: id } })
			.then((data) => data.dataValues);
	};

	farmer.createFarmer = (user) => {
		return farmer.create(user).then((data) => data.dataValues.id);
	};

	farmer.findByFarmId = (id) => {
		return farmer.findOne({ where: { farmId: id } });
	};

	farmer.updateFarmer = (farmerId, update) => {
		return farmer.update(update, { where: { id: farmerId } });
	};

	farmer.registeFarmId = (id, farmerId) => {
		return farmer.update({ farmId: id }, { where: { id: farmerId } }); // id가 어디인데서
	};

	// farmer.deleteFarmer = (farmerId) => {
	// 	return farmer.destroy({ where: { id: farmerId } });
	// };

	return farmer;
};
export default Farmers;
