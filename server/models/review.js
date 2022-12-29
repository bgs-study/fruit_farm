import db from './index.js';

const Reviews = (sequelize, DataTypes) => {
	const Reviews = sequelize.define(
		'Reviews',
		{
			content: {
				type: DataTypes.TEXT('long'),
				allowNull: false,
			},
			reserve_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			farm_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			rating: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci', //한글 저장
			tableName: 'Reviews',
			timestamps: true,
		},
	);

	Reviews.associate = (db) => {
		db.Reviews.belongsTo(db.Users, {
			foreignKey: 'user_id',
			targetKey: 'id',
		});
	};

	Reviews.createReview = (review) => {
		return Reviews.create(review);
	};

	Reviews.findByReviewId = (id) => {
		return Reviews.findOne({ where: { id } });
	};

	Reviews.findByUserPkId = (id, userId) => {
		return Reviews.findOne({ where: { id: id, user_id: userId } });
	};

	Reviews.findByFarmerPkId = (id, farmId) => {
		return Reviews.findOne({ where: { id: id, farm_id: farmId } });
	}

	Reviews.findByReserveId = (id) => {
		return Reviews.findOne({where: {reserve_id: id}})
	}

	Reviews.findByUserId = (id) => {
		return Reviews.findAll({ where: { user_id: id } });
	};
	Reviews.findByFarmId = (id) => {
		return Reviews.findAll({ where: { farm_id: id } });
	};

	Reviews.findByFarmIdAndUser = (id) => {
		return Reviews.findAll({
			attributes: [
			'id',
			'content',
			'reserve_id',
			'farm_id',
			'rating',
			'createdAt',
			[DataTypes.col('User.name'), 'name'],
			[DataTypes.col('User.email'), 'email'],
			],
			include: {
				model: db.Users,
			},
			where: { farm_id: id } 
		});
	};

	Reviews.deleteReview = (id) => {
		return Reviews.destroy({ where: { id } });
	};

	Reviews.updateReview = ({ id, update }) => {
		return Reviews.update(update, { where: { id } });
	};

	Reviews.getReviews = () => {
		return Reviews.findAll();
	};

	return Reviews;
};

export default Reviews;
