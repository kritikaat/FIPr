// server.js
import express from 'express';
import bodyParser from 'body-parser';   
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import routes from './routes/index.js'; // Importing routes
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Use the routes defined in routes.js
app.use('/api', routes);

app.post('/api/register', async (req, res) => {
    try {
      const {
        schoolName,
        email,
        address,
        cityVillage,
        pincode,
        affiliationNumber,
        password
      } = req.body;

      if (!schoolName || !email || !address || !cityVillage || !pincode || !affiliationNumber|| !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Check if school already exists
      const existingSchool = await prisma.schoolRegistration.findUnique({
        where: { email }
      });
  
      if (existingSchool) {
        return res.status(400).json({ error: 'School already registered with this email' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new school
      const school = await prisma.schoolRegistration.create({
        data: {
          schoolName,
          email,
          address,
          cityVillage,
          pincode,
          affiliationNumber,
          password: hashedPassword
        }
      });
  
  
      // Generate JWT token
      const token = jwt.sign(
        { schoolId: school.id, email: school.email },
        process.env.JWT_SECRET || 'your-default-secret-key',
        { expiresIn: '24h' }
      );
  
      res.status(201).json({
        message: 'School registered successfully',
        token,
        school: {
          id: school.id,
          schoolName: school.schoolName,
          email: school.email
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ 
        error: 'Error registering school',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });
  // 5. Login endpoint
  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find school by email
      const school = await prisma.schoolRegistration.findUnique({
        where: { email }
      });
  
      if (!school) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Verify password
      const validPassword = await bcrypt.compare(password, school.password);
  
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { schoolId: school.id, email: school.email },
        process.env.JWT_SECRET || 'your-default-secret-key',
        { expiresIn: '24h' }
      );
  
      res.json({
        message: 'Login successful',
        token,
        school: {
          id: school.id,
          schoolName: school.schoolName,
          email: school.email
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Error during login' });
    }
  });
  
  // 6. Authentication middleware
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.school = verified;
      next();
    } catch (error) {
      res.status(403).json({ error: 'Invalid token' });
    }
  };
  

// Global error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const startServer = async () => {
    try {
        await prisma.$connect(); // Connect to the database
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

startServer();
