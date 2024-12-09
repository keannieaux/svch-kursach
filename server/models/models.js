const { DataTypes } = require('sequelize');
const sequelize = require('../db')

// Модель пользователя
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstname: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  delivery_address: { type: DataTypes.STRING },
  phone_number: { type: DataTypes.STRING },
});

const Refresh_token = sequelize.define('refresh_token', {
    id_user: {type : DataTypes.INTEGER, primaryKey: true, references: {model: User, key: 'id'}},
    refresh_token: {type : DataTypes.STRING, allowNull: false},
})
// Модель роли
const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

// Модель категории
const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING },
});

// Модель товара
const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  size: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
});

// Модель изображения товара
const ProductImage = sequelize.define('ProductImage', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
});

// Модель корзины
const Cart = sequelize.define('Cart', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  size: { type: DataTypes.INTEGER },
});

// Модель избранного
const Favorite = sequelize.define('Favorite', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// Модель заказа
const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  total_price: { type: DataTypes.DECIMAL, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Pending' }, 
});

// Модель товара в заказе
const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  size: { type: DataTypes.INTEGER },
  price: { type: DataTypes.DECIMAL, allowNull: false },
});

// Связи

// Пользователи и роли
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

// Категории и товары
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Товары и изображения
Product.hasMany(ProductImage, { foreignKey: 'productId' });
ProductImage.belongsTo(Product, { foreignKey: 'productId' });

// Корзина и пользователь
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Корзина и товары
Cart.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Cart, { foreignKey: 'productId' });

// Избранное и пользователь
User.hasMany(Favorite, { foreignKey: 'userId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

// Избранное и товары
Favorite.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Favorite, { foreignKey: 'productId' });

// Заказы и пользователь
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

// Заказы и товары
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Товары в заказе
OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

User.hasOne(Refresh_token, {foreignKey: 'id_user', sourceKey: 'id'});
Refresh_token.belongsTo(User, {foreignKey: 'id_user', targetKey: 'id'})

module.exports = {
    User,
    Refresh_token,
    Role,
    Category,
    Product,
    ProductImage,
    Cart,
    Favorite,
    Order,
    OrderItem
}