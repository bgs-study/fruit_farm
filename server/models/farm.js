import Sequelize from 'sequelize';
import db from './index.js';
const Op = Sequelize.Op;

const Farms = (sequelize, DataTypes) => {
	const farm = sequelize.define(
		'farm',
		{
			type: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
				defaultValue: '설명 없음',
			},
			owner: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			url: {
				type: DataTypes.STRING(1234),
				allowNull: false,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		},
	);

	farm.findById = (id) => {
		return farm.findByPk(id);
	};

	farm.getAll = (lastId, limit) => {
		let cursor = lastId || 0;
		return farm.findAll({
			limit: parseInt(limit),
			where: {
				id: {
					[DataTypes.Op.gt]: cursor,
				},
			},
			order: [['createdAt', 'DESC']],
		});
	};

	farm.getByType = (type) => {
		return farm.findAll({ where: { type } });
	};

	farm.getByAddress = (location) => {
		return farm.findAll({
			where: {
				address: {
					[Op.like]: '%' + location + '%',
				},
			},
		});
	};

	farm.updateFarm = (id, updateInfo) => {
		return farm.update(updateInfo, { where: { id } });
	};

	farm.createFarm = (farmInfo) => {
		return farm.create(farmInfo);
	};

	farm.remove = (id) => {
		return farm.findByPk(id).then((farm) => farm.destroy());
	};

	return farm;
};

export default Farms;
