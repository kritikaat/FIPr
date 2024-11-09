const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const { z } = require('zod');

const prisma = new PrismaClient();

const sendEmail = async (to, visitorDetail) => {
  const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
          user: 'krutika20023@gmail.com',
          pass: 'jdgijuvnwwnzgpuu'  // Your Google App Password
      }
  });

  const emailContent = `
    <div style="font-family: Arial, sans-serif; margin: 20px; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
<<<<<<< HEAD
      <h1 style="color: #333;">Your IPR visit form has been submitted succesfully!</h1>
=======
      <h1 style="color: #333;">Thank you for your submission!</h1>
>>>>>>> c4a42063d25703a82027a0e39ade332904b2f526
      <p style="color: #555;">Here are the details you provided:</p>
      <ul style="list-style-type: none; padding: 0;">
        <li style="margin: 10px 0;">
          <strong>Institution Name:</strong> <span style="color: #007BFF;">${visitorDetail.institutionName}</span>
        </li>
        <li style="margin: 10px 0;">
          <strong>Student Branch:</strong> <span style="color: #007BFF;">${visitorDetail.studentBranch}</span>
        </li>
        <li style="margin: 10px 0;">
          <strong>Semester:</strong> <span style="color: #007BFF;">${visitorDetail.studentSem}</span>
        </li>
        <li style="margin: 10px 0;">
          <strong>Number of Students:</strong> <span style="color: #007BFF;">${visitorDetail.numStudents}</span>
        </li>
        <li style="margin: 10px 0;">
          <strong>Number of Faculty:</strong> <span style="color: #007BFF;">${visitorDetail.numFaculty}</span>
        </li>
        <li style="margin: 10px 0;">
          <strong>Name:</strong> <span style="color: #007BFF;">${visitorDetail.name}</span>
        </li>
        <li style="margin: 10px 0;">
          <strong>Position:</strong> <span style="color: #007BFF;">${visitorDetail.position}</span>
        </li>
        <li style="margin: 10px 0;">
          <strong>Email:</strong> <span style="color: #007BFF;">${visitorDetail.email}</span>
        </li>
        <li style="margin: 10px 0;">
          <strong>Mobile:</strong> <span style="color: #007BFF;">${visitorDetail.mobile}</span>
        </li>
        <li style="margin: 10px 0;">
          <strong>Campuses:</strong> <span style="color: #007BFF;">${visitorDetail.campus.join(', ')}</span>
        </li>
        <li style="margin: 10px 0;">
          <strong>Visit Date:</strong> <span style="color: #007BFF;">${new Date(visitorDetail.visit_date).toLocaleDateString()}</span>
        </li>
        <li style="margin: 10px 0;">
          <strong>Visit Time:</strong> <span style="color: #007BFF;">${visitorDetail.visit_time}</span>
        </li>
        <li style="margin: 10px 0;">
          <strong>Materials:</strong> <span style="color: #007BFF;">${visitorDetail.materials.join(', ')}</span>
        </li>
      </ul>
<<<<<<< HEAD
=======
      <p style="color: #555;">Thanks again for your time!</p>
>>>>>>> c4a42063d25703a82027a0e39ade332904b2f526
    </div>
  `;

  try {
      await transporter.sendMail({
          from: 'krutika20023@gmail.com',  // Ensure this is correct
          to: to,  // Email recipient
          subject: 'Feedback Submission Confirmation',
          html: emailContent  // Use HTML content instead of plain text
      });
      console.log('Email sent successfully!');
  } catch (error) {
      console.error('Error sending email:', error);
  }
};


const visitorSchema = z.object({
  institutionName: z.string().min(1, "Institution name is required"),
  studentBranch: z.string().min(1, "Student branch is required"),
  studentSem: z.number().int().positive("Semester must be a positive integer"),
  numStudents: z.number().int().positive("Number of students must be a positive integer"),
  numFaculty: z.number().int().positive("Number of faculty must be a positive integer"),
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  campus: z.array(z.string()).min(1, "At least one campus must be selected"),
  ipr_time: z.string().optional(),
  fcipt_time: z.string().optional(),
  visit_date: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  visit_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  materials: z.array(z.string())
});

exports.submitVisitorForm = async (req, res) => {
  try {
    const validatedData = visitorSchema.parse(req.body);

    const visitor = await prisma.visitor.create({
      data: {
        ...validatedData,
        studentSem: parseInt(validatedData.studentSem),
        numStudents: parseInt(validatedData.numStudents),
        numFaculty: parseInt(validatedData.numFaculty),
        visit_date: new Date(validatedData.visit_date)
      }
    });

    await sendEmail(validatedData.email, visitor);

    res.status(201).json({ message: "Visitor form submitted successfully", visitor });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error("Error submitting visitor form:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
};



exports.getVisitorData = async (req,res) => {
  
};