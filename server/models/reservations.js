const Reservations = (sequelize, DataTypes) => {
    const Reservations = sequelize.define(
      "Reservations",
      {
        reserve_id: {
          type: DataTypes.INTEGER,
          unique: true,
          primaryKey: true,
          autoIncrement: true
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
        personnel: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      }, 
      {
        charset: "utf8",
        collate: "utf8_general_ci",//한글 저장
        tableName: "Reservations",
        timestamps: true
      }
    );
    Reservations.associate = (db) => {
        db.Reservations.belongsTo(db.Users, {foreignKey: 'user_id', targetKey: "id"});
    };

    Reservations.createReserve = (reserve) => {
      return Reservations.create(reserve)
    };
    
    Reservations.findByReserveId = (reserve_id) => {
      return Reservations.findOne({where: {reserve_id}})
    }

    Reservations.getUsers = ()=> {
      return Reservations.findAll();
    }

    Reservations.deleteReserve = (reserve_id)=> {
      return Reservations.destroy({where: {reserve_id}})
    }

    Reservations.updateReserve = ({reserve_id, update}) => {
      return Reservations.update(update, {where: {reserve_id}})
    }
  
    return Reservations;
  }
  
  export default Reservations;