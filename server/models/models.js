const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firstname: {type : DataTypes.STRING, allowNull: false},
    lastname: {type : DataTypes.STRING, allowNull: false},
    email: {type : DataTypes.STRING, unique: true, allowNull: false},
    password: {type : DataTypes.STRING, allowNull: false},
    phone_number: {type : DataTypes.STRING},
    adress: {type : DataTypes.STRING},
    roles: {type : DataTypes.STRING, defaultValue: "USER"},
})

const Refresh_token = sequelize.define('refresh_token', {
    id_user: {type : DataTypes.INTEGER, primaryKey: true, references: {model: User, key: 'id'}},
    refresh_token: {type : DataTypes.STRING, allowNull: false},
})

const Orders = sequelize.define('orders', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type : DataTypes.STRING, allowNull: false},
})

const Categories = sequelize.define('categories', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type : DataTypes.STRING, allowNull: false},
    image: {type : DataTypes.STRING, allowNull: false},
})

const Products = sequelize.define('products', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type : DataTypes.STRING, allowNull: false},
    description: {type : DataTypes.STRING, allowNull: false},
    size: {type : DataTypes.INTEGER, allowNull: false},
    price: {type : DataTypes.DECIMAL, allowNull: false},
    image: {type : DataTypes.STRING, allowNull: false},
})

const Cart = sequelize.define('cart', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type : DataTypes.STRING, allowNull: false},
})

const ProductsInfo = sequelize.define('productsinfo', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type : DataTypes.STRING, allowNull: false},
    description: {type : DataTypes.STRING, allowNull: false},
    size: {type : DataTypes.INTEGER, allowNull: false},
    price: {type : DataTypes.DECIMAL, allowNull: false},
    image: {type : DataTypes.STRING, allowNull: false},
})

const Order_Items = sequelize.define('order_items', {
    id: {type : DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type : DataTypes.STRING, allowNull: false},
    description: {type : DataTypes.STRING, allowNull: false},
    size: {type : DataTypes.INTEGER, allowNull: false},
    price: {type : DataTypes.DECIMAL, allowNull: false},
    image: {type : DataTypes.STRING, allowNull: false},
})