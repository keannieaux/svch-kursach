const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

// Схема роли
const RoleSchema = new Schema({
  name: { type: String, required: true }
});
const Role = model('Role', RoleSchema);

// Схема пользователя
const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  delivery_address: { type: String },
  phone_number: { type: String },
  role: { type: Types.ObjectId, ref: 'Role' }
});

// Хук для назначения роли по умолчанию
UserSchema.pre('save', async function (next) {
  if (!this.role) {
    const defaultRole = await Role.findOne({ name: 'customer' });
    if (defaultRole) {
      this.role = defaultRole._id;
    } else {
      throw new Error('Роль "customer" не найдена');
    }
  }
  next();
});

const User = model('User', UserSchema);

// Схема рефреш-токена
const RefreshTokenSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  refresh_token: { type: String, required: true }
});
const Refresh_Token = model('Refresh_Token', RefreshTokenSchema);

// Схема категории
const CategorySchema = new Schema({
  name: { type: String, required: true },
  image: { type: String }
});
const Category = model('Category', CategorySchema);

// Схема товара
const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  size: [{ type: Number }],
  category: { type: Types.ObjectId, ref: 'Category' }
});
const Product = model('Product', ProductSchema);

// Схема изображения товара
const ProductImageSchema = new Schema({
  url: { type: String, required: true },
  product: { type: Types.ObjectId, ref: 'Product' }
});
const ProductImage = model('ProductImage', ProductImageSchema);

// Схема корзины
const CartSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User' },
  product: { type: Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
  size: { type: Number }
});
const Cart = model('Cart', CartSchema);

// Схема избранного
const FavoriteSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User' },
  product: { type: Types.ObjectId, ref: 'Product' }
});
const Favorite = model('Favorite', FavoriteSchema);

// Схема заказа
const OrderSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User' },
  total_price: { type: Number, required: true },
  status: { type: String, default: 'Pending' }
});
const Order = model('Order', OrderSchema);

// Схема товара в заказе
const OrderItemSchema = new Schema({
  order: { type: Types.ObjectId, ref: 'Order' },
  product: { type: Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
  size: { type: Number },
  price: { type: Number, required: true }
});
const OrderItem = model('OrderItem', OrderItemSchema);

module.exports = {
  User,
  Refresh_Token,
  Role,
  Category,
  Product,
  ProductImage,
  Cart,
  Favorite,
  Order,
  OrderItem
};
