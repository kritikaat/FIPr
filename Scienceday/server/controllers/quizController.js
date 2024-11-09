import prisma from "../DB/db.config.js";

const createQuiz = async (req, res) => {
    const { participant1Name, participant1Gender, participant1Class, participant1Accommodation, participant2Name, participant2Gender, participant2Class, participant2Accommodation, declaration, schoolId } = req.body;
    try {
        const quiz = await prisma.quiz.create({
            data: {
                participant1Name,
                participant1Gender,
                participant1Class,
                participant1Accommodation,
                participant2Name,
                participant2Gender,
                participant2Class,
                participant2Accommodation,
                declaration,
                schoolId,
            },
        });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export default createQuiz;