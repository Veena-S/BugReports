import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';
import bugModel from './bug.mjs'
import featureModel from './feature.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const dbModels = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

// add your model definitions to db here
dbModels.Bug = bugModel(sequelize, Sequelize.DataTypes);
dbModels.Feature = featureModel(sequelize, Sequelize.DataTypes);

// Since, these calls will cause Sequelize to automatically add foreign keys to the Bug model,
// no foreign key column is specifically created in the Bugs table through migration.

// One bug is associated with a feature
dbModels.Bug.belongsTo(dbModels.Feature);
// One feature can have many bugs
// Bug holds the feature id as the foreign key
dbModels.Feature.hasMany(dbModels.Bug);


dbModels.sequelize = sequelize;
dbModels.Sequelize = Sequelize;

export default dbModels;
