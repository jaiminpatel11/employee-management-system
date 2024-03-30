const mongoose = require('mongoose');

const validTitles = ['Employee', 'Manager', 'Director', 'VP'];
const validDepartments = ['IT', 'Marketing', 'HR', 'Engineering'];
const validEmployeeTypes = ['FullTime', 'PartTime', 'Contract', 'Seasonal'];

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 20,
    max: 70
  },
  dateOfJoining: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true,
    enum: validTitles
  },
  department: {
    type: String,
    required: true,
    enum: validDepartments
  },
  employeeType: {
    type: String,
    required: true,
    enum: validEmployeeTypes
  },
  currentStatus: {
    type: Boolean,
    default: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
