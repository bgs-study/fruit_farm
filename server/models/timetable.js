import db from './index.js';

const TimeTables = (sequelize, DataTypes) => {
	const timeTable = sequelize.define(
		'timeTable',
		{
			id: {
				type: DataTypes.INTEGER,
				unique: true,
				primaryKey: true,
				autoIncrement: true,
			},
			date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			personnel: {
				type: DataTypes.INTEGER, // NUMBER 로 바꿔줘야할 것 같음
				allowNull: false,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			start_time: {
				type: DataTypes.TIME,
				allowNull: false,
			},
			end_time: {
				type: DataTypes.TIME,
				allowNull: false,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci', //한글 저장
			//paranoid: true => destroy 했을 때, 완전 삭제가 안되고 deleted_At에 시간이 저장됨 복구시킬려면 .restore() 하면됨, 강제로 삭제는 {force: true}
		},
	);

	timeTable.associate = (db) => {
		db.TimeTables.belongsTo(db.Farms);
	};

	timeTable.getAll = (id) => {
		return timeTable.findOne({
			attributes: [
				'id',
				'date',
				'personnel',
				'price',
				'start_time',
				'end_time',
				[DataTypes.col('farm.address'), 'address'],
				[DataTypes.col('farm.name'), 'name'],
				[DataTypes.col('farm.url'), 'url'],
			],
			include: {
				model: db.Farms,
				//attributes: [],
			},
			where: { id },
		});
	};

	timeTable.getAllWithFarmName = (id) => {
		return timeTable.findOne({
			attributes: [
				'id',
				'date',
				'personnel',
				'price',
				'start_time',
				'end_time',
				[DataTypes.col('farm.name'), 'name'],
				[DataTypes.col('farm.url'), 'url'],
			],
			include: {
				model: db.Farms,
				//attributes: [],
			},
			where: { id },
		});
	};

	timeTable.findFarmId = (id) => {
		return timeTable.findAll({ where: { farmId: id } });
	};

	timeTable.getById = (id) => {
		return timeTable.findOne({ where: { id } });
	};

	timeTable.createTable = (tableInfo) => {
		return timeTable.create(tableInfo).then((data) => {
			return data;
		});
	};

	timeTable.findtimetableFromFarmId = (id) => {
		return timeTable.findAll({ where: { farmId: id } });
	};

	timeTable.updateTable = (updateInfo, id) => {
		return timeTable.update(updateInfo, {
			where: { id },
		});
	};

	timeTable.remove = (id) => {
		return timeTable.destroy({ where: { id } });
	};

	timeTable.getTimeTables = (farmId, lastId, limit) => {
		let cursor = lastId || 0;
		return timeTable.findAll({
			attributes: [
				'id',
				'date',
				'personnel',
				'price',
				'start_time',
				'end_time',
				[DataTypes.col('farm.url'), 'url'],
			],
			include: {
				model: db.Farms,
				attributes: [],
			},
			limit: parseInt(limit),
			where: {
				farmId,
				id: {
					[DataTypes.Op.gt]: cursor,
				},
			},
			order: [['date', 'DESC']],
		});
	};

	// timeTable.subtractPersonnel = (timetableId, perssonel) => {
	// 	return timeTable.findOne({
	// 		where: { id: timetableId },
	// 	});
	// };

	return timeTable;
};

export default TimeTables;
