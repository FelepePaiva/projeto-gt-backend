// src/models/ProductImage.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'product_images',
  timestamps: false,
});

export default ProductImage;
