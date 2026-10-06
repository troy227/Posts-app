'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_followings', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      following_user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    await queryInterface.addIndex('user_followings', ['user_id'], {
      name: 'user_followings_user_id_idx',
    });

    await queryInterface.addIndex(
      'user_followings',
      ['user_id', 'following_user_id'],
      {
        unique: true,
        name: 'user_followings_user_id_following_user_id_unique',
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_followings');
  },
};
