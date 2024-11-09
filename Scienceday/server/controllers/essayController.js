import prisma from "../DB/db.config.js";

const createEssay = async (req, res, language) => {
    const { participantName, participantGender, participantClass, accommodationRequired, essayFileUrl, declaration, schoolId } = req.body;
    try {
        const essayEntry = await prisma[`essay${language}`].create({
            data: {
                participantName,
                participantGender,
                participantClass,
                accommodationRequired,
                essayFileUrl,
                declaration,
                schoolId: parseInt(schoolId),
            },
        });
        res.json(essayEntry);
    } catch (error) {
        console.error(`Error in createEssay${language}:`, error);
        res.status(500).json({ error: error.message });
    }
};

export const createEssayEnglish = (req, res) => createEssay(req, res, 'English');
export const createEssayHindi = (req, res) => createEssay(req, res, 'Hindi');
export const createEssayGujarati = (req, res) => createEssay(req, res, 'Gujarati');

export default {
    createEssayEnglish,
    createEssayHindi,
    createEssayGujarati
};