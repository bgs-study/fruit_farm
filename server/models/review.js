const Reviews = (sequelize, DataTypes) => {
	const Reviews = sequelize.define(
		'Reviews',
		{
			content: {
				type: DataTypes.TEXT('long'),
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

	Reviews.findByFarmId = (id) => {
		return Reviews.findOne({ where: { id } });
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
