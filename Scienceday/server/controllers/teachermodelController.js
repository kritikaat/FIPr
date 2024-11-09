import prisma from "../DB/db.config.js";
const createTeacherModel = async (req, res) => {
    const { teacherName, teacherGender, accommodationRequired, additionalRequirements, declaration, writeup, schoolId } = req.body;
    try {
        const teacherModel = await prisma.teacherModel.create({
            data: {
                teacherName,
                teacherGender,
                accommodationRequired,
                additionalRequirements,
                declaration,
                writeup,
                schoolId,
            },
        });
        res.json(teacherModel);
    } catch (error) {
        console.error("Detailed error:", error);
        res.status(500).json({ error: 'Failed to create accompanying teacher', details: error.message });
    }
}
export default createTeacherModel;