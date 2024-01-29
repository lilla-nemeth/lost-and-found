'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Users', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		username: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		pw: {
			type: Sequelize.STRING,
		},
		phone: {
			type: Sequelize.STRING,
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
	});
}
export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable('Users');
}
