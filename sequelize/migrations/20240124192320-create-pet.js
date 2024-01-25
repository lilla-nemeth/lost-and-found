'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Pets', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
			},
			img: {
				type: Sequelize.STRING,
			},
			petstatus: {
				type: Sequelize.STRING,
			},
			longitude: {
				type: Sequelize.STRING,
			},
			latitude: {
				type: Sequelize.STRING,
			},
			petlocation: {
				type: Sequelize.STRING,
			},
			species: {
				type: Sequelize.STRING,
			},
			petsize: {
				type: Sequelize.STRING,
			},
			breed: {
				type: Sequelize.STRING,
			},
			sex: {
				type: Sequelize.STRING,
			},
			color: {
				type: Sequelize.STRING,
			},
			age: {
				type: Sequelize.STRING,
			},
			uniquefeature: {
				type: Sequelize.STRING,
			},
			postdescription: {
				type: Sequelize.STRING,
			},
			since: {
				type: Sequelize.DATE,
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
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Pets');
	},
};
