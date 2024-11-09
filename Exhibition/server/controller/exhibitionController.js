import prisma from "../DB/db.config.js";
import nodemailer from 'nodemailer'; // Ensure this path is correct

const sendEmail = async (to, formData) => {
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
      <h2 style="color: #4CAF50;">Your Exhibition has been submitted succesfully !</h2>
      
      <h3>Exhibition Hall Details:</h3>
      <ul>
        <li><strong>Hall Dimension:</strong> ${formData.hallDimension}</li>
        <li><strong>Is it an enclosed hall?:</strong> ${formData.isEnclosedHall}</li>
        <li><strong>Can the hall be darkened?:</strong> ${formData.canBeDarkened}</li>
        <li><strong>Cooling available?:</strong> ${formData.hasCooling}</li>
        <li><strong>Is it on the ground floor?:</strong> ${formData.isGroundFloor}</li>
        <li><strong>Storage Space:</strong> ${formData.hasStorageSpace}</li>
        <li><strong>No. of Power Outlets:</strong> ${formData.powerOutlets}</li>
        <li><strong>Number of Tables:</strong> ${formData.numTables}</li>
        <li><strong>VR Space:</strong> ${formData.vrSpace}</li>
        <li><strong>WiFi Access:</strong> ${formData.hasWifi}</li>
      </ul>

      <h3>Lecture/Quiz Hall Details:</h3>
      <ul>
        <li><strong>Lecture Hall Area:</strong> ${formData.lectureHallArea}</li>
        <li><strong>Seating Capacity:</strong> ${formData.seatingCapacity}</li>
        <li><strong>A/V Facilities:</strong> ${formData.hasAVFacilities}</li>
        <li><strong>Distance from Exhibition Hall:</strong> ${formData.distanceFromExhibition}</li>
      </ul>

      <h3>Logistics and Accommodation:</h3>
      <ul>
        <li><strong>Accommodation Provided:</strong> ${formData.accommodationProvided}</li>
        <li><strong>Local Transportation:</strong> ${formData.localTransportation}</li>
        <li><strong>Secure Parking Space:</strong> ${formData.secureParkingSpace}</li>
        <li><strong>Manpower for Loading/Unloading:</strong> ${formData.manpowerForLoading}</li>
      </ul>

      <h3>Contact Information:</h3>
      <ul>
        <li><strong>Contact Person Name:</strong> ${formData.contactPersonName}</li>
        <li><strong>Contact Person Mobile:</strong> ${formData.contactPersonMobile}</li>
        <li><strong>Contact Person Email:</strong> ${formData.contactPersonEmail}</li>
        <li><strong>Venue Location:</strong> ${formData.venueLocation}</li>
      </ul>

      <h3>Teacher Training Program:</h3>
      <ul>
        <li><strong>Teacher Invitations:</strong> ${formData.teacherInvitation}</li>
        <li><strong>Teacher Registrations:</strong> ${formData.teacherRegistration}</li>
        <li><strong>Writing Materials:</strong> ${formData.providesWritingMaterials}</li>
        <li><strong>Refreshments:</strong> ${formData.providesRefreshments}</li>
      </ul>

      <h3>Quiz Programme:</h3>
      <ul>
        <li><strong>Quiz for School Students:</strong> ${formData.quizForSchoolStudents}</li>
        <li><strong>Team Registration Process:</strong> ${formData.quizTeamSelection}</li>
        <li><strong>Quiz Arrangements:</strong> ${formData.quizArrangements}</li>
        <li><strong>Refreshments for Quiz Participants:</strong> ${formData.quizRefreshments}</li>
      </ul>
      
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


export const createExhibitiondata = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log incoming request data

        // Destructure the properties from req.body
        const {
            hallDimension,
            isEnclosedHall,
            canBeDarkened,
            hasCooling,
            isGroundFloor,
            hasStorageSpace,
            powerOutlets,
            numTables,
            vrSpace,
            hasWifi,
            lectureHallArea, // This should remain a string
            seatingCapacity,
            hasAVFacilities,
            distanceFromExhibition,
            accommodationProvided,
            localTransportation,
            secureParkingSpace,
            manpowerForLoading,
            contactPersonName,
            contactPersonMobile,
            contactPersonEmail,
            venueLocation,
            teacherInvitation,
            teacherRegistration,
            providesWritingMaterials,
            providesRefreshments,
            quizForSchoolStudents,
            quizTeamSelection,
            quizArrangements,
            quizRefreshments,
        } = req.body;

        // Convert relevant fields to integers if they need to be numeric
        const newExhibitionForm = await prisma.IPRExhibitionForm.create({
            data: {
                hallDimension,
                isEnclosedHall,
                canBeDarkened,
                hasCooling,
                isGroundFloor,
                hasStorageSpace,
                powerOutlets: parseInt(powerOutlets), // Convert to integer
                numTables: parseInt(numTables),       // Convert to integer
                vrSpace,
                hasWifi,
                lectureHallArea, // Ensure this is sent as a string
                seatingCapacity: parseInt(seatingCapacity), // Convert to integer if needed
                hasAVFacilities,
                distanceFromExhibition,
                accommodationProvided,
                localTransportation,
                secureParkingSpace,
                manpowerForLoading,
                contactPersonName,
                contactPersonMobile,
                contactPersonEmail,
                venueLocation,
                teacherInvitation: parseInt(teacherInvitation), // Convert to integer
                teacherRegistration: parseInt(teacherRegistration), // Convert to integer
                providesWritingMaterials,
                providesRefreshments,
                quizForSchoolStudents,
                quizTeamSelection,
                quizArrangements,
                quizRefreshments,
            },
        });

        await sendEmail(contactPersonEmail, req.body); // Send email
        console.log("Exhibition Form Created:", newExhibitionForm); // Log successful creation
        res.status(201).json(newExhibitionForm);
    } catch (error) {
        console.error("Error creating IPR Exhibition Form:", error); // Log error
        res.status(400).json({ error: 'Error creating IPR Exhibition Form: ' + error.message });
    }
};
