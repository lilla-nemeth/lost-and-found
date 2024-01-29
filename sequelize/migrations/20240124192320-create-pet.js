'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('Pets', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		userId: {
			type: Sequelize.INTEGER,
			references: {
				model: {
					tableName: 'users',
					schema: 'schema',
				},
				key: 'id',
			},
			allowNull: false,
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
}
export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable('Pets');
}
