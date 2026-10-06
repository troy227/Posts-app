'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likes', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      post_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'posts',
          key: 'id',
        },
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('likes', ['post_id'], {
      name: 'likes_post_id_idx',
    });

    await queryInterface.addIndex('likes', ['post_id', 'user_id'], {
      unique: true,
      name: 'likes_post_id_user_id_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('likes');
  },
};
