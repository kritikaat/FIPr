import prisma from '../DB/db.config.js'


const createCompetition = async (req, res) => {
    const { schoolId, competitionName } = req.body;

    console.log('Received request to create competition:', { schoolId, competitionName });

    try {
        const competition = await prisma.competition.create({
            data: {
                title: competitionName,  // Changed from 'name' to 'title'
                school: { connect: { id: schoolId } },
            },
        });
        console.log('Competition created successfully:', competition);
        res.status(201).json(competition);
    } catch (error) {
        console.error('Error creating competition:', error);
        res.status(500).json({ message: 'Failed to create competition', error: error.message, stack: error.stack });
    }
};

export default createCompetition;