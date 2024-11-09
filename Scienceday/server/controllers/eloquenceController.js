import prisma from "../DB/db.config.js";

const createEloquence = async (req, res, language) => {
    const { participantName, participantGender, participantClass, accommodationRequired, declaration, schoolId } = req.body;
    try {
        const eloquenceEntry = await prisma[`eloquence${language}`].create({
            data: {
                participantName,
                participantGender,
                participantClass,
                accommodationRequired,
                declaration,
                schoolId: parseInt(schoolId),
            },
        });
        res.json(eloquenceEntry);
    } catch (error) {
        console.error(`Error in createEloquence${language}:`, error);
        res.status(500).json({ error: error.message });
    }
};

export const createEloquenceEnglish = (req, res) => createEloquence(req, res, 'English');
export const createEloquenceHindi = (req, res) => createEloquence(req, res, 'Hindi');
export const createEloquenceGujarati = (req, res) => createEloquence(req, res, 'Gujarati');

// If you need a default export as well, you can include this:
export default {
    createEloquenceEnglish,
    createEloquenceHindi,
    createEloquenceGujarati
};