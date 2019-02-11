'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Oil_Consumptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Country: {
        type: Sequelize.STRING
      },
      oneNineSixFive: {
        type: Sequelize.STRING
      },
      oneNineSixSix: {
        type: Sequelize.STRING
      },
      oneNineSixSeven: {
        type: Sequelize.STRING
      },
      oneNineSixEight: {
        type: Sequelize.STRING
      },
      oneNineSixNine: {
        type: Sequelize.STRING
      },
      oneNineSevenZero: {
        type: Sequelize.STRING
      },
      oneNineSevenOne: {
        type: Sequelize.STRING
      },
      oneNineSevenTwo: {
        type: Sequelize.STRING
      },
      oneNineSevenThree: {
        type: Sequelize.STRING
      },
      oneNineSevenFour: {
        type: Sequelize.STRING
      },
      oneNineSevenFive: {
        type: Sequelize.STRING
      },
      oneNineSevenSix: {
        type: Sequelize.STRING
      },
      oneNineSevenSeven: {
        type: Sequelize.STRING
      },
      oneNineSevenEight: {
        type: Sequelize.STRING
      },
      oneNineSevenNine: {
        type: Sequelize.STRING
      },
      oneNineEightZero: {
        type: Sequelize.STRING
      },
      oneNineEightOne: {
        type: Sequelize.STRING
      },
      oneNineEightTwo: {
        type: Sequelize.STRING
      },
      oneNineEightThree: {
        type: Sequelize.STRING
      },
      oneNineEightFour: {
        type: Sequelize.STRING
      },
      oneNineEightFive: {
        type: Sequelize.STRING
      },
      oneNineEightSix: {
        type: Sequelize.STRING
      },
      oneNineEightSeven: {
        type: Sequelize.STRING
      },
      oneNineEightEight: {
        type: Sequelize.STRING
      },
      oneNineEightNine: {
        type: Sequelize.STRING
      },
      oneNineNineZero: {
        type: Sequelize.STRING
      },
      oneNineNineOne: {
        type: Sequelize.STRING
      },
      oneNineNineTwo: {
        type: Sequelize.STRING
      },
      oneNineNineFour: {
        type: Sequelize.STRING
      },
      oneNineNineThree: {
        type: Sequelize.STRING
      },
      oneNineNineFive: {
        type: Sequelize.STRING
      },
      oneNineNineSix: {
        type: Sequelize.STRING
      },
      oneNineNineSeven: {
        type: Sequelize.STRING
      },
      oneNineNineEight: {
        type: Sequelize.STRING
      },
      oneNineNineNine: {
        type: Sequelize.STRING
      },
      twoZeroZeroZero: {
        type: Sequelize.STRING
      },
      twoZeroZeroOne: {
        type: Sequelize.STRING
      },
      twoZeroZeroTwo: {
        type: Sequelize.STRING
      },
      twoZeroZeroThree: {
        type: Sequelize.STRING
      },
      twoZeroZeroFour: {
        type: Sequelize.STRING
      },
      twoZeroZeroFive: {
        type: Sequelize.STRING
      },
      twoZeroZeroSix: {
        type: Sequelize.STRING
      },
      twoZeroZeroSeven: {
        type: Sequelize.STRING
      },
      twoZeroZeroEight: {
        type: Sequelize.STRING
      },
      twoZeroZeroNine: {
        type: Sequelize.STRING
      },
      twoZeroOneZero: {
        type: Sequelize.STRING
      },
      twoZeroOneOne: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Oil_Consumptions');
  }
};