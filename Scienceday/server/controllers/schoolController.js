import prisma from "../DB/db.config.js";

const createSchool = async (req, res) => {
    const {
      coordinatorTeacherName,
      coordinatorTeacherMobile,
      name,
      address,
      city,
      pincode,
      affiliationNumber,
    } = req.body;
  
    try {
      const school = await prisma.school.create({
        data: {
          coordinatorTeacherName,
          coordinatorTeacherMobile,
          name,
          address,
          city,
          pincode,
          affiliationNumber,
        },
      });
      res.status(201).json(school);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create school' });
    }
  };
  
  export default createSchool;