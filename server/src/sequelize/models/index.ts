import sequelize from '../config/config';
import User from './user';
import Pet from './pet';

User.hasMany(Pet, {
	foreignKey: {
		name: 'userId',
	},
	onDelete: 'CASCADE',
});

Pet.belongsTo(User);

sequelize
	.sync({ alter: true })
	.then(() => {
		console.log('Models and tables have been created successfully.');
	})
	.catch((err) => {
		console.log('Error syncing tables and models.');
	});

export default {
	User,
	Pet,
};
