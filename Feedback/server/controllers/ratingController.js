import prisma from '../DB/db.config.js';

export const createRating = async (req, res) => {
    try {
        const {
            iprRating,
            fciptRating,
            knowledge,
            explanationsIPR,
            explanationsFCIPT,
            knowledgeBefore,
            knowledgeAfter,
            technicalContents,
            easeOfUnderstanding,
            feedbackFormId // Ensure this is included in the request body
        } = req.body;

        // Ensure feedbackFormId is present and valid
        if (!feedbackFormId) {
            return res.status(400).json({ message: 'feedbackFormId is required' });
        }

        // Creating the rating and connecting it to the feedback form
        const rating = await prisma.ratings.create({
            data: {
                iprRating,
                fciptRating,
                knowledge,
                explanationsIPR,
                explanationsFCIPT,
                knowledgeBefore,
                knowledgeAfter,
                technicalContents,
                easeOfUnderstanding,
                // Connect the rating to the feedback form by feedbackFormId
                feedbackForm: { connect: { id: feedbackFormId } }
            }
        });

        res.status(201).json(rating);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
