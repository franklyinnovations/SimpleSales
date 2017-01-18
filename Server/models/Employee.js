'use strict';
//员工
module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile:DataTypes.STRING,
    email:DataTypes.STRING,
    telphone:DataTypes.STRING,
    address:DataTypes.STRING,
    registerDate:DataTypes.DATE,
    shopId:DataTypes.INTEGER,
    userId:DataTypes.INTEGER,
    roleId:DataTypes.INTEGER,
    state:DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName:'t_employee',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Employee;
};
