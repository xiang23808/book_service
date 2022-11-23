import developmentConfig from './development';
import productionConfig from './production';
import * as dotenv from 'dotenv';

const configs = {
  development: developmentConfig,
  production: productionConfig,
};
dotenv.config();
const env = process.env.NODE_ENV || 'development';
export default () => configs[env];
