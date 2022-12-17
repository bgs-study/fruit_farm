const Farms = (sequelize, DataTypes) => {
  const Farms = sequelize.define(
    'Farms',
    {
      farm_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '설명 없음',
      },
      owner: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', //한글 저장
      tableName: 'Farms',
      timestamps: true,
    }
  );

  // Farms.associate = (db) => {
  //   db.Farms.belongsTo(db.Users, {
  //     foreignKey: 'user_id',
  //     targetKey: 'id',
  //   });
  // };
  Farms.getAll = () => {
    return Farms.findAll();
  };

  Farms.getByType = (type) => {
    return Farms.findAll({ where: { type } });
  };

  Farms.createFarm = (farmInfo) => {
    return Farms.create(farmInfo).then((data) => {
      return data;
    });
  };

  return Farms;
};

export default Farms;
