import prisma from "../DB/db.config.js";

const createPoster = async (req, res) => {
    const { participant1Name, participant1Gender, participant1Class, participant1Accommodation, participant1Declaration, participant2Name, participant2Gender, participant2Class, participant2Accommodation, participant2Declaration, schoolId } = req.body;
    try {
        const poster = await prisma.poster.create({
            data: {
                participant1Name,
                participant1Gender,
                participant1Class,
                participant1Accommodation,
                participant1Declaration,
                participant2Name,
                participant2Gender,
                participant2Class,
                participant2Accommodation,
                participant2Declaration,
                schoolId,
            },
        });
        res.json(poster);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export default createPoster;