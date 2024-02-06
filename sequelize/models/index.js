import sequelize from '../config/config.js';
import User from './user.js';
import Pet from './pet.js';

User.hasMany(Pet, {
	foreignKey: {
		name: 'userId',
		allowNull: true,
		validate: {
			notNull: {
				msg: 'Foreignkey is required',
			},
		},
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
