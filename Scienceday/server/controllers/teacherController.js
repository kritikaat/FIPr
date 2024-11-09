import prisma from "../DB/db.config.js";

const createAccompanyingTeacher = async (req, res) => {
    const { name, gender, requiresAccommodation, schoolId } = req.body;
  
    try {
      const teacher = await prisma.accompanyingTeacher.create({
        data: {
          name,
          gender,
          requiresAccommodation,
          school: { connect: { id: schoolId } },
        },
      });
      res.status(201).json(teacher);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create accompanying teacher' });
    }
  };
export default createAccompanyingTeacher;