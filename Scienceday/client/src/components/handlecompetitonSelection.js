import { useState } from 'react';
const competitionEndpoints = {
    "Student's Model-1": '/api/student-model-1',
    "Student's Model-2": '/api/student-model-2',
    "Quiz": '/api/quiz',
    "Eloquence - English": '/api/eloquence/english',
    "Eloquence - Hindi": '/api/eloquence/hindi',
    "Eloquence - Gujarati": '/api/eloquence/gujarati',
    "Essay - English": '/api/essay/english',
    "Essay - Hindi": '/api/essay/hindi',
    "Essay - Gujarati": '/api/essay/gujarati',
    "Poster": '/api/poster',
    "Skit": '/api/skit',
    "Teacher Model": '/api/teacher-model',
};


const handleCompetitionSubmit = async (competition, competitionDetails, schoolId) => {
    const endpoint = competitionEndpoints[competition];
    if (!endpoint) {
        throw new Error(`Unknown competition: ${competition}`);
    }

    let body;
    switch (competition) {
        case "Student's Model-1":
        case "Student's Model-2":
            body = {
                schoolId: parseInt(schoolId, 10),
                participant1Name: competitionDetails.participant1Name,
                participant1Gender: competitionDetails.participant1Gender,
                participant1Class: competitionDetails.participant1Class,
                participant1Accommodation: competitionDetails.participant1Accommodation,
                participant2Name: competitionDetails.participant2Name,
                participant2Gender: competitionDetails.participant2Gender,
                participant2Class: competitionDetails.participant2Class,
                participant2Accommodation: competitionDetails.participant2Accommodation,
                additionalRequirements: competitionDetails.additionalRequirements,
                declaration: competitionDetails.declaration,
                writeup: competitionDetails.writeup
            };
            break;

        case "Quiz":
            body = {
                schoolId: parseInt(schoolId, 10),
                participant1Name: competitionDetails.participant1Name,
                participant1Gender: competitionDetails.participant1Gender,
                participant1Class: competitionDetails.participant1Class,
                participant2Name: competitionDetails.participant2Name,
                participant2Gender: competitionDetails.participant2Gender,
                participant2Class: competitionDetails.participant2Class,
                accommodationRequired: competitionDetails.accommodationRequired,
                declaration: competitionDetails.declaration
            };
            break;

        case "Eloquence - English":
        case "Eloquence - Hindi":
        case "Eloquence - Gujarati":
            body = {
                schoolId: parseInt(schoolId, 10),
                participantName: competitionDetails.participantName,
                participantGender: competitionDetails.participantGender,
                participantClass: competitionDetails.participantClass,
                accommodationRequired: competitionDetails.accommodationRequired,
                declaration: competitionDetails.declaration
            };
            break;

        case "Essay - English":
        case "Essay - Hindi":
        case "Essay - Gujarati":
            body = {
                schoolId: parseInt(schoolId, 10),
                participantName: competitionDetails.participantName,
                participantGender: competitionDetails.participantGender,
                participantClass: competitionDetails.participantClass,
                accommodationRequired: competitionDetails.accommodationRequired,
                essayFileUrl: competitionDetails.essayFileUrl,
                declaration: competitionDetails.declaration
            };
            break;

        case "Poster":
            body = {
                schoolId: parseInt(schoolId, 10),
                participant1Name: competitionDetails.participant1Name,
                participant1Gender: competitionDetails.participant1Gender,
                participant1Class: competitionDetails.participant1Class,
                participant1Accommodation: competitionDetails.participant1Accommodation,
                participant1Declaration: competitionDetails.participant1Declaration,
                participant2Name: competitionDetails.participant2Name,
                participant2Gender: competitionDetails.participant2Gender,
                participant2Class: competitionDetails.participant2Class,
                participant2Accommodation: competitionDetails.participant2Accommodation,
                participant2Declaration: competitionDetails.participant2Declaration
            };
            break;

        case "Skit":
            body = {
                schoolId: parseInt(schoolId, 10),
                participant1Name: competitionDetails.participant1Name,
                participant1Gender: competitionDetails.participant1Gender,
                participant1Class: competitionDetails.participant1Class,
                participant1Accommodation: competitionDetails.participant1Accommodation,
                participant2Name: competitionDetails.participant2Name,
                participant2Gender: competitionDetails.participant2Gender,
                participant2Class: competitionDetails.participant2Class,
                participant2Accommodation: competitionDetails.participant2Accommodation,
                participant3Name: competitionDetails.participant3Name,
                participant3Gender: competitionDetails.participant3Gender,
                participant3Class: competitionDetails.participant3Class,
                participant3Accommodation: competitionDetails.participant3Accommodation,
                participant4Name: competitionDetails.participant4Name,
                participant4Gender: competitionDetails.participant4Gender,
                participant4Class: competitionDetails.participant4Class,
                participant4Accommodation: competitionDetails.participant4Accommodation,
                participant5Name: competitionDetails.participant5Name,
                participant5Gender: competitionDetails.participant5Gender,
                participant5Class: competitionDetails.participant5Class,
                participant5Accommodation: competitionDetails.participant5Accommodation,
                participant6Name: competitionDetails.participant6Name,
                participant6Gender: competitionDetails.participant6Gender,
                participant6Class: competitionDetails.participant6Class,
                participant6Accommodation: competitionDetails.participant6Accommodation,
                additionalRequirements: competitionDetails.additionalRequirements,
                declaration: competitionDetails.declaration,
                videoLink: competitionDetails.videoLink
            };
            break;

        case "Teacher Model":
            body = {
                schoolId: parseInt(schoolId, 10),
                teacherName: competitionDetails.teacherName,
                teacherGender: competitionDetails.teacherGender,
                accommodationRequired: competitionDetails.accommodationRequired,
                additionalRequirements: competitionDetails.additionalRequirements,
                declaration: competitionDetails.declaration,
                writeup: competitionDetails.writeup
            };
            break;

        default:
            throw new Error(`Unsupported competition: ${competition}`);
    }

    try {
        const response = await fetch(`http://localhost:3000${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to submit ${competition} details: ${errorText}`);
        }

        const result = await response.json();
        console.log(`${competition} details submitted successfully:`, result);
        return result;
    } catch (error) {
        console.error(`Error submitting ${competition} details:`, error);
        throw error;
    }
};

export default handleCompetitionSubmit;