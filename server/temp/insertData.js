const { User, Role, Category, Product, ProductImage, Cart, Favorite, Order, OrderItem } = require('../models/models');

// Вставка пользователей
const users = [
  { firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com', password: 'password123', delivery_address: '123 Elm St', phone_number: '+1234567890' },
  { firstname: 'Jane', lastname: 'Smith', email: 'jane.smith@example.com', password: 'password456', delivery_address: '456 Oak St', phone_number: '+1234567891' },
  { firstname: 'Alice', lastname: 'Johnson', email: 'alice.johnson@example.com', password: 'password789', delivery_address: '789 Pine St', phone_number: '+1234567892' },
  { firstname: 'Bob', lastname: 'Brown', email: 'bob.brown@example.com', password: 'password321', delivery_address: '101 Maple St', phone_number: '+1234567893' },
  { firstname: 'Charlie', lastname: 'Davis', email: 'charlie.davis@example.com', password: 'password654', delivery_address: '202 Birch St', phone_number: '+1234567894' }
];

const roles = [
  { name: 'Admin' },
  { name: 'Customer' },
  { name: 'Manager' },
  { name: 'Sales' },
  { name: 'Support' }
];

const categories = [
  { name: 'Electronics', image: 'electronics.jpg' },
  { name: 'Clothing', image: 'clothing.jpg' },
  { name: 'Home & Kitchen', image: 'home_kitchen.jpg' },
  { name: 'Books', image: 'books.jpg' },
  { name: 'Toys', image: 'toys.jpg' }
];

const products = [
  { name: 'Laptop', description: '14 inch laptop with 8GB RAM', price: 799.99, stock: 100, size: [14] },
  { name: 'Smartphone', description: 'Latest smartphone with 128GB storage', price: 499.99, stock: 200, size: [5.5] },
  { name: 'Headphones', description: 'Wireless over-ear headphones', price: 99.99, stock: 150, size: [0] },
  { name: 'Coffee Maker', description: 'Automatic coffee maker with 12 cups capacity', price: 59.99, stock: 50, size: [0] },
  { name: 'T-Shirt', description: 'Cotton T-shirt in various sizes', price: 19.99, stock: 300, size: ['S', 'M', 'L'] }
];

// Вставка данных в базы
async function insertData() {
  await User.bulkCreate(users);
  await Role.bulkCreate(roles);
  await Category.bulkCreate(categories);
  await Product.bulkCreate(products);
  console.log('Data inserted successfully');
}

insertData().catch(err => console.log(err));
