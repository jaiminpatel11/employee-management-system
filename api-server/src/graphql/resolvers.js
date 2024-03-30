const User = require('../models/User');

const resolvers = {
  Query: {
    users: async (_, { filter }) => {
      try {
        let query = {};

        if (filter) {
          // Check if search term is provided
          if (filter.searchTerm) {
            query.$or = [
              { firstName: { $regex: new RegExp(filter.searchTerm, 'i') } },
              { lastName: { $regex: new RegExp(filter.searchTerm, 'i') } },
            ];
          }

          // Check if department is provided
          if (filter.department) {
            query.department = { $regex: new RegExp(filter.department, 'i') };
          }
        }

        if(filter.employeeType){
          query.employeeType = filter.employeeType;
        }

        // Use the constructed query to fetch users
        const users = await User.find(query);
        return users;
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    userById:async(_,{id}) => {
      try {
        const user = await User.findById(id);
        if(!user){
          throw new Error('User Not found');
        }
        return user;
      }catch(error){
        throw new Error(error.message);
      }
    }
  },
  Mutation: {
    createUser: async (_, { firstName, lastName, age, dateOfJoining, title, department, employeeType }) => {
      try {

        // Validate age range (between 20 and 70)
        if (age < 20 || age > 70) {
          throw new Error('Age must be between 20 and 70.');
        }

        // Validate title against allowed values
        const allowedTitles = ['Employee', 'Manager', 'Director', 'VP'];
        if (!allowedTitles.includes(title)) {
          throw new Error('Invalid title. Allowed values are Employee, Manager, Director, VP.');
        }

        // Validate department against allowed values
        const allowedDepartments = ['IT', 'Marketing', 'HR', 'Engineering'];
        if (!allowedDepartments.includes(department)) {
          throw new Error('Invalid department. Allowed values are IT, Marketing, HR, Engineering.');
        }

        // Validate employeeType against allowed values
        const allowedEmployeeTypes = ['FullTime', 'PartTime', 'Contract', 'Seasonal'];
        if (!allowedEmployeeTypes.includes(employeeType)) {
          throw new Error('Invalid employee type. Allowed values are FullTime, PartTime, Contract, Seasonal.');
        }

        // Assuming default value for currentStatus is 1
        const currentStatus = 1;

        // Create a new user instance
        const user = new User({ firstName, lastName, age, dateOfJoining, title, department, employeeType, currentStatus });

        // Save the user to the database
        await user.save();

        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateEmployee: async (_, { id, title, department, currentStatus }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found');
        }
  
        if (title) {
          user.title = title;
        }
        if (department) {
          user.department = department;
        }
        if (currentStatus !== undefined) {
          user.currentStatus = currentStatus
        }
  
        await user.save();
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },

      deleteEmployee: async (_, { id }) => {
        try {
     
          const deletedUser = await User.findByIdAndDelete(id);
          if (!deletedUser) {
            throw new Error('User not found');
          }
          return true;
        } catch (error) {
          throw new Error(error.message);
        }
      },

      
    }
};

module.exports = resolvers;
