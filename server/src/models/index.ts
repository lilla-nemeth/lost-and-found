import sequelize from '../config/sequelize.config';
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
	.catch(() => {
		console.log('Error syncing tables and models.');
	});

export default {
	User,
	Pet,
};
