'use strict';
//员工薪资
module.exports = function(sequelize, DataTypes) {
  var EmployeeSalary = sequelize.define('EmployeeSalary', {
    employeeId:DataTypes.INTEGER,//员工
    salary:DataTypes.FLOAT,//基本薪资
    commision:DataTypes.FLOAT,//提成
    shopId:DataTypes.INTEGER,//所属门店
    userId:DataTypes.INTEGER//用户
  }, {
    timestamps: false,
    tableName:'t_employee_salary',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return EmployeeSalary;
};
