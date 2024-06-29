module.exports={
     async uniqueUsername(value, helpers) {
        try {
          const user = await User.findOne({ username: value });
          if (user) {
            return helpers.error('any.invalid');
          }
          return value;
        } catch (error) {
          throw new Error('Database error'); 
        }
      },
      async uniqueEmail(value, helpers) {
        try {
          const user = await User.findOne({ email: value });
          if (user) {
            return helpers.error('any.invalid');
          }
          return value;
        } catch (error) {
          throw new Error('Database error'); 
        }
      },
      async uniquePhonenumber(value, helpers) {
        try {
          const user = await User.findOne({ phonenumber: value });
          if (user) {
            return helpers.error('any.invalid');
          }
          return value;
        } catch (error) {
          throw new Error('Database error'); 
        }
      }
}