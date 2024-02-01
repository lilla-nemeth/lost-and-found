import sequelize from '../config/config.js';
import User from './user.js';

// sequelize
// 	.sync({ alter: true })
// 	.then(() => console.log('Tables have been created successfully'))
// 	.catch(() => console.log('Error syncing the table and model.'));

User.sync({ alter: true })
	.then(() => console.log('User table has been created successfully'))
	.catch(() => console.log('Error syncing the table and model.'));

export default User;
