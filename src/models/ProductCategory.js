// src/models/ProductCategory.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProductCategory = sequelize.define('ProductCategory', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
}, {
  tableName: 'product_categories',
  timestamps: false,
});

export default ProductCategory;
