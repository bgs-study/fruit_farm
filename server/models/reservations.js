const Reservations = (sequelize, DataTypes) => {
    const Reservations = sequelize.define(
      "Reservations",
      {
        reserv_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          primaryKey: true
        },
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
          defaultValue: "결제완료"
        },
        time: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        farm_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
      }, 
      {
        charset: "utf8",
        collate: "utf8_general_ci",//한글 저장
        tableName: "Reservations",
        timestamps: true,
        paranoid: true,
      }
    );
    Reservations.associate = (db) => {
        db.Reservations.belongsTo(db.Users, {foreignKey: 'user_id', targetKey: "id"});
      };
    return Reservations;
  }
  
  export default Reservations;