import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompetitionFields from './CompetitionFields';
import handleCompetitionSubmit from './handlecompetitonSelection.js';
// Define the steps with fields
const steps = [
    {
        title: "School Details",
        fields: [
            { label: "Name of the School Coordinator Teacher:", required: true, type: "text", helperText: "Any communication related to NSD2024 shall be done by this teacher only and no participant should communicate directly with NSD2024 or IPR." },
            { label: "Mobile Number of the School Coordinator Teacher:", required: true, type: "text" },
            { label: "Name of the School:", required: true, type: "text" },
            { label: "Address of the School :", required: true, type: "text" },
            { label: "City/village of the School :", required: true, type: "text" },
            { label: "Pincode:", required: true, type: "text" },
            { label: "Affiliation Number of the School :", required: true, type: "text", helperText: "Enter Gujarat Board/CBSE/ICSC/other board registration number" },
        ]
    },
    {
        title: "Student Accompanying Teacher Details",
        fields: [
            { label: "Name of the Accompanying Teacher :", required: true, type: "text", helperText: "Accompanying Teacher will be given only duty-certificate. No participation certificates will be given to accompanying teacher." },
            {
                label: "Gender of the Accompanying Teacher :", required: true, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Do the Accompanying Teacher require Accommodation facility?", required: true, type: "select", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "No", label: "No" },
                    { value: "Yes", label: "Yes" }
                ]
            },
        ]
    },
    {
        title: "Competitions Details:",
        fields: [
            {
                label: "Select a competition and fill the details.", required: true, type: "select", helperText: "Come back to this section to fill details of other competitions. Once the details of all competitions are filled, choose Submit option.", options: [
                    { value: "", label: "Select Competition" }, // Placeholder option
                    { value: "Student's Model-1", label: "Student's Model-1" },
                    { value: "Student's Model-2", label: "Student's Model-2" },
                    { value: "Quiz", label: "Quiz" },
                    { value: "Eloquence - English", label: "Eloquence - English" },
                    { value: "Eloquence - Hindi", label: "Eloquence - Hindi" },
                    { value: "Eloquence - Gujarati", label: "Eloquence - Gujarati" },
                    { value: "Essay - English", label: "Essay - English" },
                    { value: "Essay - Hindi", label: "Essay - Hindi" },
                    { value: "Essay - Gujarati", label: "Essay - Gujarati" },
                    { value: "Poster", label: "Poster" },
                    { value: "Skit", label: "Skit" },
                    { value: "Teacher Model", label: "Teacher Model" }
                ]
            }
        ]
    }
];
// Define the fields and notes for each competition
const competitionFieldsConfig = {
    "Student's Model-1": {
        fields: [
            { label: "Name of the Participant 1 for  Student's Model-1:", required: true, type: "text" },
            {
                label: "Gender of  Participant 1 for Student's Model-1:", required: true, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Student Class of  Participant 1 for Student's Model-1", required: true, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Will Participant 1 for  Student's Model-1  require Accommodation facility?", required: true, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Name of the Participant 2 for  Student's Model-1:", required: true, type: "text" },
            {
                label: "Gender of  Participant 2 for Student's Model-1:", required: true, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Student Class of  Participant 2 for Student's Model-1", required: true, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Will Participant 1 for  Student's Model-1  require Accommodation facility?", required: true, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Additional Requirements for Student's Model-1 presentation (like power, water etc.,):", required: false, type: "text", helperText: "Provided, if selected for Final Round at IPR" },
            { label: "Declaration:", required: true, type: "checkbox", checkboxText: "This student's model-1 is prepared by us/me and not by others. This work is based on the concepts of basic science and is not a readily available science project. Technology is used only to explain the concepts of basic science principle of the project." },
            { label: "Please upload a 1-page writeup (including photos/pictures) in PDF format ONLY about your science model-1.(max 1 MB):", required: true, type: "file", fileType: "pdf" }
        ],
        note1: "These students can participate in other competitions also.",
        note3: "Kindly refer for more details and the schedule of the event-competitions attached with the invitation letter or on our website",
        note4: "www.ipr.res.in/NSD2024"
    },
    "Student's Model-2": {
        fields: [
            { label: "Name of the Participant 1 for  Student's Model-2:", required: true, type: "text" },
            {
                label: "Gender of  Participant 1 for Student's Model-2:", required: true, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Student Class of  Participant 1 for Student's Model-2", required: true, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Will Participant 1 for  Student's Model-2  require Accommodation facility?", required: true, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Name of the Participant 2 for  Student's Model-2:", required: true, type: "text" },
            {
                label: "Gender of  Participant 2 for Student's Model-1:", required: true, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Student Class of  Participant 2 for Student's Model-2", required: true, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Will Participant 1 for  Student's Model-2  require Accommodation facility?", required: true, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Additional Requirements for Student's Model-2 presentation (like power, water etc.,):", required: false, type: "text", helperText: "Provided, if selected for Final Round at IPR" },
            { label: "Declaration:", required: true, type: "checkbox", checkboxText: "This student's model-2 is prepared by us/me and not by others. This work is based on the concepts of basic science and is not a readily available science project. Technology is used only to explain the concepts of basic science principle of the project." },
            { label: "Please upload a 1-page writeup (including photos/pictures) in PDF format ONLY about your science model-2.(max 1 MB):", required: true, type: "file", fileType: "pdf" }
        ],
        note1: "These students can participate in other competitions also.",
        note3: "Kindly refer for more details and the schedule of the event-competitions attached with the invitation letter or on our website",
        note4: "www.ipr.res.in/NSD2024"
    },
    "Quiz": {
        fields: [
            { label: "Name of the Quiz Participant 1:", required: true, type: "text" },
            {
                label: "Gender of Participant 1for Quiz:", required: true, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Student Class of Participant 1 for Quiz:", required: true, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." }
                ]
            },
            {
                label: "Will Participant 1 for Quiz require Accommodation facility?", required: true, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Name of the Participant-2 for Quiz:", required: false, type: "text", helperText: "Optional: One student can also present in this quiz competition. This participant -2 should be from other class/standard then of participant-1's class/standard." },
            {
                label: "Gender of Participant-2 for Quiz:", required: false, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Student Class of Participant-2 for Quiz:", required: false, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." }
                ]
            },
            {
                label: "Will Participant-2 for Quiz require Accommodation facility?", required: false, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Declaration:", required: true, type: "checkbox", checkboxText: "We will present Quiz ourselves and will not take help of others. We shall make ourselves ready with required items like mike, camera, internet connection 15 minutes prior to online preliminary selection round." }
        ],
        note1: "These students can participate in other competitions also.",
        note3: "Kindly refer for more details and the schedule of the event-competitions attached with the invitation letter or on our website",
        note4: "www.ipr.res.in/NSD2024"
    },
    "Eloquence - English": {
        fields: [
            { label: "Name of the Participant for Eloquence-English:", required: true, type: "text" },
            {
                label: "Gender of the Participant for Eloquence-English:", required: true, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Class of the Participant for Eloquence-English:", required: true, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Will the participant for Eloquence-English competition require Accommodation facility?", required: true, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Declaration:", required: true, type: "checkbox", checkboxText: "I will present my speech in Eloquence-English competition in my own voice. I will make myself ready with required items like mike, camera, internet connection 15 minutes prior to online preliminary selection round." }
        ],
        note1: "Only one student  can participate in this Eloquence-English.",
        note2: "This student will not participate in Eloquence-Hindi and Eloquence-Gujarati competitions.However, this student can participate in other competitions.",
        note3: "Kindly refer for more details and the schedule of the event-competitions attached with the invitation letter or on our website",
        note4: "www.ipr.res.in/NSD2024"
    },
    "Eloquence - Hindi": {
        fields: [
            { label: "Name of the Participant for Eloquence-Hindi:", required: true, type: "text" },
            {
                label: "Gender of the Participant for Eloquence-Hindi:", required: true, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Class of the Participant for Eloquence-Hindi:", required: true, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Will the participant for Eloquence-Hindi competition require Accommodation facility?", required: true, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Declaration:", required: true, type: "checkbox", checkboxText: "I shall present Eloquence-Hindi in my own voice. I shall make myself ready with required items like mike, camera, internet connection 15 minutes prior to online preliminary selection round." }
        ],
        note1: "Only one student  can participate in this Eloquence-Hindi.",
        note2: "This student will not participate in Eloquence-English and Eloquence-Gujarati competitions.However, this student can participate in other competitions.",
        note3: "Kindly refer for more details and the schedule of the event-competitions attached with the invitation letter or on our website",
        note4: "www.ipr.res.in/NSD2024"
    },
    "Eloquence - Gujarati": {
        fields: [
            { label: "Name of the Participant for Eloquence-Gujarati:", required: true, type: "text" },
            {
                label: "Gender of the Participant for Eloquence-Gujarati:", required: true, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Class of the Participant for Eloquence-Gujarati:", required: true, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Will the participant for Eloquence-Gujarati competition require Accommodation facility?", required: true, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Declaration:", required: true, type: "checkbox", checkboxText: "I shall present Eloquence-Gujarati in my own voice. I shall make myself ready with required items like mike, camera, internet connection 15 minutes prior to online preliminary selection round." }
        ],
        note1: "Only one student  can participate in this Eloquence-Gujarati.",
        note2: "This student will not participate in Eloquence-English and Eloquence-Hindi competitions. However, this student can participate in other competitions.",
        note3: "Kindly refer for more details and the schedule of the event-competitions attached with the invitation letter or on our website",
        note4: "www.ipr.res.in/NSD2024"
    },
    "Essay - English": {
        fields: [
            { label: "Name of the Participant for  Essay-English :", required: true, type: "text" },
            {
                label: "Gender of the Participant for  Essay-English:", required: true, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Class of the Participant for  Essay-English:", required: true, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Will the participant for  Essay English competition require Accommodation facility?", required: true, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Please upload your hand written Essay-Hindi in PDF format only. (max 1 MB)", required: true, type: "file", fileType: "pdf" },
            { label: "Declaration:", required: true, type: "checkbox", checkboxText: "This essay is hand written by me only. Essay contents are  not copied from any book/magazine/internet etc." }
        ],
        note1: "Only one student  can participate in this Essay-English.",
        note2: "This student will not participate in Essay-Hindi and Essay-Gujarati competitions. However, this student can participate in other competitions. ",
        note3: "Kindly refer for more details and the schedule of the event-competitions attached with the invitation letter or on our website",
        note4: "www.ipr.res.in/NSD2024"
    },
    "Essay - Hindi": {
        fields: [
            { label: "Name of the Participant for  Essay-Hindi :", required: true, type: "text" },
            {
                label: "Gender of the Participant for  Essay-Hindi:", required: true, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Class of the Participant for  Essay-Hindi:", required: true, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Will the participant for  Essay Hindi competition require Accommodation facility?", required: true, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Please upload your hand written Essay-Hindi in PDF format only. (max 1 MB)", required: true, type: "file", fileType: "pdf" },
            { label: "Declaration:", required: true, type: "checkbox", checkboxText: "This essay is hand written by me only. Essay contents are  not copied from any book/magazine/internet etc." }
        ],
        note1: "Only one student can participate in this Essay-Hindi.",
        note2: "This student will not participate in Essay-English and Essay-Gujarati competitions. However, this student can participate in other competitions. ",
        note3: "Kindly refer for more details and the schedule of the event-competitions attached with the invitation letter or on our website",
        note4: "www.ipr.res.in/NSD2024"
    },
   "Essay - Gujarati": {
    fields: [
        { name: "participantName", label: "Name of the Participant for Essay-Gujarati:", required: true, type: "text" },
        {
            name: "participantGender", label: "Gender of the Participant for Essay-Gujarati:", required: true, type: "select", options: [
                { value: "", label: "Select Gender" },
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" }
            ]
        },
        {
            name: "participantClass", label: "Class of the Participant for Essay-Gujarati:", required: true, type: "select", options: [
                { value: "", label: "Select Class" },
                { value: "8th Std.", label: "8th Std." },
                { value: "9th Std.", label: "9th Std." },
                { value: "10th Std.", label: "10th Std." },
                { value: "11th Std.", label: "11th Std." },
                { value: "12th Std.", label: "12th Std." }
            ]
        },
        {
            name: "accommodationRequired", label: "Will the participant for Essay Gujarati competition require Accommodation facility?", required: true, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                { value: "", label: "Select Yes/No" },
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
            ]
        },
        { name: "essayFileUrl", label: "Please upload your hand written Essay-Gujarati in PDF format only. (max 1 MB)", required: true, type: "file", fileType: "pdf" },
        { name: "declaration", label: "Declaration:", required: true, type: "checkbox", checkboxText: "This essay is hand written by me only. Essay contents are not copied from any book/magazine/internet etc." }
    ],
    note1: "Only one student can participate in this Essay-Gujarati.",
    note2: "This student will not participate in Essay-English and Essay-Hindi competitions. However, this student can participate in other competitions. ",
    note3: "Kindly refer for more details and the schedule of the event-competitions attached with the invitation letter or on our website",
    note4: "www.ipr.res.in/NSD2024"
},
    "Poster": {
        fields: [
            { label: "Name of the Participant-1 for  Poster competition:", required: true, type: "text" },
            {
                label: "Gender of the Participant-1 for  Poster competition:", required: true, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Class of the Participant-1 for  Poster competition:", required: true, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." }
                ]
            },
            {
                label: "Will the Participant-1 for Poster competition require Accommodation facility?", required: true, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Declaration by Participant-1 for Poster:", required: true, type: "checkbox", checkboxText: "This poster is hand drawn/painted by me only.  I have not computer generated (not digitally made).", text1a: "Write:", Poster: "Poster - NSD2024", text1b: "on the top of the cover.", text2: "Send your poster to the following address by post or courier:", text3: "To,", text4: "Coordinator-NSD2024", text5: "Institute for Plasma Research,", text6: "Nr. Indira Bridge, Bhat village,", text7: "Gandhinagar, Gujarat 382428" },
            { label: "Name of the Participant-2 for Quiz:", required: false, type: "text", helperText: "Optional: One student can also present in this quiz competition. This participant -2 should be from other class/standard then of participant-1's class/standard." },
            {
                label: "Gender of Participant-2 for Quiz:", required: false, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Student Class of Participant-2 for Quiz:", required: false, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." }
                ]
            },
            {
                label: "Will Participant-2 for Quiz require Accommodation facility?", required: false, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Declaration by Participant-2 for Poster:", required: false, type: "checkbox", checkboxText: "This poster is hand drawn/painted by me only.  I have not computer generated (not digitally made).", text1a: "Write:", Poster: "Poster - NSD2024", text1b: "on the top of the cover.", text2: "Send your poster to the following address by post or courier:", text3: "To,", text4: "Coordinator-NSD2024", text5: "Institute for Plasma Research,", text6: "Nr. Indira Bridge, Bhat village,", text7: "Gandhinagar, Gujarat 382428" }
        ],
        note1: "These students can participate in other competitions also.",
        note3: "Kindly refer for more details and the schedule of the event-competitions attached with the invitation letter or on our website",
        note4: "www.ipr.res.in/NSD2024"
    },
    "Skit": {
        fields: [
            { label: "Name of the Participant 1 for skit:", required: true, type: "text" },
            {
                label: "Gender of the Participant-1 for skit:", required: true, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Class of the Participant-1 for skit:", required: true, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Do the Participant-1  participating in Skit competition require Accommodation facility?", required: true, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Name of the Participant 2 for skit:", required: false, type: "text" },
            {
                label: "Gender of the Participant-2 for skit:", required: false, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Class of the Participant-2 for skit:", required: false, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Do the Participant-2  participating in Skit competition require Accommodation facility?", required: false, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Name of the Participant 3 for skit:", required: false, type: "text" },
            {
                label: "Gender of the Participant-3 for skit:", required: false, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Class of the Participant-3 for skit:", required: false, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Do the Participant-3  participating in Skit competition require Accommodation facility?", required: false, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Name of the Participant 4 for skit:", required: false, type: "text" },
            {
                label: "Gender of the Participant-4 for skit:", required: false, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Class of the Participant-4 for skit:", required: false, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Do the Participant-4  participating in Skit competition require Accommodation facility?", required: false, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Name of the Participant 5 for skit:", required: false, type: "text" },
            {
                label: "Gender of the Participant-5 for skit:", required: false, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Class of the Participant-5 for skit:", required: false, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Do the Participant-5  participating in Skit competition require Accommodation facility?", required: false, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Name of the Participant 6 for skit:", required: false, type: "text" },
            {
                label: "Gender of the Participant-6 for skit:", required: false, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Class of the Participant-6 for skit:", required: false, type: "select", options: [
                    { value: "", label: "Select Class" }, // Placeholder option
                    { value: "8th Std.", label: "8th Std." },
                    { value: "9th Std.", label: "9th Std." },
                    { value: "10th Std.", label: "10th Std." },
                    { value: "11th Std.", label: "11th Std." },
                    { value: "12th Std.", label: "12th Std." }
                ]
            },
            {
                label: "Do the Participant-6  participating in Skit competition require Accommodation facility?", required: false, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Additional Requirements for skit:", required: false, type: "text", helperText: "Provided, if selected for Final Round at IPR" },
            { label: "Declaration:", required: true, type: "checkbox", checkboxText: "The concept of the skit is original and based on the theme of NSD2024. This skit is not a copied version of any drama/story/internet source." },
            { label: "Please upload your video on  YouTube. Share the link here by copying the path of the video on YouTube below. Don't send your video to NSD2024 or other coordinator email ids. They will  not be considered.", required: true, type: "combined" }
        ],
        note1: "These students can participate in other competitions also.",
        note3: "Kindly refer for more details and the schedule of the event-competitions attached with the invitation letter or on our website",
        note4: "www.ipr.res.in/NSD2024"
    },
    "Teacher Model": {
        fields: [
            { label: "Name of the Teacher of Teacher's Model:", required: true, type: "text" },
            {
                label: "Teacher's Gender of Teacher's Model:", required: true, type: "select", options: [
                    { value: "", label: "Select Gender" }, // Placeholder option
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" }
                ]
            },
            {
                label: "Do the Participant-1  participating in Skit competition require Accommodation facility?", required: true, type: "select", helperText: "Provided, if selected for Final Round at IPR", options: [
                    { value: "", label: "Select Yes/No" }, // Placeholder option
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" }
                ]
            },
            { label: "Additional Requirements for Teacher's Model presentation (like power, water etc.,):", required: false, type: "text", helperText: "Provided, if selected for Final Round at IPR" },
            { label: "Declaration for Teacher's Model:", required: true, type: "checkbox", checkboxText: "This teacher's model is prepared by me and not by others. This work is based on the concepts of basic science from Class 8 to 12  and is not a readily available science project. Technology is used only to explain the concept of basic science principle of the project." },
            { label: "Please upload a 1-page writeup (including photos/pictures) in PDF format ONLY about your Teacher's model.(max 1 MB)", required: true, type: "file", fileType: "pdf" },
        ],
    },
};

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

const  MainExhibitionPage = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [schoolId, setSchoolId] = useState(null);
    const [accompanyingTeacherId, setAccompanyingTeacherId] = useState(null);
    const [selectedCompetitions, setSelectedCompetitions] = useState([]);
    const [currentCompetition, setCurrentCompetition] = useState(null);
    const [competitionDetails, setCompetitionDetails] = useState({});
    const [competition, setCompetition] = useState('');
    const [filledCompetitions, setFilledCompetitions] = useState([]);
    const [filledFields, setFilledFields] = useState(0);
    

    const [formData, setFormData] = useState({
        // School form fields
        step0_field0: '', // coordinatorTeacherName
        step0_field1: '', // coordinatorTeacherMobile
        step0_field2: '', // schoolName
        step0_field3: '', // address
        step0_field4: '', // city
        step0_field5: '', // pincode
        step0_field6: '', // affiliationNumber
        
        // Accompanying teacher form fields
        step1_field0: '', // teacherName
        step1_field1: '', // gender
        step1_field2: '', // requiresAccommodation

        student_model1_participant1_name: '', // Name of Participant 1 for Student's Model-1
        student_model1_participant1_gender: '', // Gender of Participant 1 for Student's Model-1
        student_model1_participant1_class: '', // Class of Participant 1 for Student's Model-1
        student_model1_participant1_accommodation: '', // Accommodation requirement for Participant 1

        student_model1_participant2_name: '', // Name of Participant 2 for Student's Model-1
        student_model1_participant2_gender: '', // Gender of Participant 2 for Student's Model-1
        student_model1_participant2_class: '', // Class of Participant 2 for Student's Model-1
        student_model1_participant2_accommodation: '', // Accommodation requirement for Participant 2

        student_model1_additional_requirements: '', // Additional requirements for Model-1 presentation
        student_model1_declaration: false, // Declaration checkbox for Model-1
        student_model1_upload: null, // File upload for Model-1 (1-page writeup in PDF format)

        student_model2_participant1_name: '', // Name of Participant 1 for Student's Model-2
        student_model2_participant1_gender: '', // Gender of Participant 1 for Student's Model-2
        student_model2_participant1_class: '', // Class of Participant 1 for Student's Model-2
        student_model2_participant1_accommodation: '', // Accommodation requirement for Participant 1

        student_model2_participant2_name: '', // Name of Participant 2 for Student's Model-2
        student_model2_participant2_gender: '', // Gender of Participant 2 for Student's Model-2
        student_model2_participant2_class: '', // Class of Participant 2 for Student's Model-2
        student_model2_participant2_accommodation: '', // Accommodation requirement for Participant 2

        student_model2_additional_requirements: '', // Additional requirements for Model-2 presentation
        student_model2_declaration: false, // Declaration checkbox for Model-2
        student_model2_upload: null, // File upload for Model-2 (1-page writeup in PDF format)


        // Skit form fields
    skit_participant1_name: '', // Name of Participant 1
    skit_participant1_gender: '', // Gender of Participant 1
    skit_participant1_class: '', // Class of Participant 1
    skit_participant1_accommodation: '', // Accommodation for Participant 1
    
    skit_participant2_name: '', // Name of Participant 2
    skit_participant2_gender: '', // Gender of Participant 2
    skit_participant2_class: '', // Class of Participant 2
    skit_participant2_accommodation: '', // Accommodation for Participant 2

    skit_participant3_name: '', // Name of Participant 3
    skit_participant3_gender: '', // Gender of Participant 3
    skit_participant3_class: '', // Class of Participant 3
    skit_participant3_accommodation: '', // Accommodation for Participant 3

    skit_participant4_name: '', // Name of Participant 4
    skit_participant4_gender: '', // Gender of Participant 4
    skit_participant4_class: '', // Class of Participant 4
    skit_participant4_accommodation: '', // Accommodation for Participant 4

    skit_participant5_name: '', // Name of Participant 5
    skit_participant5_gender: '', // Gender of Participant 5
    skit_participant5_class: '', // Class of Participant 5
    skit_participant5_accommodation: '', // Accommodation for Participant 5

    skit_participant6_name: '', // Name of Participant 6
    skit_participant6_gender: '', // Gender of Participant 6
    skit_participant6_class: '', // Class of Participant 6
    skit_participant6_accommodation: '', // Accommodation for Participant 6

    skit_additional_requirements: '', // Additional Requirements
    skit_declaration: false, // Declaration checkbox
    skit_youtube_link: '', // YouTube link

    poster_participant1_name: '', // Name of Participant 1
    poster_participant1_gender: '', // Gender of Participant 1
    poster_participant1_class: '', // Class of Participant 1
    poster_participant1_accommodation: '', // Accommodation for Participant 1
    poster_participant1_declaration: false, // Declaration checkbox for Participant 1
    
    poster_participant2_name: '', // Name of Participant 2 (optional for quiz)
    poster_participant2_gender: '', // Gender of Participant 2
    poster_participant2_class: '', // Class of Participant 2
    poster_participant2_accommodation: '', // Accommodation for Participant 2
    poster_participant2_declaration: false, 

    teacher_model_name: '', // Name of the Teacher for Teacher's Model
    teacher_model_gender: '', // Gender of the Teacher
    teacher_model_accommodation: '', // Accommodation requirement for Teacher's Model
    teacher_model_additional_requirements: '', // Additional requirements for presentation (power, water, etc.)
    teacher_model_declaration: false, // Declaration for Teacher's Model authenticity
    teacher_model_writeup_file: null,

    essay_english_participant_name: '', // Name of the participant
    essay_english_participant_gender: '', // Gender of the participant
    essay_english_participant_class: '', // Class of the participant
    essay_english_accommodation: '', // Accommodation requirement
    essay_english_file: null, // File upload for handwritten essay (PDF)
    essay_english_declaration: false ,// Declaration for authenticity

    essay_gujarati_participant_name: '', // Name of the participant
    essay_gujarati_participant_gender: '', // Gender of the participant
    essay_gujarati_participant_class: '', // Class of the participant
    essay_gujarati_accommodation: '', // Accommodation requirement
    essay_gujarati_file: null, // File upload for handwritten essay (PDF)
    essay_gujarati_declaration: false ,

    essay_hindi_participant_name: '', // Name of the participant
    essay_hindi_participant_gender: '', // Gender of the participant
    essay_hindi_participant_class: '', // Class of the participant
    essay_hindi_accommodation: '', // Accommodation requirement
    essay_hindi_file: null, // File upload for handwritten essay (PDF)
    essay_hindi_declaration: false ,

    eloquence_english_participant_name: '', // Name of the participant for Eloquence-English
    eloquence_english_participant_gender: '', // Gender of the participant for Eloquence-English
    eloquence_english_participant_class: '', // Class of the participant for Eloquence-English
    eloquence_english_accommodation: '', // Accommodation requirement for Eloquence-English
    eloquence_english_declaration: false, // Declaration for Eloquence-English

    eloquence_hindi_participant_name: '', // Name of the participant for Eloquence-Hindi
    eloquence_hindi_participant_gender: '', // Gender of the participant for Eloquence-Hindi
    eloquence_hindi_participant_class: '', // Class of the participant for Eloquence-Hindi
    eloquence_hindi_accommodation: '', // Accommodation requirement for Eloquence-Hindi
    eloquence_hindi_declaration: false, // Declaration for Eloquence-Hindi

    eloquence_gujarati_participant_name: '', // Name of the participant for Eloquence-Gujarati
    eloquence_gujarati_participant_gender: '', // Gender of the participant for Eloquence-Gujarati
    eloquence_gujarati_participant_class: '', // Class of the participant for Eloquence-Gujarati
    eloquence_gujarati_accommodation: '', // Accommodation requirement for Eloquence-Gujarati
    eloquence_gujarati_declaration: false, 

    quiz_participant1_name: '', // Name of the Quiz Participant 1
quiz_participant1_gender: '', // Gender of Participant 1 for Quiz
quiz_participant1_class: '', // Student Class of Participant 1 for Quiz
quiz_participant1_accommodation: '', // Accommodation requirement for Participant 1

quiz_participant2_name: '', // Name of the Participant-2 for Quiz
quiz_participant2_gender: '', // Gender of Participant-2 for Quiz
quiz_participant2_class: '', // Student Class of Participant-2 for Quiz
quiz_participant2_accommodation: '', // Accommodation requirement for Participant-2

quiz_declaration: false, // Declaration checkbox for Quiz

    });

    const CompetitionFields = ({ competition, fields, competitionDetails, handleCompetitionDetailChange }) => {
        return (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{competition} Details</h2>
                {fields.map((field, index) => (
                    <div key={index} className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {field.label}
                            {field.required && <span className="text-red-600 font-bold ml-1">*</span>}
                        </label>
                        {field.type === 'select' ? (
                            <select
                                value={competitionDetails[`field${index}`] || ''}
                                onChange={(e) => handleCompetitionDetailChange(field.name, e.target.value)}
                                required={field.required}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {field.options.map((option, optionIndex) => (
                                    <option key={optionIndex} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === 'checkbox' ? (
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={competitionDetails[`field${index}`] || false}
                                    onChange={(e) => handleCompetitionDetailChange(field.name, e.target.value)}
                                    required={field.required}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2 text-gray-700">{field.checkboxText}</span>
                            </div>
                        ) : field.type === 'file' ? (
                            <input
                                type="text"
                                placeholder="Paste your file URL (e.g., Google Drive, Dropbox)"
                                value={competitionDetails[`field${index}`] || ''}
                                onChange={(e) => handleCompetitionDetailChange(field.name, e.target.value)}

                                required={field.required}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        ) : (
                            <input
                                type={field.type}
                                value={competitionDetails[`field${index}`] || ''}
                                onChange={(e) => handleCompetitionDetailChange(field.name, e.target.value)}

                                required={field.required}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        )}
                        {field.helperText && <p className="text-sm text-gray-500 mt-1">{field.helperText}</p>}
                    </div>
                ))}
            </div>
        );
    };

    const currentFields = steps[currentStep].fields;
    const handleInputChange = (index, value, type = 'text') => {
        const key = `step${currentStep}_field${index}`;
        let newValue;
        if (type === 'checkbox') {
            newValue = value.target.checked;
        } else if (type === 'file') {
            const file = value.target.files[0];
            const fileExtension = file?.name.split('.').pop().toLowerCase();
            const videoExtensions = ['mp4', 'avi', 'mkv', 'mov', 'wmv'];
            if (file && videoExtensions.includes(fileExtension)) {
                if (file.size > 10 * 1024 * 1024) {
                    alert('Video file size exceeds the 10MB limit.');
                    return;
                }
                newValue = { type: 'video', file };
            } else if (file && fileExtension === 'pdf') {
                newValue = { type: 'pdf', file };
            } else {
                alert('Invalid file format. Please upload a valid video or PDF file.');
                return;
            }
        } else {
            newValue = value;
        }
        setFormData({ ...formData, [key]: newValue });
        const stepFieldKeys = currentFields.map((_, i) => `step${currentStep}_field${i}`);
        const filledFieldsInStep = stepFieldKeys.filter(key => formData[key] && formData[key].toString().trim() !== "").length;
        const newFilledFields = filledFieldsInStep + (newValue.toString().trim() !== "" && !formData[key] ? 1 : 0);
        setFilledFields(newFilledFields);
    };

    const handleSchoolSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/school', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.step0_field2,
                    address: formData.step0_field3,
                    city: formData.step0_field4,
                    pincode: formData.step0_field5,
                    affiliationNumber: formData.step0_field6,
                    coordinatorTeacherName: formData.step0_field0,
                    coordinatorTeacherMobile: formData.step0_field1
                }),
            });
            if (!response.ok) throw new Error('Failed to submit school details');
            const result = await response.json();
            console.log("School created with ID:", result.id); // Log the school ID
            setSchoolId(result.id);
            setSchoolId(result.id);            
            setCurrentStep(1);
        } catch (error) {
            console.error('Error submitting school details:', error);
            alert('Failed to submit school details. Please try again.');
        }
    };

    const handleAccompanyingTeacherSubmit = async (event) => {
        event.preventDefault();
        console.log("School ID being sent:", schoolId);
        try {
            const response = await fetch('http://localhost:3000/api/accompanyingTeacher', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    schoolId: parseInt(schoolId, 10),
                    name: formData.step1_field0,
                    gender: formData.step1_field1,
                    requiresAccommodation: formData.step1_field2 === 'Yes'
                }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to submit accompanying teacher details: ${errorText}`);
            }
            const result = await response.json();
            setAccompanyingTeacherId(result.id); 
            setCurrentStep(2);
        } catch (error) {
            console.error('Error submitting accompanying teacher details:', error);
            alert('Failed to submit accompanying teacher details. Please try again.');
        }
    };

    const handleCompetitionSelection = async (competitionName) => {
        console.log(`Attempting to select competition: ${competitionName}`);
        console.log(`Current selected competitions: ${selectedCompetitions}`);
        console.log(`Current school ID: ${schoolId}`);
    
        if (!selectedCompetitions.includes(competitionName)) {
            try {
                const response = await fetch('http://localhost:3000/api/createCompetition', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        schoolId: parseInt(schoolId, 10),
                        competitionName: competitionName
                    }),
                });
    
                const responseData = await response.text();
                console.log('Full server response:', responseData);
    
                if (!response.ok) {
                    throw new Error(`Server responded with ${response.status}: ${responseData}`);
                }
    
                const result = JSON.parse(responseData);
                console.log('Competition created successfully:', result);
    
                setSelectedCompetitions(prevCompetitions => [...prevCompetitions, competitionName]);
                console.log(`Updated selected competitions: ${[...selectedCompetitions, competitionName]}`);
            } catch (error) {
                console.error('Error creating competition:', error);
                alert(`Failed to select competition: ${error.message}`);
                return; // Exit the function if there's an error
            }
        } else {
            console.log(`Competition ${competitionName} already selected`);
        }
    
        setCurrentCompetition(competitionName);
        console.log(`Current competition set to: ${competitionName}`);

    };

    const handleCompetitionSubmit = async (competition, competitionDetails, schoolId) => {
        const endpoint = competitionEndpoints[competition];
        if (!endpoint) {
          throw new Error(`Unknown competition: ${competition}`);
        }     
        let body;
        switch (competition) {    
            case "Skit":
                body = {
                    schoolId: parseInt(schoolId, 10),
                    participants: [
                        { name: formData.skit_participant1_name, gender: formData.skit_participant1_gender, class: formData.skit_participant1_class, requiresAccommodation: formData.skit_participant1_accommodation === 'Yes' },
                        { name: formData.skit_participant2_name, gender: formData.skit_participant2_gender, class: formData.skit_participant2_class, requiresAccommodation: formData.skit_participant2_accommodation === 'Yes' },
                        { name: formData.skit_participant3_name, gender: formData.skit_participant3_gender, class: formData.skit_participant3_class, requiresAccommodation: formData.skit_participant3_accommodation === 'Yes' },
                        { name: formData.skit_participant4_name, gender: formData.skit_participant4_gender, class: formData.skit_participant4_class, requiresAccommodation: formData.skit_participant4_accommodation === 'Yes' },
                        { name: formData.skit_participant5_name, gender: formData.skit_participant5_gender, class: formData.skit_participant5_class, requiresAccommodation: formData.skit_participant5_accommodation === 'Yes' },
                        { name: formData.skit_participant6_name, gender: formData.skit_participant6_gender, class: formData.skit_participant6_class, requiresAccommodation: formData.skit_participant6_accommodation === 'Yes' },
                    ],
                    additionalRequirements: formData.skit_additional_requirements,
                    declaration: formData.skit_declaration,
                    youtubeLink: formData.skit_youtube_link            
                };
                break;
                case "Poster": 
                body = {
                    schoolId: parseInt(schoolId, 10),
                    participants: [
                        { 
                            name: formData.poster_participant1_name, 
                            gender: formData.poster_participant1_gender, 
                            class: formData.poster_participant1_class, 
                            requiresAccommodation: formData.poster_participant1_accommodation === 'Yes',
                            declaration: formData.poster_participant1_declaration 
                        },
                        { 
                            name: formData.poster_participant2_name, 
                            gender: formData.poster_participant2_gender, 
                            class: formData.poster_participant2_class, 
                            requiresAccommodation: formData.poster_participant2_accommodation === 'Yes',
                            declaration: formData.poster_participant2_declaration 
                        }
                    ],
                };
                break;
                case "Teacher Model": 
                body = {
                    schoolId: parseInt(schoolId, 10),
                    teacherDetails: {
                        name: formData.teacher_model_name,
                        gender: formData.teacher_model_gender,
                        requiresAccommodation: formData.teacher_model_accommodation === 'Yes',
                    },
                    additionalRequirements: formData.teacher_model_additional_requirements,
                    declaration: formData.teacher_model_declaration,
                    writeupFile: formData.teacher_model_writeup_file // assuming you handle the file upload separately
                };
                break;
                case "Essay English":
                body = {
                    schoolId: parseInt(schoolId, 10),
                    participants: [
                        {
                            name: formData.essay_english_participant_name,
                            gender: formData.essay_english_participant_gender,
                            class: formData.essay_english_participant_class,
                            requiresAccommodation: formData.essay_english_accommodation === 'Yes'
                        }
                    ],
                    file: formData.essay_english_file, // File upload for the handwritten essay (PDF)
                    declaration: formData.essay_english_declaration // Declaration for authenticity
                };
                break;
                case "Essay Gujarati":
                body = {
                    schoolId: parseInt(schoolId, 10),
                    participants: [
                        {
                            name: formData.essay_gujarati_participant_name,
                            gender: formData.essay_gujarati_participant_gender,
                            class: formData.essay_gujarati_participant_class,
                            requiresAccommodation: formData.essay_gujarati_accommodation === 'Yes'
                        }
                    ],
                    file: formData.essay_gujarati_file, // File upload for the handwritten essay (PDF)
                    declaration: formData.essay_gujarati_declaration // Declaration for authenticity
                };
                break;
                case "Essay Hindi":
                body = {
                    schoolId: parseInt(schoolId, 10),
                    participants: [
                        {
                            name: formData.essay_hindi_participant_name,
                            gender: formData.essay_hindi_participant_gender,
                            class: formData.essay_hindi_participant_class,
                            requiresAccommodation: formData.essay_hindi_accommodation === 'Yes'
                        }
                    ],
                    file: formData.essay_hindi_file, // File upload for the handwritten essay (PDF)
                    declaration: formData.essay_hindi_declaration // Declaration for authenticity
                };
                break;
                case "Eloquence - English":
                body = {
                    schoolId: parseInt(schoolId, 10),
                    participants: [
                        {
                            name: formData.eloquence_english_participant_name,
                            gender: formData.eloquence_english_participant_gender,
                            class: formData.eloquence_english_participant_class,
                            requiresAccommodation: formData.eloquence_english_accommodation === 'Yes'
                        }
                    ],
                    declaration: formData.eloquence_english_declaration // Declaration for Eloquence-English
                };
                break;
                case "Eloquence - Hindi":
                    body = {
                        schoolId: parseInt(schoolId, 10),
                        participants: [
                            {
                                name: formData.eloquence_hindi_participant_name,
                                gender: formData.eloquence_hindi_participant_gender,
                                class: formData.eloquence_hindi_participant_class,
                                requiresAccommodation: formData.eloquence_hindi_accommodation === 'Yes'
                            }
                        ],
                        declaration: formData.eloquence_hindi_declaration // Declaration for Eloquence-Hindi
                    };
                    break;
                    case "Eloquence - Gujarati":
                        body = {
                            schoolId: parseInt(schoolId, 10),
                            participants: [
                                {
                                    name: formData.eloquence_gujarati_participant_name,
                                    gender: formData.eloquence_gujarati_participant_gender,
                                    class: formData.eloquence_gujarati_participant_class,
                                    requiresAccommodation: formData.eloquence_gujarati_accommodation === 'Yes'
                                }
                            ],
                            declaration: formData.eloquence_gujarati_declaration // Declaration for Eloquence-Gujarati
                        };
                        break;   
                        case "Quiz": 
                        body = {
                            schoolId: parseInt(schoolId, 10),
                            participants: [
                                { 
                                    name: formData.quiz_participant1_name, 
                                    gender: formData.quiz_participant1_gender, 
                                    class: formData.quiz_participant1_class, 
                                    requiresAccommodation: formData.quiz_participant1_accommodation === 'Yes',
                                    declaration: formData.quiz_declaration 
                                },
                                { 
                                    name: formData.quiz_participant2_name, 
                                    gender: formData.quiz_participant2_gender, 
                                    class: formData.quiz_participant2_class, 
                                    requiresAccommodation: formData.quiz_participant2_accommodation === 'Yes',
                                    declaration: formData.quiz_declaration 
                                }
                            ],
                        };
                        break;
                        default: 
                        console.log('slected competion is not writen in cases ');                                     
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


      const handleCompetitionDetailChange = (fieldName, value) => {
        setCompetitionDetails(prev => ({
            ...prev,
            [currentCompetition]: {
                ...prev[currentCompetition],
                [fieldName]: value
            }
        }));
    };
    
    

    const handleSaveAndContinue = (competition) => {
        console.log(`Saving progress for ${competition}...`);
    
        // Update current competition state
        setCurrentCompetition(competition);
        console.log(`Current competition set to: ${competition}`);
    
        // Optionally, you might want to save any other relevant form data locally
        // e.g., updating a state for form data if you're collecting inputs
    
        // Call handleCompetitionSubmit to process the competition submission
        handleCompetitionSubmit(competition, formData, schoolId)
            .then(result => {
                // Handle the result from submission if needed
                console.log('Competition submitted successfully:', result);
            })
            .catch(error => {
                console.error('Error during competition submission:', error);
                alert(`Failed to submit competition: ${error.message}`);
            });
    };
    

    
const handleFinalSubmit = async () => {
    if (filledCompetitions.length === 0) {
        alert("Please fill details for at least one competition before submitting.");
        return;
    }

    let allSubmissionsSuccessful = true;
    const submittedCompetitions = [];

    try {
        for (const competition of filledCompetitions) {
            try {
                const result = await handleCompetitionSubmit(competition, competitionDetails[competition], schoolId);
                submittedCompetitions.push({
                    name: competition,
                    id: result.id
                });
            } catch (error) {
                console.error(`Error submitting ${competition}:`, error);
                alert(`Error submitting ${competition}. Please check your details.`);
                allSubmissionsSuccessful = false;
                break;  // Stop submitting further competitions if one fails
            }
        }

        if (allSubmissionsSuccessful) {
            const response = await fetch('http://localhost:3000/api/submitForm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    schoolId: schoolId,
                    accompanyingTeacherId: accompanyingTeacherId,
                    competitions: submittedCompetitions
                }),
            });

            if (!response.ok) throw new Error('Failed to submit final form');

            alert('Form submitted successfully!');
            resetForm();  // Resetting the form can help users start anew
            navigate('/thank-you');
        } else {
            throw new Error('Some competition submissions failed');
        }
    } catch (error) {
        console.error('Error in final form submission:', error);
        alert('Failed to submit form. Please try again.');
    }
};

// A potential function to reset your form state
const resetForm = () => {
    setFilledCompetitions([]);
    setCurrentCompetition('');
    // Reset any other relevant state
};

const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <form onSubmit={handleSchoolSubmit} className="flex-grow">
                        {steps[0].fields.map((field, index) => (
                            <div key={index} className="mb-6">
                                <label className="block mb-1 font-semibold">
                                    {field.label}
                                    {field.required && <span className="text-red-600 font-bold"> *</span>}
                                </label>
                                <input
                                    type={field.type}
                                    value={formData[`step0_field${index}`] || ''}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    required={field.required}
                                    className="block w-full p-2 border border-gray-300 rounded bg-white pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent z-10"
                                />
                                <p className="text-sm text-gray-500">{field.helperText}</p>
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Next</button>
                        </div>
                    </form>
                );
            case 1:
                return (
                    <form onSubmit={handleAccompanyingTeacherSubmit} className="flex-grow">
                        {steps[1].fields.map((field, index) => (
                            <div key={index} className="mb-6">
                                <label className="block mb-1 font-semibold">
                                    {field.label}
                                    {field.required && <span className="text-red-600 font-bold"> *</span>}
                                </label>
                                {field.type === 'select' ? (
                                    <div className="relative">
                                        <select
                                            value={formData[`step1_field${index}`] || ''}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            required={field.required}
                                            className="block w-full p-2 border border-gray-300 rounded bg-white pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent z-10"
                                        >
                                            {field.options.map((option, idx) => (
                                                <option key={idx} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-auto text-gray-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.23 7.21a.75.75 0 011.06 0L10 10.5l3.71-3.29a.75.75 0 111.04 1.08l-4 3.5a.75.75 0 01-1.04 0l-4-3.5a.75.75 0 010-1.08z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                ) : (
                                    <input
                                        type={field.type}
                                        value={formData[`step1_field${index}`] || ''}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        required={field.required}
                                        className="block w-full p-2 border border-gray-300 rounded bg-white pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent z-10"
                                    />
                                )}
                                <p className="text-sm text-gray-500">{field.helperText}</p>
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Next</button>
                        </div>
                    </form>
                );
                case 2:
                    return (
                        <div className="flex-grow">
                            <select 
                                onChange={(e) => handleCompetitionSelection(e.target.value)}
                                className="block w-full p-2 border border-gray-300 rounded bg-white pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent z-10 mb-6"
                            >
                                <option value="">Select Competition</option>
                                {steps[2].fields[0].options.slice(1).map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {currentCompetition && competitionFieldsConfig[currentCompetition] && (
                                <div>
                                    <CompetitionFields
                                        competition={currentCompetition}
                                        fields={competitionFieldsConfig[currentCompetition].fields}
                                        competitionDetails={competitionDetails[currentCompetition] || {}}
                                        handleCompetitionDetailChange={handleCompetitionDetailChange}
                                    />
                                    <div className="flex justify-end mt-6">
                                        <button 
                                            onClick={handleSaveAndContinue}
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-4"
                                        >
                                            Save & Continue
                                        </button>
                                        <button 
                                            onClick={handleFinalSubmit} 
                                            disabled={filledCompetitions.length === 0}
                                            className={`px-4 py-2 rounded ${filledCompetitions.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                                        >
                                            Submit Form
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-100 p-12 flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 border border-blue-500 rounded-lg flex flex-col justify-between min-h-screen shadow-lg w-full z-0">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
                    Application form - National Science Day-NSD2024
                </h1>

                <div className="relative flex justify-between items-center mt-4 mb-6">
                    {steps.map((_, index) => (
                        <React.Fragment key={index}>
                            <div className="relative z-10">
                                <div
                                    className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                                        index <= currentStep
                                            ? 'border-blue-600 bg-blue-600 text-white'
                                            : 'border-gray-300 bg-white text-gray-600'
                                    } font-bold`}
                                >
                                    {index + 1}
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="relative rounded-full w-full h-0.5 mx-2 bg-gray-300">
                                    <div
                                        className="h-full bg-blue-600"
                                        style={{
                                            width: index < currentStep ? '100%' : '0%',
                                            borderRadius: '999px',
                                            transition: 'width 0.3s ease',
                                        }}
                                    ></div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="bg-blue-600 text-white p-4 rounded-md font-semibold text-lg mb-4">
                    {steps[currentStep].title}
                </div>

                {renderStep()}
            </div>
        </div>
    );
};
export default MainExhibitionPage;