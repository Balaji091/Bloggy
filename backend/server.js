const express = require('express');
const cors = require('cors');
const pool = require('./db/connection');
const cookieParser = require('cookie-parser');
const AuthRouter = require('./routes/auth.router');
const BlogRouter = require('./routes/blog.crud.router');
const HomeRouter = require('./routes/home.router');

require('dotenv').config();

const app = express();

// Middleware
// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002',"https://api.cloudinary.com/v1_1/dktio4phw/image/upload"],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser()); 

// Routes
app.use('/api/user/auth',AuthRouter);
app.use('/api/user/blog',BlogRouter);
app.use('/api/home',HomeRouter)

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
   
});