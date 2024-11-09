import "dotenv/config";
import express from 'express'; // Removed the unnecessary import for Route
import routes from './routes/index.js'; // Import your routes from the index file
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON bodies
app.use(express.json()); // Add this line to parse incoming JSON requests
app.use(cors({ origin: '*' }));
// Use the imported routes

async function initializeAdmin() {
    try {
        const adminExists = await prisma.admin.findUnique({
            where: { email: 'admin@example.com' }
        });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('Admin@123', 10);
            await prisma.admin.create({
                data: {
                    email: 'admin@example.com',
                    password: hashedPassword,
                    name: 'Admin User'
                }
            });
            console.log('Admin user created successfully');
        }
    } catch (error) {
        console.error('Error initializing admin:', error);
    }
}

app.post('/api/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        
        // Trim whitespace from credentials
        email = email?.trim();
        password = password?.trim();

        console.log('Login attempt for email:', email); // Debug log

        if (!email || !password) {
            return res.status(400).json({ 
                error: "Email and password are required" 
            });
        }

        // Find admin by email
        const admin = await prisma.admin.findUnique({
            where: { email: email.toLowerCase() } // Convert to lowercase for case-insensitive comparison
        });

        if (!admin) {
            console.log('Admin not found for email:', email);
            return res.status(401).json({ 
                error: "Invalid credentials" 
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, admin.password);
        
        if (!isValidPassword) {
            return res.status(401).json({ 
                error: "Invalid credentials" 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: admin.id,
                email: admin.email,
                role: 'admin'
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send success response
        res.json({
            message: "Login successful",
            token,
            user: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: 'admin'
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            error: "Internal server error" 
        });
    }
});
// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: "Access denied. Token required." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verify admin still exists in database
        const admin = await prisma.admin.findUnique({
            where: { id: decoded.userId }
        });

        if (!admin) {
            return res.status(403).json({ error: "Invalid token" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};

// Protected route example
app.get('/api/admin/dashboard', authenticateToken, async (req, res) => {
    try {
        const admin = await prisma.admin.findUnique({
            where: { id: req.user.userId },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true
            }
        });

        res.json({ 
            message: "Welcome to admin dashboard",
            user: admin
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Change admin password endpoint
app.post('/api/admin/change-password', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        const admin = await prisma.admin.findUnique({
            where: { id: req.user.userId }
        });

        const isValidPassword = await bcrypt.compare(currentPassword, admin.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Current password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.admin.update({
            where: { id: req.user.userId },
            data: { password: hashedPassword }
        });

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.use('/', routes); // Use the routes defined in routes/index.js

app.get('/', (req, res) => {
    res.send('Hello World!'); // This is optional since you already have routes
});



// Add this after your server starts
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    // Check if admin exists
    const adminExists = await prisma.admin.findUnique({
        where: { email: 'admin@example.com' }
    });
    
    if (!adminExists) {
        console.log('Admin user not found, initializing...');
        await initializeAdmin();
    } else {
        console.log('Admin user exists');
    }
});

// Graceful shutdown
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});