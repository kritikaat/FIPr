import prisma from "../DB/db.config.js";

const createSkit = async (req, res) => {
    const { participant1Name, participant1Gender, participant1Class, participant1Accommodation, participant2Name, participant2Gender, participant2Class, participant2Accommodation, participant3Name, participant3Gender, participant3Class, participant3Accommodation, participant4Name, participant4Gender, participant4Class, participant4Accommodation, participant5Name, participant5Gender, participant5Class, participant5Accommodation, participant6Name, participant6Gender, participant6Class, participant6Accommodation, additionalRequirements, declaration, videoLink, schoolId } = req.body;
    try {
        const skit = await prisma.skit.create({
            data: {
                participant1Name,
                participant1Gender,
                participant1Class,
                participant1Accommodation,
                participant2Name,
                participant2Gender,
                participant2Class,
                participant2Accommodation,
                participant3Name,
                participant3Gender,
                participant3Class,
                participant3Accommodation,
                participant4Name,
                participant4Gender,
                participant4Class,
                participant4Accommodation,
                participant5Name,
                participant5Gender,
                participant5Class,
                participant5Accommodation,
                participant6Name,
                participant6Gender,
                participant6Class,
                participant6Accommodation,
                additionalRequirements,
                declaration,
                videoLink,
                schoolId,
            },
        });
        res.json(skit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export default createSkit;