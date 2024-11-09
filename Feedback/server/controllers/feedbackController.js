import prisma from '../DB/db.config.js'
import nodemailer from 'nodemailer';

// Function to send email
const sendEmail = async (to, feedback) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'krutika20023@gmail.com',
            pass: 'jdgijuvnwwnzgpuu'  // Your Google App Password
        }
    });

    // Styled HTML email content
    const emailContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #4CAF50;">Thank you for your feedback!</h2>
            <p>We appreciate you taking the time to share your feedback. Here are the details of your submission:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background-color: #f2f2f2;">
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Field</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Details</th>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Institution Name</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${feedback.institutionName}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 10px; border: 1px solid #ddd;">Website</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${feedback.website}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Visit Date</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${new Date(feedback.visitDate).toDateString()}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 10px; border: 1px solid #ddd;">Staff Name</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${feedback.staffName}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Staff Email</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${feedback.staffEmail}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 10px; border: 1px solid #ddd;">Staff Mobile</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${feedback.staffMobile}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Total Students</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${feedback.totalStudents}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 10px; border: 1px solid #ddd;">Accompanying Staff</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${feedback.accompanyingStaff}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Sources</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${feedback.sources.join(', ')}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 10px; border: 1px solid #ddd;">Campuses</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${feedback.campuses.join(', ')}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Best</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${feedback.best}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 10px; border: 1px solid #ddd;">Worst</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${feedback.worst}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;">Suggestions</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${feedback.suggestions}</td>
                </tr>
                <tr style="background-color: #f2f2f2;">
                    <td style="padding: 10px; border: 1px solid #ddd;">Comments</td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${feedback.comments}</td>
                </tr>
            </table>

            <p>Thanks again for your time!</p>
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

// Controller to handle feedback creation and sending email
export const createFeedback = async (req, res) => {
    try {
        const {
            institutionName,
            website,
            visitDate,
            staffName,
            staffEmail,
            staffMobile,
            totalStudents,
            accompanyingStaff,
            sources,
            campuses,
            ratings,
            best,
            worst,
            suggestions,
            comments
        } = req.body;

        // Store feedback in the database
        const feedback = await prisma.feedbackForm.create({
            data: {
                institutionName,
                website,
                visitDate,
                staffName,
                staffEmail,
                staffMobile,
                totalStudents,
                accompanyingStaff,
                sources,
                campuses,
                ratings,
                best,
                worst,
                suggestions,
                comments
            }
        });

        // Send email with all feedback details
        await sendEmail(staffEmail, feedback);

        res.status(201).json(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
