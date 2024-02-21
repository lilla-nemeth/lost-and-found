import sequelize from '../config/sequelize.config';

it('closing Sequelize connection', () => {});

afterAll(async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	await sequelize.close();
});
