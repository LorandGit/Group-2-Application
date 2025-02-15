require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Basic Route
app.get('/', (req, res) => {
  res.send("TLAN Backend is running!");
});

// Import authentication middleware
const auth = require('./middleware/auth');

// Import route files
const userRoutes = require('./routes/users');
const trainingModuleRoutes = require('./routes/trainingModules');
const progressRoutes = require('./routes/progress');
const notificationRoutes = require('./routes/notifications');
const messageRoutes = require('./routes/messages');
const dynamicRoutes = require('./routes/dynamicRoutes'); // Auto-adaptive API

// Register API routes
app.use('/users', userRoutes);
app.use('/api', dynamicRoutes); // Dynamic route for auto-generated APIs

// 🔹 Apply authentication middleware to secure routes
app.use('/trainingModules', auth, trainingModuleRoutes);
app.use('/progress', auth, progressRoutes);
app.use('/notifications', auth, notificationRoutes);
app.use('/messages', auth, messageRoutes);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
