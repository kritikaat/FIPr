import prisma from "../DB/db.config.js";

const createStudentModel1 = async (req, res) => {
    const { participant1Name, participant1Gender, participant1Class, participant1Accommodation, participant2Name, participant2Gender, participant2Class, participant2Accommodation, additionalRequirements, declaration, writeup, schoolId } = req.body;
    try {
        const studentModel1 = await prisma.studentModel1.create({
            data: {
                participant1Name,
                participant1Gender,
                participant1Class,
                participant1Accommodation,
                participant2Name,
                participant2Gender,
                participant2Class,
                participant2Accommodation,
                additionalRequirements,
                declaration,
                writeup,
                schoolId,
            },
        });
        res.json(studentModel1);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export default createStudentModel1;