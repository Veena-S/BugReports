import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';
import bugModel from './bug.mjs'

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const dbModels = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

// add your model definitions to db here
dbModels.Bug = bugModel(sequelize, Sequelize.DataTypes);

dbModels.sequelize = sequelize;
dbModels.Sequelize = Sequelize;

export default dbModels;
