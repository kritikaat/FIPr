// routes.js
import express from 'express';
const router = express.Router();
import competitionSelectionController from '../controllers/competitionselectionController.js';
import eloquenceController from '../controllers/eloquenceController.js';
import essayController from '../controllers/essayController.js';
import posterController from '../controllers/posterController.js';
import quizController from '../controllers/quizController.js';
import schoolController from '../controllers/schoolController.js';
import skitController from '../controllers/skitcontroller.js';
import studentModel1 from '../controllers/studentmodel1.js';
import studentModel2 from '../controllers/studentmodel2.js';
import { createEloquenceEnglish, createEloquenceHindi, createEloquenceGujarati } from '../controllers/eloquenceController.js';
import accompanyingTeacherController from '../controllers/teacherController.js';
import teacherController from '../controllers/teachermodelController.js';


router.post('/school', schoolController);
router.post('/accompanyingTeacher', accompanyingTeacherController);
router.post('/createCompetition', competitionSelectionController);

// Student Model 1 Routes
router.post('/student-model-1', studentModel1);

// Student Model 2 Routes
router.post('/student-model-2', studentModel2);

// Quiz Routes
router.post('/quiz', quizController);

// Eloquence Routes
router.post('/eloquence/english', (req, res) => eloquenceController.createEloquence(req, res, 'English'));
router.post('/eloquence/hindi', (req, res) => eloquenceController.createEloquence(req, res, 'Hindi'));
router.post('/eloquence/gujarati', (req, res) => eloquenceController.createEloquence(req, res, 'Gujarati'));
import { createEssayEnglish, createEssayHindi, createEssayGujarati } from '../controllers/essayController.js';


router.post('/essay/english', createEssayEnglish);
router.post('/essay/hindi', createEssayHindi);
router.post('/essay/gujarati', createEssayGujarati);


// Essay Routes
router.post('/eloquence/english', createEloquenceEnglish);
router.post('/eloquence/hindi', createEloquenceHindi);
router.post('/eloquence/gujarati', createEloquenceGujarati);

// Poster Routes
router.post('/poster', posterController);

// Skit Routes
router.post('/skit', skitController);

// Teacher Model Routes
router.post('/teacher-model', teacherController);

export default router;