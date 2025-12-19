# MongoDB Data Viewing Guide

## Quick Summary
Your MongoDB database **homedecor** contains:
- ✅ **10 Products** (seeded successfully)
- ✅ **1 User** (registered account)
- ✅ **1 Order** (placed order)

## How to View Data in MongoDB

### Method 1: Using MongoDB Shell (mongosh)

#### View All Products
```bash
mongosh homedecor --eval "db.products.find().pretty()"
```

#### View All Users
```bash
mongosh homedecor --eval "db.users.find().pretty()"
```

#### View All Orders
```bash
mongosh homedecor --eval "db.orders.find().pretty()"
```

#### Count Documents
```bash
mongosh homedecor --eval "db.products.countDocuments()"
mongosh homedecor --eval "db.users.countDocuments()"
mongosh homedecor --eval "db.orders.countDocuments()"
```

#### Interactive Shell
```bash
mongosh homedecor
```
Then run commands:
```javascript
db.products.find()           // View all products
db.users.find()              // View all users
db.orders.find()             // View all orders
db.getCollectionNames()      // List all collections
exit                         // Exit shell
```

---

### Method 2: Using MongoDB Compass (GUI Tool)

1. **Download MongoDB Compass** (if not installed)
   - Visit: https://www.mongodb.com/try/download/compass
   - Install the free GUI tool

2. **Connect to Database**
   - Open MongoDB Compass
   - Connection String: `mongodb://localhost:27017`
   - Click "Connect"

3. **View Data**
   - Select database: `homedecor`
   - Click on collections: `products`, `users`, `orders`
   - Browse data visually with filters and sorting

---

### Method 3: Using VS Code Extension

1. **Install MongoDB Extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "MongoDB for VS Code"
   - Install the official MongoDB extension

2. **Connect**
   - Click MongoDB icon in sidebar
   - Add connection: `mongodb://localhost:27017`
   - Expand `homedecor` database

3. **View Collections**
   - Right-click collection → "View Documents"
   - Browse and query data directly in VS Code

---

## Your Current Database Structure

### Database: `homedecor`

**Collections:**
1. **products** (10 documents)
   - Product catalog with name, price, image, category, stock
   
2. **users** (1 document)
   - Registered user with hashed password
   
3. **orders** (1 document)
   - Order placed with items and shipping info

---

## Common MongoDB Commands

### Find Specific Product
```javascript
db.products.findOne({ name: "Modern Table Lamp" })
```

### Find User by Email
```javascript
db.users.findOne({ email: "your@email.com" })
```

### Find All Orders for a User
```javascript
db.orders.find({ user: ObjectId("user_id_here") })
```

### Count Products by Category
```javascript
db.products.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } }
])
```

---

## Verify Your Data

Run this command to see a summary:
```bash
mongosh homedecor --eval "
  print('Products:', db.products.countDocuments());
  print('Users:', db.users.countDocuments());
  print('Orders:', db.orders.countDocuments());
  print('\nSample Product:');
  db.products.findOne();
"
```

---

## Troubleshooting

**Can't connect to MongoDB?**
- Make sure MongoDB service is running
- Check if mongod is running on port 27017
- Try: `mongosh` to test connection

**Data not showing?**
- Run seed script again: `npm run seed`
- Check server logs for errors
- Verify connection string in `.env`

**Need to reset database?**
```bash
mongosh homedecor --eval "db.dropDatabase()"
npm run seed
```
