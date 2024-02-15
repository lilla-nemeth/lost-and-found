import sequelize from '../config/sequelize.config';

afterAll(async () => {
	await sequelize.close();
});
