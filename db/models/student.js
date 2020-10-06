"use strict";

const Sequelize = require("sequelize");
const db = require("../db");

const Student = db.define("student", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

Student.beforeCreate((student) => {
  const studentFirstName = student.firstName;
  const studentLastName = student.lastName;
  student.firstName =
    studentFirstName[0].toUpperCase() + studentFirstName.slice(1);
  student.lastName =
    studentLastName[0].toUpperCase() + studentLastName.slice(1);
});

module.exports = Student;
