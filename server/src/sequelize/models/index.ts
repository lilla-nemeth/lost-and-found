import sequelize from '../config/config';
import User from './user';
import Pet from './pet';

User.hasMany(Pet, {
	foreignKey: {
		name: 'userId',
		allowNull: false,
	},
});

Pet.belongsTo(User);

sequelize
	.sync({ alter: true })
	.then(() => console.log('Tables have been created successfully'))
	.catch((err) => {
		console.log('Error syncing the table and model.');
	});

export default {
	User,
	Pet,
};