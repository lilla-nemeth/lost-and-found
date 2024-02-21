import sequelize from '../config/sequelize.config';

afterAll(async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	await sequelize.close();
});
